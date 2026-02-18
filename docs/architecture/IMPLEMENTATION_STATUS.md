# Implementation Status

> 문서(목표)와 코드(현재)가 어긋나지 않도록, 구현 현황을 한 곳에서 추적한다.

## Phase 0 (현재 구현)

| 영역 | 상태 | 근거(코드/문서) |
|------|------|-----------------|
| Chat - 단일 응답 | 구현됨 | `apps/api/src/main/java/com/senior/chat/ChatController.java`, `apps/mobile/lib/api-client.ts` |
| Chat - 히스토리(userId 기반) | 구현됨 | `apps/api/src/main/java/com/senior/chat/ChatRepository.java` |
| AI - Claude 호출(Spring AI) | 구현됨 | `apps/api/src/main/java/com/senior/ai/AiOrchestrator.java` |
| AI - 페르소나 시스템 프롬프트 | 구현됨 | `apps/api/src/main/java/com/senior/ai/PersonaConfig.java` |
| Auth - 전화번호 인증 | Placeholder | `apps/api/src/main/java/com/senior/auth/AuthController.java` |
| JWT 검증/인가 | 미구현 | `apps/api/src/main/java/com/senior/config/SecurityConfig.java` (permitAll) |
| Voice - STT/TTS API | 미구현 | `docs/architecture/API_CONTRACTS.md`에만 존재 |
| Mobile - 채팅 UI | 구현됨 | `apps/mobile/components/chat/*` |
| Mobile - 음성 UI | 부분 구현 | `apps/mobile/components/voice/VoiceButton.tsx` |
| DB 스키마 | 부분 구현 | `User.java`, `ChatMessage.java` |

## Phase 0.5 - 4대 기능 플랫폼 재편 (현재)

| 영역 | 상태 | 근거(코드) |
|------|------|-----------|
| 홈 화면 (2x2 그리드) | 구현됨 | `apps/mobile/app/(main)/index.tsx` |
| FeatureCard 컴포넌트 | 구현됨 | `apps/mobile/components/ui/FeatureCard.tsx` |
| 4개 기능 라우팅 구조 | 구현됨 | `apps/mobile/app/(main)/_layout.tsx` + 각 feature `_layout.tsx` |
| 타입 정의 (4개 기능) | 구현됨 | `apps/mobile/types/{companion,helper,schedule,pastime}.ts` |
| API 클라이언트 확장 | 구현됨 | `apps/mobile/lib/api-client.ts` (10개 신규 엔드포인트) |
| 색상 팔레트 확장 | 구현됨 | `apps/mobile/constants/colors.ts` (5색 추가) |

### AI 도우미 (Helper)

| 영역 | 상태 | 근거 |
|------|------|------|
| 카메라 화면 (Placeholder) | 구현됨 | `apps/mobile/app/(main)/helper/index.tsx` |
| 분석 결과 화면 | 구현됨 | `apps/mobile/app/(main)/helper/result.tsx` |
| CameraButton 컴포넌트 | 구현됨 | `apps/mobile/components/helper/CameraButton.tsx` |
| PhotoPreview 컴포넌트 | 구현됨 | `apps/mobile/components/helper/PhotoPreview.tsx` |
| AnalysisResult 컴포넌트 | 구현됨 | `apps/mobile/components/helper/AnalysisResult.tsx` |
| useCamera 훅 | Stub | `apps/mobile/hooks/useCamera.ts` (expo-camera 미설치) |
| useImageAnalysis 훅 | 구현됨 | `apps/mobile/hooks/useImageAnalysis.ts` |
| 카메라 실제 동작 | 미구현 | expo-camera 설치 필요 |
| 백엔드 분석 API | 미구현 | `POST /api/v1/helper/analyze` |

### AI 말벗 (Companion)

| 영역 | 상태 | 근거 |
|------|------|------|
| 전화 걸기 화면 | 구현됨 | `apps/mobile/app/(main)/companion/index.tsx` |
| 말벗 설정 화면 | 구현됨 | `apps/mobile/app/(main)/companion/settings.tsx` |
| CallUI 컴포넌트 | 구현됨 | `apps/mobile/components/companion/CallUI.tsx` |
| CompanionAvatar 컴포넌트 | 구현됨 | `apps/mobile/components/companion/CompanionAvatar.tsx` |
| CallControls 컴포넌트 | 구현됨 | `apps/mobile/components/companion/CallControls.tsx` |
| useCompanion 훅 | 구현됨 | `apps/mobile/hooks/useCompanion.ts` |
| 백엔드 프로필 API | 미구현 | `GET/PUT /api/v1/companion/{userId}/profile` |
| 백엔드 채팅 API | 미구현 | `POST /api/v1/companion/chat` |

### 일정 알리미 (Schedule)

