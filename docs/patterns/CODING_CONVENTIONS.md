# Coding Conventions

## 파일 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx            # 메인 채팅 페이지
│   ├── layout.tsx          # 루트 레이아웃
│   ├── globals.css         # 글로벌 스타일
│   └── api/
│       └── chat/
│           └── route.ts    # 채팅 API 라우트
├── components/             # React 컴포넌트
│   ├── chat/               # 채팅 관련
│   ├── voice/              # 음성 관련
│   └── ui/                 # 공통 UI
├── lib/                    # 유틸리티 및 API 클라이언트
│   └── chat-api.ts         # Claude API 연동
└── types/                  # TypeScript 타입 정의
    ├── chat.ts             # 채팅 관련 타입
    └── common.ts           # 공통 타입
```

## 네이밍 컨벤션

| 대상 | 컨벤션 | 예시 |
|------|--------|------|
| 컴포넌트 파일 | PascalCase | `ChatWindow.tsx` |
| 유틸리티 파일 | kebab-case | `chat-api.ts` |
| 타입 파일 | kebab-case | `chat.ts` |
| 컴포넌트명 | PascalCase | `ChatWindow` |
| 함수명 | camelCase | `sendMessage` |
| 상수 | UPPER_SNAKE | `MAX_MESSAGE_LENGTH` |
| 타입/인터페이스 | PascalCase | `ChatMessage` |

## Import 순서

1. React / Next.js
2. 외부 라이브러리
3. `@/lib/` (유틸리티)
4. `@/types/` (타입)
5. `@/components/` (컴포넌트)
6. 상대 경로 import

## Golden Principles 준수

- 파일 800줄 이하 (목표 200-400줄)
- console.log 금지
- 외부 API 호출은 lib/ 에서만
- 불변성 유지 (spread operator 사용)
- types/ 에 타입 정의
