# Testing Strategy

## 프레임워크

| 도구 | 용도 |
|------|------|
| Vitest | 유닛 테스트 + 통합 테스트 |
| @testing-library/react | 컴포넌트 테스트 |
| Playwright | E2E 테스트 |
| MSW | API 모킹 |

## 테스트 구조

```
tests/
├── unit/               # 유닛 테스트
│   ├── lib/            # 유틸리티 함수
│   └── types/          # 타입 가드
├── integration/        # 통합 테스트
│   ├── api/            # API 라우트
│   └── components/     # 컴포넌트 인터랙션
└── e2e/                # E2E 테스트
    ├── chat.spec.ts    # 채팅 플로우
    └── voice.spec.ts   # 음성 인터페이스
```

## 커버리지 목표

- 전체: 80% 이상
- lib/: 90% 이상 (핵심 로직)
- components/: 70% 이상

## TDD 워크플로우

1. RED: 실패하는 테스트 작성
2. GREEN: 최소 구현으로 테스트 통과
3. REFACTOR: 코드 정리
4. COVERAGE: 80% 이상 확인

## 접근성 테스트

E2E 테스트에 접근성 검증 포함:
- axe-core 자동 스캔
- 키보드 네비게이션 테스트
- 스크린 리더 호환성
- 색상 대비 자동 검증