| 영역 | 상태 | 근거 |
|------|------|------|
| 달력 + 일정 목록 화면 | 구현됨 | `apps/mobile/app/(main)/schedule/index.tsx` |
| 5단계 위저드 화면 (5개) | 구현됨 | `apps/mobile/app/(main)/schedule/create/*.tsx` |
| CalendarView 컴포넌트 | 구현됨 | `apps/mobile/components/schedule/CalendarView.tsx` |
| SeniorDatePicker | 구현됨 | `apps/mobile/components/ui/SeniorDatePicker.tsx` |
| SeniorTimePicker | 구현됨 | `apps/mobile/components/ui/SeniorTimePicker.tsx` |
| StepHeader 컴포넌트 | 구현됨 | `apps/mobile/components/ui/StepHeader.tsx` |
| ScheduleCard 컴포넌트 | 구현됨 | `apps/mobile/components/schedule/ScheduleCard.tsx` |
| ScheduleList 컴포넌트 | 구현됨 | `apps/mobile/components/schedule/ScheduleList.tsx` |
| ReminderOption 컴포넌트 | 구현됨 | `apps/mobile/components/schedule/ReminderOption.tsx` |
| useSchedule 훅 | 구현됨 | `apps/mobile/hooks/useSchedule.ts` |
| useScheduleCreation 훅 | 구현됨 | `apps/mobile/hooks/useScheduleCreation.ts` |
| useNotifications 훅 | Stub | `apps/mobile/hooks/useNotifications.ts` (expo-notifications 미설치) |
| 백엔드 일정 API | 미구현 | `GET/POST /api/v1/schedules` |

### 시간 보내기 (Pastime)

| 영역 | 상태 | 근거 |
|------|------|------|
| 게임 선택 화면 | 구현됨 | `apps/mobile/app/(main)/pastime/index.tsx` |
| 카드 뒤집기 화면 | 구현됨 | `apps/mobile/app/(main)/pastime/card-matching.tsx` |
| 순서 맞추기 화면 | 구현됨 | `apps/mobile/app/(main)/pastime/number-ordering.tsx` |
| 색깔 글자 화면 | 구현됨 | `apps/mobile/app/(main)/pastime/color-word.tsx` |
| 끝말잇기 화면 | 구현됨 | `apps/mobile/app/(main)/pastime/word-chain.tsx` |
| 일일 퀴즈 화면 (3개) | 구현됨 | `apps/mobile/app/(main)/pastime/daily-quiz/*.tsx` |
| CardGrid 컴포넌트 | 구현됨 | `apps/mobile/components/pastime/CardGrid.tsx` |
| NumberGrid 컴포넌트 | 구현됨 | `apps/mobile/components/pastime/NumberGrid.tsx` |
| QuizQuestion 컴포넌트 | 구현됨 | `apps/mobile/components/pastime/QuizQuestion.tsx` |
| ColorWordDisplay 컴포넌트 | 구현됨 | `apps/mobile/components/pastime/ColorWordDisplay.tsx` |
| useGame 훅 | 구현됨 | `apps/mobile/hooks/useGame.ts` |
| useCardMatching 훅 | 구현됨 | `apps/mobile/hooks/useCardMatching.ts` |
| useNumberOrdering 훅 | 구현됨 | `apps/mobile/hooks/useNumberOrdering.ts` |
| useColorWord 훅 | 구현됨 | `apps/mobile/hooks/useColorWord.ts` |
| useWordChain 훅 | 구현됨 | `apps/mobile/hooks/useWordChain.ts` |
| useDailyQuiz 훅 | 구현됨 | `apps/mobile/hooks/useDailyQuiz.ts` |
| 백엔드 퀴즈 API | 미구현 | `GET/POST /api/v1/pastime/daily-quiz/*` |
| 백엔드 끝말잇기 API | 미구현 | `POST /api/v1/pastime/word-chain` |

## Phase 1 (목표)

| 영역 | 목표 |
|------|------|
| Chat - SSE 스트리밍 | `POST /api/v1/chat` 가 `text/event-stream`로 토큰 스트리밍 |
| Conversation 모델 | `conversationId(UUID)` 기반 대화 목록/메시지 조회 |
| Auth/JWT | Bearer JWT + refresh 토큰 + `/users/me` |
| Voice | `/voice/stt`(Whisper) + `/voice/tts`(OpenAI/Clova) |
| Helper 백엔드 | 사진 분석 + GPT Vision 연동 |
| Schedule 백엔드 | 일정 CRUD + 푸시 알림 |
| Pastime 백엔드 | 퀴즈 생성 + 끝말잇기 AI |

## 운영 원칙

- 문서에만 존재하는 기능은 반드시 `Phase 1 (목표)`로 표시한다.
- 구현이 시작되면, 관련 파일 경로를 Phase 0 표에 추가한다.
- Stub 상태인 훅은 실제 의존성 설치 후 구현으로 전환한다.
