# Implementation Status

> 문서(목표)와 코드(현재)가 어긋나지 않도록, 구현 현황을 한 곳에서 추적한다.

## Phase 0 (현재 구현)

| 영역 | 상태 | 근거(코드/문서) |
|------|------|-----------------|
| Chat - 단일 응답 | 구현됨 | `apps/api/src/main/java/com/seniar/chat/ChatController.java`, `apps/mobile/lib/api-client.ts` |
| Chat - 히스토리(userId 기반) | 구현됨 | `apps/api/src/main/java/com/seniar/chat/ChatRepository.java` |
| AI - Claude 호출(Spring AI) | 구현됨 | `apps/api/src/main/java/com/seniar/ai/AiOrchestrator.java`, `apps/api/src/main/resources/application.yml` |
| AI - 페르소나 시스템 프롬프트 | 구현됨 | `apps/api/src/main/java/com/seniar/ai/PersonaConfig.java` |
| Auth - 전화번호 인증 | Placeholder | `apps/api/src/main/java/com/seniar/auth/AuthController.java` |
| JWT 검증/인가 | 미구현 | `apps/api/src/main/java/com/seniar/config/SecurityConfig.java` (permitAll) |
| Voice - STT/TTS API | 미구현 | `docs/architecture/API_CONTRACTS.md`에만 존재 |
| Mobile - 채팅 UI | 구현됨 | `apps/mobile/components/chat/*` |
| Mobile - 음성 UI | 부분 구현 | `apps/mobile/components/voice/VoiceButton.tsx` |
| DB 스키마 | 부분 구현 | `apps/api/src/main/java/com/seniar/user/User.java`, `apps/api/src/main/java/com/seniar/chat/ChatMessage.java` |

## Phase 1 (목표)

| 영역 | 목표 |
|------|------|
| Chat - SSE 스트리밍 | `POST /api/v1/chat` 가 `text/event-stream`로 토큰 스트리밍 |
| Conversation 모델 | `conversationId(UUID)` 기반 대화 목록/메시지 조회 |
| Auth/JWT | Bearer JWT + refresh 토큰 + `/users/me` |
| Voice | `/voice/stt`(Whisper) + `/voice/tts`(OpenAI/Clova) |

## 운영 원칙

- 문서에만 존재하는 기능은 반드시 `Phase 1 (목표)`로 표시한다.
- 구현이 시작되면, 관련 파일 경로를 Phase 0 표에 추가한다.
