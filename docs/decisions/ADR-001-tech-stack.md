# ADR-001: 기술 스택 선정

## 상태: 채택

## 날짜: 2026-02-15

## 결정

시니어 친화적 AI 챗봇을 다음 기술 스택으로 구현한다.

| 카테고리 | 선택 | 대안 |
|----------|------|------|
| Framework | Next.js 15 (App Router) | Remix, SvelteKit |
| Language | TypeScript 5 | JavaScript |
| Styling | TailwindCSS 4 | CSS Modules, styled-components |
| AI SDK | @ai-sdk/anthropic | langchain, 직접 구현 |
| UI Primitives | Radix UI | Headless UI, shadcn/ui |
| Testing | Vitest + Playwright | Jest + Cypress |

## 근거

### Next.js 15
- App Router의 서버 컴포넌트로 초기 로딩 속도 최적화 (시니어 사용자 경험)
- Route Handler에서 스트리밍 응답 네이티브 지원
- Vercel 배포 간편성

### @ai-sdk/anthropic (Vercel AI SDK)
- `useChat` hook으로 스트리밍 채팅 구현이 매우 간단
- Next.js와 공식 지원 통합
- Claude API 직접 구현 대비 코드량 대폭 감소

### TailwindCSS 4
- 유틸리티 기반으로 시니어 UX 커스텀 빠름
- 반응형 디자인 구현 용이
- 디자인 토큰으로 접근성 색상/크기 체계 관리

### Radix UI
- 접근성(a11y) 내장 - 키보드 네비게이션, ARIA 자동 처리
- 헤드리스 컴포넌트로 시니어 UX 커스텀 자유도 높음

## 결과

- SSR + 스트리밍으로 빠른 초기 로딩
- AI SDK로 챗봇 구현 복잡도 대폭 감소
- 접근성 기본 보장
