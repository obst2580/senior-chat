# Chat Domain -> AI 말벗 + AI 도우미

## 개요

기존 단일 채팅 기능이 두 가지 독립 기능으로 분리됨:
- **AI 말벗 (Companion)**: 전화 스타일 UI로 AI "다솜이"와 대화
- **AI 도우미 (Helper)**: 사진을 찍어서 AI에게 질문

## AI 말벗 (Companion)

### 핵심 기능

1. **전화 스타일 UI** - 전화 걸기/끊기 인터페이스
2. **텍스트 채팅** - 기존 ChatWindow/MessageBubble 재사용
3. **말벗 설정** - 이름, 나이, 사투리 커스터마이즈
4. **음성 입력 (STT)** - 큰 마이크 버튼 (Phase 1)
5. **음성 출력 (TTS)** - AI 응답 자동 읽어줌 (Phase 1)

### 모바일 컴포넌트 구조

```
app/(main)/companion/
+-- _layout.tsx              # Stack 네비게이터
+-- index.tsx                # 메인 화면 (전화 걸기 UI)
+-- settings.tsx             # 말벗 설정 (이름/나이/말투)

components/companion/
+-- CallUI.tsx               # 전화 걸기 스타일 UI
+-- CompanionAvatar.tsx      # AI 아바타 (Ionicons)
+-- CallControls.tsx         # 통화 제어 (종료, 음소거)

components/chat/             # 기존 컴포넌트 재사용
+-- ChatWindow.tsx
+-- MessageList.tsx
+-- MessageBubble.tsx
+-- ChatInput.tsx

hooks/
+-- useCompanion.ts          # 말벗 상태 + 프로필 관리
+-- useChat.ts               # 기존 채팅 훅 (내부에서 재사용)

types/
+-- companion.ts             # CompanionProfile, CompanionState
+-- chat.ts                  # Message, ChatState (기존)
```

### AI 페르소나 (다솜이)

- **말투**: 친근한 존댓말, 사투리 설정 가능
- **응답**: 짧고 명확 (3-5문장), 필요시 단계별 안내
- **안전장치**: 의료/법률은 반드시 "전문가 상담 권유" 포함
- **프로액티브**: 먼저 유용한 정보를 알려주고, 먼저 질문함

### API 연동

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/api/v1/chat/send` | POST | 메시지 전송 (Phase 0) |
| `/api/v1/chat/history/{userId}` | GET | 메시지 히스토리 |
| `/api/v1/companion/{userId}/profile` | GET | 말벗 프로필 조회 |
| `/api/v1/companion/{userId}/profile` | PUT | 말벗 프로필 수정 |
| `/api/v1/companion/chat` | POST | 대화 (conversationId 포함) |

---

## AI 도우미 (Helper)

### 핵심 기능

1. **카메라 촬영** - 궁금한 것을 사진으로 찍기
2. **사진 분석** - AI가 이미지 분석 후 답변
3. **결과 표시** - 분석 결과를 큰 글씨로 표시

### 모바일 컴포넌트 구조

```
app/(main)/helper/
+-- _layout.tsx              # Stack 네비게이터
+-- index.tsx                # 메인 화면 (카메라 버튼)
+-- result.tsx               # 분석 결과 화면

components/helper/
+-- CameraButton.tsx         # 대형 카메라 버튼 (80px)
+-- PhotoPreview.tsx         # 촬영 사진 미리보기
+-- AnalysisResult.tsx       # AI 분석 결과 카드

hooks/
+-- useCamera.ts             # 카메라 촬영/갤러리 선택
+-- useImageAnalysis.ts      # 사진 -> AI 분석 API

types/
+-- helper.ts                # PhotoAnalysisRequest/Response
```

### 사용 시나리오

- "이 약 먹어도 되나?" -> 약 사진 촬영 -> AI 분석 -> 일반 정보 + 의사 상담 권유
- "이 안내문 뭐라고 써있어?" -> 문서 사진 -> AI가 읽어줌
- "이 식물 이름이 뭐야?" -> 식물 사진 -> AI 식별

### API 연동

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/api/v1/helper/analyze` | POST | 사진 분석 (base64 이미지) |

---

## 백엔드 구조

### Phase 0 (현재 구현)

```
apps/api/src/main/java/com/senior/chat/
+-- ChatController.java      # REST 엔드포인트
+-- ChatService.java         # 비즈니스 로직
+-- ChatRepository.java      # JPA Repository
+-- ChatMessage.java         # 메시지 엔티티 (userId 기반)
```

### Phase 1 (목표)

```
apps/api/src/main/java/com/senior/
+-- chat/                    # 기존 채팅 (말벗 백엔드)
+-- helper/                  # AI 도우미 (사진 분석)
+-- companion/               # 말벗 프로필/설정
```

## AI 연동 (Spring AI)

```
apps/api/src/main/java/com/senior/ai/
+-- AiOrchestrator.java      # Spring AI ChatClient 호출
+-- PersonaConfig.java       # 시스템 프롬프트(다솜이 페르소나)
```
