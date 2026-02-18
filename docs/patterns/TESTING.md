# Testing Strategy

## 상태 (문서 vs 구현)

현재 레포는 테스트 인프라가 초기 단계다. 이 문서는 목표 전략(Phase 1)과 현재 사용 가능한 검증(Phase 0)을 함께 기록한다.

## Phase 0 (현재 구현)

### Backend (Spring Boot)

- JUnit 5 기반 스프링 컨텍스트 테스트만 존재
- 테스트 실행: `pnpm api:test` (단, 로컬 Java 설치 필요)
- 관련 파일: `apps/api/src/test/java/com/senior/SeniorApplicationTests.java`

### Mobile (Expo / React Native)

- ESLint는 아직 의존성이 없어 `pnpm mobile lint`가 실패할 수 있음
- 최소 검증: TypeScript typecheck
  - 실행: `pnpm --filter @senior/mobile exec tsc --noEmit`

## Phase 1 (목표)

### 도구

| 도구 | 용도 |
|------|------|
| Vitest | 유닛 테스트 + 통합 테스트 |
| @testing-library/react-native | 컴포넌트 테스트 |
| Playwright | E2E 테스트 (웹/에뮬레이터 전략은 별도 정의) |
| MSW | API 모킹 |

### 테스트 구조(안)

```
tests/
├── unit/                     # 유닛 테스트
│   ├── mobile/               # 모바일 유틸/훅
│   └── api/                  # 백엔드 유틸/도메인
├── integration/              # 통합 테스트
│   ├── api/                  # API 엔드포인트
│   └── mobile/               # 컴포넌트 인터랙션
└── e2e/                      # E2E 테스트
    ├── chat.spec.ts          # 채팅 플로우
    └── voice.spec.ts         # 음성 플로우
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
