# System Architecture Overview

## 시스템 개요

시니어를 위한 AI 동반자 모바일 앱 - Expo (React Native) + Spring Boot 모노레포 아키텍처.
홈 화면에서 4대 기능(AI 도우미, AI 말벗, 일정 알리미, 시간 보내기)으로 분기.

## 아키텍처

```
[어르신 모바일 앱]             [자녀 앱 (Phase 2)]
 React Native/Expo              React Native/Expo
      |                               |
      +---------------+---------------+
                      | REST + SSE
      +---------------+---------------+
      |     Spring Boot API Server    |
      |                               |
      |  +----------+ +----------+   |
      |  | Chat     | | Helper   |   |
      |  | Service  | | Service  |   |
      |  +----+-----+ +----------+   |
      |       |                       |
      |  +----+-----+ +----------+   |
      |  | Spring AI | | Schedule |   |
      |  | (Claude)  | | Service  |   |
      |  +----+-----+ +----------+   |
      +-------+-----------+-----------+
              |           |
      +-------+--+ +-----+----+ +-------+
      |Claude API| |PostgreSQL| | Redis  |
      |(Anthropic)| |(데이터)  | |(캐시)  |
      +----------+ +----------+ +--------+
```

## 모노레포 구조

```
senior-chat/
+-- apps/
|   +-- mobile/                  React Native / Expo
|   |   +-- app/                 Expo Router (화면)
|   |   |   +-- (auth)/          인증/온보딩 화면
|   |   |   +-- (main)/          메인 화면
|   |   |   |   +-- index.tsx        홈 화면 (2x2 그리드)
|   |   |   |   +-- helper/         AI 도우미 (카메라 + 분석)
|   |   |   |   +-- companion/      AI 말벗 (전화 UI + 채팅)
|   |   |   |   +-- schedule/       일정 알리미 (달력 + 위저드)
|   |   |   |   +-- pastime/        시간 보내기 (게임 + 퀴즈)
|   |   |   +-- _layout.tsx
|   |   +-- components/          UI 컴포넌트
|   |   |   +-- chat/            채팅 컴포넌트 (말벗에서 재사용)
|   |   |   +-- voice/           음성 컴포넌트
|   |   |   +-- ui/              공통 UI (FeatureCard, StepHeader 등)
|   |   |   +-- helper/          AI 도우미 전용 컴포넌트
|   |   |   +-- companion/       AI 말벗 전용 컴포넌트
|   |   |   +-- schedule/        일정 전용 컴포넌트
|   |   |   +-- pastime/         게임 전용 컴포넌트
|   |   +-- hooks/               커스텀 훅
|   |   +-- types/               타입 정의
|   |   +-- lib/                 API 클라이언트
|   |   +-- constants/           색상, 타이포그래피
|   |
|   +-- api/                     Spring Boot
|       +-- src/main/java/com/senior/
|           +-- chat/            채팅 도메인
|           +-- auth/            인증 도메인
|           +-- user/            사용자 도메인
|           +-- ai/              AI 연동 (Spring AI)
|           +-- subscription/    구독 도메인
|
+-- packages/                    공유 패키지
+-- docs/                        AI-Native 문서
+-- CLAUDE.md
```

## 주요 컴포넌트 (기능별)

### 홈 화면
| 컴포넌트 | 위치 | 책임 |
|----------|------|------|
| HomeScreen | `app/(main)/index.tsx` | 2x2 기능 그리드 |
| FeatureCard | `components/ui/FeatureCard.tsx` | 대형 기능 버튼 |

### AI 도우미 (Helper)
| 컴포넌트 | 위치 | 책임 |
|----------|------|------|
| CameraButton | `components/helper/CameraButton.tsx` | 대형 카메라 버튼 |
| PhotoPreview | `components/helper/PhotoPreview.tsx` | 사진 미리보기 |
| AnalysisResult | `components/helper/AnalysisResult.tsx` | AI 분석 결과 |
| useCamera | `hooks/useCamera.ts` | 카메라 촬영 로직 |
| useImageAnalysis | `hooks/useImageAnalysis.ts` | 사진 분석 API |

