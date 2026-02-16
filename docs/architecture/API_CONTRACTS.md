# API Contracts

> Spring Boot REST API - Base URL: `http://localhost:8080` (prefix: `/api/v1`)

## 상태 (문서 vs 구현)

이 문서는 목표 계약(Phase 1)을 먼저 정의하고, 현재 구현(Phase 0)을 함께 기록한다.

### Phase 0 (현재 구현)

- Chat
  - `POST /api/v1/chat/send` (JSON, 단일 응답)
  - `GET /api/v1/chat/history/{userId}`
- Auth
  - `POST /api/v1/auth/verify-phone` (placeholder)
  - `POST /api/v1/auth/confirm` (placeholder)
- 인증/JWT
  - 현재는 JWT 검증 미적용 (모든 `/api/**` 요청 허용)
- SSE 스트리밍
  - 미구현

## 인증

JWT Bearer Token 방식. 로그인 후 발급받은 토큰을 헤더에 포함:
```
Authorization: Bearer <token>
```

---

## Chat API

## Chat API (Phase 1 - 목표)

### POST /api/v1/chat

AI 대화 엔드포인트 (SSE 스트리밍)

**Request:**
```json
{
  "conversationId": "uuid (optional, 새 대화면 생략)",
  "message": "할머니가 보낸 메시지"
}
```

**Response:** `text/event-stream` (Server-Sent Events)
```
data: {"type":"token","content":"안녕"}
data: {"type":"token","content":"하세요"}
data: {"type":"done","messageId":"uuid","conversationId":"uuid"}
```

**인증:** Bearer Token 필수

---

## Chat API (Phase 0 - 현재 구현)

### POST /api/v1/chat/send

AI 대화 엔드포인트 (단일 JSON 응답)

**Request:**
```json
{
  "userId": 1,
  "message": "안녕"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": {
      "id": "123",
      "role": "assistant",
      "content": "안녕하세요! 다솜이예요. 오늘 하루는 어떠셨어요?",
      "createdAt": "2026-02-16T10:00:05"
    }
  }
}
```

### GET /api/v1/chat/history/{userId}

특정 사용자의 메시지 히스토리 조회

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "role": "user",
      "content": "안녕",
      "createdAt": "2026-02-16T10:00:00"
    },
    {
      "id": "2",
      "role": "assistant",
      "content": "안녕하세요! 다솜이예요.",
      "createdAt": "2026-02-16T10:00:05"
    }
  ]
}
```

### GET /api/v1/chat/conversations

대화 목록 조회

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "약 복용 문의",
      "lastMessage": "그건 이렇게 하시면...",
      "updatedAt": "2026-02-15T10:30:00Z"
    }
  ],
  "meta": { "total": 5, "page": 1, "limit": 20 }
}
```

### GET /api/v1/chat/conversations/{id}/messages

특정 대화의 메시지 조회

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "role": "user",
      "content": "이 약 먹어도 되나?",
      "createdAt": "2026-02-15T10:00:00Z"
    },
    {
      "id": "uuid",
      "role": "assistant",
      "content": "할머니, 약에 대해서는...",
      "createdAt": "2026-02-15T10:00:05Z"
    }
  ]
}
```

---

## Auth API

### POST /api/v1/auth/send-code

전화번호 인증 코드 발송

**Request:**
```json
{
  "phoneNumber": "010-1234-5678"
}
```

**Response:**
```json
{
  "success": true,
  "data": { "expiresIn": 180 }
}
```

### POST /api/v1/auth/verify-code

인증 코드 확인

**Request:**
```json
{
  "phoneNumber": "010-1234-5678",
  "code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "isNewUser": true
  }
}
```

### POST /api/v1/auth/refresh

토큰 갱신

**Request:**
```json
{
  "refreshToken": "refresh-token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-token",
    "refreshToken": "new-refresh-token"
  }
}
```

---

## Auth API (Phase 0 - 현재 구현)

> 아래 엔드포인트는 아직 placeholder이며, Phase 1 목표(Auth API 섹션)의 `send-code/verify-code/refresh`로 수렴한다.

### POST /api/v1/auth/verify-phone

전화번호 인증 시작 (placeholder)

**Request:**
```json
{
  "phoneNumber": "010-1234-5678"
}
```

**Response:**
```json
{
  "status": "pending",
  "message": "인증번호가 발송되었습니다."
}
```

### POST /api/v1/auth/confirm

인증 코드 확인 및 토큰 발급 (placeholder)

**Request:**
```json
{
  "phoneNumber": "010-1234-5678",
  "code": "123456"
}
```

**Response:**
```json
{
  "status": "verified",
  "token": "placeholder-jwt-token"
}
```

## User API

### GET /api/v1/users/me

현재 사용자 정보

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "김순자",
    "phoneNumber": "010-****-5678",
    "preferences": {
      "fontSize": "large",
      "voiceEnabled": true,
      "voiceSpeed": 0.8
    },
    "createdAt": "2026-02-15T09:00:00Z"
  }
}
```

### PATCH /api/v1/users/me

사용자 정보 수정 (온보딩 완료, 설정 변경)

**Request:**
```json
{
  "name": "김순자",
  "preferences": {
    "fontSize": "extra-large",
    "voiceEnabled": true,
    "voiceSpeed": 0.8
  }
}
```

---

## Voice API

### POST /api/v1/voice/stt

음성 -> 텍스트 변환

**Request:** `multipart/form-data`
- `audio`: 음성 파일 (m4a, wav)

**Response:**
```json
{
  "success": true,
  "data": { "text": "인식된 텍스트" }
}
```

### POST /api/v1/voice/tts

텍스트 -> 음성 변환

**Request:**
```json
{
  "text": "읽어줄 텍스트",
  "speed": 0.8
}
```

**Response:** `audio/mpeg` (바이너리 오디오 스트림)

---

## 공통 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "사용자 친화적 에러 메시지"
  }
}
```

| 코드 | HTTP | 설명 |
|------|------|------|
| UNAUTHORIZED | 401 | 인증 필요 |
| FORBIDDEN | 403 | 권한 없음 |
| NOT_FOUND | 404 | 리소스 없음 |
| RATE_LIMIT | 429 | 요청 한도 초과 |
| INVALID_INPUT | 400 | 잘못된 입력 |
| AI_ERROR | 502 | Claude API 오류 |
| INTERNAL_ERROR | 500 | 서버 내부 오류 |
