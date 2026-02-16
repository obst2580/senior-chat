# ADR-001: 기술 스택 선정

## 상태: 채택 (수정됨)

## 날짜: 2026-02-15

## 변경 이력
- 초안: Next.js 15 + Vercel AI SDK (웹 앱)
- 수정: Expo + Spring Boot (모바일 앱) - 실제 서비스 출시 목표에 맞게 전환

## 결정

시니어 친화적 AI 동반자 모바일 앱을 다음 기술 스택으로 구현한다.

| 카테고리 | 선택 | 대안 | 선택 이유 |
|----------|------|------|-----------|
| 모바일 | React Native / Expo | Flutter, Native | 크로스플랫폼, 앱스토어 배포, Expo Router |
| 백엔드 | Spring Boot (Java 21) | NestJS, Django | 엔터프라이즈급, 검증된 생태계 |
| AI 연동 | Spring AI + Claude | LangChain, 직접 구현 | 서버사이드 프롬프트 관리, API 키 보호 |
| DB | PostgreSQL | MySQL, MongoDB | 관계형 데이터, JSON 지원, 성숙한 생태계 |
| 캐시 | Redis | Memcached | 세션, 대화 컨텍스트, Rate limiting |
| STT | Whisper API | Google Speech | 한국어 인식 품질 |
| TTS | OpenAI TTS / Clova | Google TTS | 자연스러운 한국어 음성 |

## 근거

### React Native / Expo (모바일)
- 앱스토어 배포 필수 (시니어는 웹 접근성이 낮음)
- Expo Router로 파일 기반 라우팅
- React 생태계 활용 (개발 생산성)
- 크로스플랫폼으로 iOS/Android 동시 지원

### Spring Boot (백엔드)
- 엔터프라이즈급 서비스 목표에 적합
- Spring AI로 Claude API 깔끔하게 연동
- Spring Security + JWT 인증
- JPA + PostgreSQL로 안정적인 데이터 관리
- 검증된 생태계와 풍부한 라이브러리

### Spring AI + Claude (AI)
- 서버사이드에서 시스템 프롬프트 관리 (클라이언트 노출 방지)
- API 키를 서버에서 보호
- 프롬프트 엔지니어링을 코드 배포 없이 변경 가능
- SSE 스트리밍으로 실시간 응답 전달

### 웹이 아닌 모바일 앱인 이유
- 타겟 사용자(60세+)가 앱스토어 설치에 더 익숙
- 자녀가 "앱을 깔아드리는" 시나리오가 핵심
- 푸시 알림, 음성 녹음 등 네이티브 기능 필요
- 홈 화면 아이콘으로 쉬운 접근

## 결과

- 모바일 네이티브 기능 (음성, 푸시, 카메라) 활용 가능
- 서버사이드 AI 관리로 보안 강화
- 엔터프라이즈급 백엔드로 확장성 확보
- 모노레포(pnpm workspaces)로 프론트/백엔드 통합 관리
