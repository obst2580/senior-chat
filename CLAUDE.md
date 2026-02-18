# Senior Chat - AI Companion for Seniors

> 시니어를 위한 AI 동반자 앱 - 자식들이 깔아주면 안심

## Tech Stack
- **Mobile**: React Native / Expo (Expo Router)
- **Backend**: Spring Boot (Java/Kotlin)
- **AI**: Spring AI + Anthropic Claude
- **DB**: PostgreSQL + Redis
- **Voice**: Whisper API (STT) + OpenAI TTS

## Commands
```bash
# Mobile (apps/mobile)
pnpm mobile:start    # Expo 개발 서버
pnpm mobile:ios      # iOS 시뮬레이터
pnpm mobile:android  # Android 에뮬레이터

# API (apps/api)
pnpm api:dev         # Spring Boot 개발 서버 (http://localhost:8080)
pnpm api:build       # Gradle 빌드
pnpm api:test        # 백엔드 테스트

# Root
pnpm test            # 전체 테스트
pnpm lint            # 전체 린트
```

## Project Structure
```
apps/mobile/           -> Expo (React Native) 앱
apps/api/              -> Spring Boot 백엔드
docs/                  -> 프로젝트 지식베이스
packages/              -> 공유 패키지 (타입, 설정 등)
```

## Documentation
자세한 정보는 `docs/INDEX.md`를 참조하세요.
작업 전 해당 도메인의 문서를 먼저 읽어주세요.

## Agent Workflow
1. 작업 시작: `/check-health`
2. 기능 구현: planner -> tdd-guide -> code-reviewer
3. 작업 완료: `/entropy-clean` -> `/doc-garden` -> commit

## Key Principles
- **시니어 UX 최우선**: 20px+ 글씨, 56px+ 터치타겟, 4.5:1 대비
- **접근성(a11y)**: WCAG AA 준수 필수
- **Golden Principles**: docs/INDEX.md 참조
- **Port**: API 8080
