# System Architecture Overview

## 시스템 개요

시니어를 위한 AI 동반자 모바일 앱 - Expo (React Native) + Spring Boot 모노레포 아키텍처

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
      |  | Chat     | | Auth     |   |
      |  | Service  | | Service  |   |
      |  +----+-----+ +----------+   |
      |       |                       |
      |  +----+-----+ +----------+   |
      |  | Spring AI | | Billing  |   |
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
seniar-chat/
+-- apps/
|   +-- mobile/                  React Native / Expo
|   |   +-- app/                 Expo Router (화면)
|   |   |   +-- (auth)/          인증/온보딩 화면
|   |   |   +-- (main)/          메인 채팅 화면
|   |   |   +-- _layout.tsx
|   |   +-- components/          UI 컴포넌트
|   |   |   +-- chat/            채팅 컴포넌트
|   |   |   +-- voice/           음성 컴포넌트
|   |   |   +-- ui/              공통 UI
|   |   +-- lib/                 API 클라이언트
|   |   +-- hooks/               커스텀 훅
|   |
|   +-- api/                     Spring Boot
|       +-- src/main/java/com/seniar/
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

## 주요 컴포넌트

| 컴포넌트 | 위치 | 책임 |
|----------|------|------|
| Chat Screen | `apps/mobile/app/(main)/` | 메인 채팅 화면 |
| Chat Components | `apps/mobile/components/chat/` | 채팅 UI (메시지 버블, 입력 등) |
| Voice Components | `apps/mobile/components/voice/` | 마이크 버튼, TTS 재생 |
| API Client | `apps/mobile/lib/api.ts` | Spring Boot API 호출 |
| Chat Controller | `apps/api/.../chat/ChatController.java` | REST 엔드포인트 |
| Chat Service | `apps/api/.../chat/ChatService.java` | 비즈니스 로직 |
| AI Service | `apps/api/.../ai/AiService.java` | Spring AI + Claude 연동 |
| Auth Service | `apps/api/.../auth/AuthService.java` | 전화번호 인증 |

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
| Testing | Jest + JUnit 5 + Playwright | 프론트/백엔드/E2E |

## 데이터 흐름

1. 어르신이 텍스트 입력 또는 마이크 버튼으로 음성 입력
2. Expo 앱이 Spring Boot API (`POST /api/v1/chat`)에 요청
3. ChatService가 Spring AI를 통해 Claude API에 스트리밍 요청
4. SSE로 응답이 실시간으로 모바일 앱에 스트리밍
5. 채팅 UI에 점진적으로 표시
6. (선택) TTS로 응답 읽어주기

## 외부 의존성

| 서비스 | 용도 | 필수 여부 |
|--------|------|-----------|
| Anthropic Claude API | AI 응답 생성 (Spring AI) | 필수 |
| PostgreSQL | 사용자/대화 데이터 저장 | 필수 |
| Redis | 세션 캐시, 대화 컨텍스트 | 필수 |
| Whisper API | 음성 -> 텍스트 변환 | MVP 필수 |
| OpenAI TTS / Clova | 텍스트 -> 음성 변환 | MVP 필수 |