### AI 말벗 (Companion)
| 컴포넌트 | 위치 | 책임 |
|----------|------|------|
| CallUI | `components/companion/CallUI.tsx` | 전화 걸기 UI |
| CompanionAvatar | `components/companion/CompanionAvatar.tsx` | 아바타 |
| CallControls | `components/companion/CallControls.tsx` | 통화 제어 |
| useCompanion | `hooks/useCompanion.ts` | 말벗 상태 관리 |
| Chat Components | `components/chat/*` | 기존 채팅 UI 재사용 |

### 일정 알리미 (Schedule)
| 컴포넌트 | 위치 | 책임 |
|----------|------|------|
| CalendarView | `components/schedule/CalendarView.tsx` | 월간 달력 |
| ScheduleCard | `components/schedule/ScheduleCard.tsx` | 일정 카드 |
| ScheduleList | `components/schedule/ScheduleList.tsx` | 일정 목록 |
| ReminderOption | `components/schedule/ReminderOption.tsx` | 알림 옵션 |
| useSchedule | `hooks/useSchedule.ts` | 일정 CRUD |
| useScheduleCreation | `hooks/useScheduleCreation.ts` | 위저드 상태 |

### 시간 보내기 (Pastime)
| 컴포넌트 | 위치 | 책임 |
|----------|------|------|
| GameCard | `components/pastime/GameCard.tsx` | 게임 선택 카드 |
| CardGrid | `components/pastime/CardGrid.tsx` | 카드 매칭 그리드 |
| NumberGrid | `components/pastime/NumberGrid.tsx` | 숫자 정렬 그리드 |
| QuizQuestion | `components/pastime/QuizQuestion.tsx` | 퀴즈 문제 |
| useGame | `hooks/useGame.ts` | 공통 게임 로직 |
| useCardMatching | `hooks/useCardMatching.ts` | 카드 매칭 |
| useDailyQuiz | `hooks/useDailyQuiz.ts` | 일일 퀴즈 |

## API 엔드포인트

| 엔드포인트 | 메서드 | 기능 영역 |
|-----------|--------|-----------|
| `/api/v1/chat/send` | POST | AI 말벗 (Phase 0) |
| `/api/v1/chat/history/{userId}` | GET | AI 말벗 (Phase 0) |
| `/api/v1/helper/analyze` | POST | AI 도우미 |
| `/api/v1/companion/{userId}/profile` | GET/PUT | AI 말벗 설정 |
| `/api/v1/companion/chat` | POST | AI 말벗 대화 |
| `/api/v1/schedules/{userId}` | GET | 일정 목록 |
| `/api/v1/schedules` | POST | 일정 생성 |
| `/api/v1/pastime/daily-quiz/questions` | GET | 퀴즈 문제 |
| `/api/v1/pastime/daily-quiz/submit` | POST | 퀴즈 제출 |
| `/api/v1/pastime/word-chain` | POST | 끝말잇기 |

## 기술 스택

| 카테고리 | 기술 | 이유 |
|----------|------|------|
| Mobile | React Native / Expo | 크로스플랫폼, 앱스토어 배포 |
| Routing | Expo Router | 파일 기반 라우팅 |
| Backend | Spring Boot (Java/Kotlin) | 엔터프라이즈급, 검증된 생태계 |
| AI | Spring AI + Anthropic Claude | 서버사이드 프롬프트 관리, API 키 보호 |
| DB | PostgreSQL | 대화 이력, 사용자, 구독 |
| Cache | Redis | 세션, 대화 컨텍스트 임시 저장 |
| STT | Whisper API | 한국어 음성 인식 |
| TTS | OpenAI TTS (or Clova) | 자연스러운 한국어 음성 합성 |
| Testing | TypeScript typecheck + JUnit 5 (Phase 0), Vitest/Playwright (Phase 1 목표) | 프론트/백엔드/E2E |
