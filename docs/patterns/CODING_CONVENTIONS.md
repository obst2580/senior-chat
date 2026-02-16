# Coding Conventions

이 문서는 `seniar-chat` 모노레포의 실제 구조(Expo Router + Spring Boot)에 맞춘 코딩 컨벤션이다.

## 파일 구조

### Mobile (Expo / React Native)

```
apps/mobile/
├── app/                      # Expo Router (화면)
│   ├── _layout.tsx
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── onboarding.tsx
│   └── (main)/
│       ├── _layout.tsx
│       ├── index.tsx         # 메인 채팅
│       └── settings.tsx
├── components/
│   ├── chat/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatInput.tsx
│   │   ├── MessageList.tsx
│   │   └── MessageBubble.tsx
│   ├── voice/
│   │   └── VoiceButton.tsx
│   └── ui/
│       └── SeniorButton.tsx
├── constants/                 # 디자인 토큰
│   ├── colors.ts
│   └── typography.ts
├── hooks/                     # UI 로직
│   └── useChat.ts
├── lib/                       # API 클라이언트
│   └── api-client.ts
└── types/                     # TypeScript 타입
    └── chat.ts
```

### API (Spring Boot)

```
apps/api/
└── src/main/java/com/seniar/
    ├── ai/                    # Spring AI 통합
    ├── auth/                  # 인증
    ├── chat/                  # 채팅 도메인
    ├── config/                # 보안/CORS 등 설정
    └── user/                  # 사용자 도메인
```

## 네이밍 컨벤션

| 대상 | 컨벤션 | 예시 |
|------|--------|------|
| React 컴포넌트 파일 | PascalCase | `ChatWindow.tsx` |
| React 컴포넌트명 | PascalCase | `ChatWindow` |
| 훅 | camelCase + use 접두사 | `useChat` |
| 유틸/클라이언트 파일 | kebab-case | `api-client.ts` |
| 상수 | UPPER_SNAKE | `MAX_MESSAGE_LENGTH` |
| 타입/인터페이스 | PascalCase | `ChatMessage` |
| Expo Router 라우트 파일 | kebab/lower | `index.tsx`, `settings.tsx` |

## Import 순서 (TypeScript)

1. React
2. React Native / Expo
3. 외부 라이브러리
4. 절대 경로(`@/`): `@/constants`, `@/types`, `@/lib`, `@/components`, `@/hooks`
5. 상대 경로 import

## Golden Principles

- 파일 800줄 이하 (목표 200-400줄)
- `console.log` 금지 (필요하면 플랫폼에 맞는 로깅 래퍼를 도입)
- 외부 API 호출은 `apps/mobile/lib/` 또는 `apps/api/` 서비스 계층에서만
- 불변성 유지 (객체/배열 직접 mutate 금지)
- 시니어 UX: 기본 폰트 20px+, 터치 타겟 56px+ (`docs/patterns/ACCESSIBILITY.md`)

## API 응답/DTO (Spring Boot)

- 새 코드는 `Map` 기반 응답보다 DTO(예: record)로 명시적인 스키마를 선호
- 예외 처리는 컨트롤러 단위 `@ExceptionHandler`보다 전역 예외 처리(ControllerAdvice)로 수렴시키는 방향을 권장
