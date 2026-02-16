# Chat Domain (채팅 기능)

## 개요

시니어 사용자가 AI 동반자 "다솜이"와 자연스럽게 대화할 수 있는 채팅 시스템.
Expo (모바일) + Spring Boot (백엔드) + Spring AI (Claude) 구조.

## 핵심 기능

### 1. 텍스트 채팅
- 메시지 입력 및 전송
- SSE 기반 AI 응답 스트리밍
- 대화 히스토리 표시 및 이어서 대화

### 2. 음성 입력 (STT)
- 큰 마이크 버튼 -> 음성 녹음
- Whisper API로 텍스트 변환
- 변환된 텍스트 자동 전송

### 3. 음성 출력 (TTS)
- AI 응답을 자동으로 읽어줌 (ON/OFF 토글)
- OpenAI TTS or Clova 한국어 음성 합성
- 속도 조절 가능 (시니어 맞춤 느린 속도)

## 모바일 컴포넌트 구조

```
apps/mobile/components/chat/
+-- ChatScreen.tsx           # 채팅 전체 화면
+-- MessageList.tsx          # 메시지 목록 (FlatList)
+-- MessageBubble.tsx        # 개별 메시지 버블
+-- ChatInput.tsx            # 텍스트 입력 영역
+-- VoiceButton.tsx          # 마이크 버튼 (56px+)
+-- TypingIndicator.tsx      # AI 응답 대기 표시
```

## 백엔드 구조

### Phase 0 (현재 구현)

```
apps/api/src/main/java/com/seniar/chat/
+-- ChatController.java      # REST 엔드포인트
+-- ChatService.java         # 비즈니스 로직
+-- ChatRepository.java      # JPA Repository
+-- ChatMessage.java         # 메시지 엔티티 (userId 기반)
```

### Phase 1 (목표)

```
apps/api/src/main/java/com/seniar/chat/
+-- ChatController.java      # REST 엔드포인트 (SSE)
+-- ChatService.java         # 비즈니스 로직
+-- dto/
|   +-- ChatRequest.java     # 요청 DTO
|   +-- ChatResponse.java    # 응답 DTO
+-- entity/
    +-- Conversation.java    # 대화 엔티티
    +-- ChatMessage.java     # 메시지 엔티티 (conversationId 기반)
```

## AI 연동 (Spring AI)

### Phase 0 (현재 구현)

```
apps/api/src/main/java/com/seniar/ai/
+-- AiOrchestrator.java      # Spring AI ChatClient 호출
+-- PersonaConfig.java       # 시스템 프롬프트(다솜이 페르소나)
```

### Phase 1 (목표)

```
apps/api/src/main/java/com/seniar/ai/
+-- AiOrchestrator.java      # 스트리밍/오류 처리 포함
+-- PromptBuilder.java       # 시니어 맞춤 프롬프트 구성
+-- SafetyFilter.java        # 의료/법률 안전장치
```

### 시스템 프롬프트 핵심
- 페르소나: 따뜻한 손자/손녀 "다솜이"
- 말투: 친근한 존댓말 ("할머니, 그건 이렇게 하시면 돼요~")
- 응답: 짧고 명확 (3-5문장), 필요시 단계별 안내
- 안전장치: 의료/법률은 반드시 "전문가 상담 권유" 포함

### 프로액티브 AI 전략
- **다솜이가 먼저 말을 건다**: 어르신은 "뭘 물어봐야 하는지" 자체를 모르는 경우가 많음
- **동네 맞춤 정보 제공**: 온보딩에서 수집한 지역(시/구/동) 기반
- **주요 프로액티브 콘텐츠**:
  - 동네 주민센터/시니어센터 프로그램 안내
  - 복지 혜택 (기초연금, 교통비 지원, 무료 건강검진)
  - 보이스피싱 주의보, 계절별 건강 관리
  - 디지털 안내 (카톡 사용법, 키오스크)
  - 동네 경로당, 문화센터, 무료 공연
- **첫 대화**: 동네를 확인하고 지역 맞춤 정보부터 시작

## API 연동

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/api/v1/chat/send` | POST | 메시지 전송 (단일 응답, Phase 0) |
| `/api/v1/chat/history/{userId}` | GET | 메시지 히스토리 (Phase 0) |
| `/api/v1/chat` | POST | 메시지 전송 (SSE 스트리밍, Phase 1 목표) |
| `/api/v1/chat/conversations` | GET | 대화 목록 |
| `/api/v1/chat/conversations/{id}/messages` | GET | 대화 메시지 조회 |
| `/api/v1/voice/stt` | POST | 음성 -> 텍스트 |
| `/api/v1/voice/tts` | POST | 텍스트 -> 음성 |

## 데이터 흐름

```
어르신 음성/텍스트 입력
        |
        v
[Expo App] -- POST /api/v1/chat --> [Spring Boot]
                                         |
                                    [ChatService]
                                         |
                                    [Spring AI + Claude API]
                                         |
                                    SSE 스트리밍 응답
                                         |
        <-- text/event-stream ----------+
        |
[메시지 표시 + TTS 재생]
```

## 상태 관리 (모바일)

- React Query (TanStack Query)로 서버 상태 관리
- 로컬 상태: 입력 텍스트, 음성 녹음 상태, TTS 재생 상태
- SSE 스트리밍은 EventSource 또는 커스텀 훅으로 처리
