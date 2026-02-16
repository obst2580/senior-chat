# Seniar Chat - Documentation Index

> 시니어를 위한 AI 동반자 앱 - Expo + Spring Boot 모노레포

## Quick Navigation

| 문서 | 설명 | 언제 읽나? |
|------|------|-----------|
| [architecture/OVERVIEW.md](./architecture/OVERVIEW.md) | 시스템 아키텍처 (Expo + Spring Boot + Claude) | 프로젝트 구조 파악 시 |
| [architecture/DATA_MODEL.md](./architecture/DATA_MODEL.md) | PostgreSQL 데이터 모델 | DB/엔티티 관련 작업 시 |
| [architecture/API_CONTRACTS.md](./architecture/API_CONTRACTS.md) | Spring Boot REST API 명세 | API 작업 시 |
| [architecture/IMPLEMENTATION_STATUS.md](./architecture/IMPLEMENTATION_STATUS.md) | 문서-코드 구현 현황 추적 | 드리프트 점검/마일스톤 관리 |
| [patterns/CODING_CONVENTIONS.md](./patterns/CODING_CONVENTIONS.md) | 코딩 컨벤션 (모바일 + 백엔드) | 코드 작성 시 |
| [patterns/ERROR_HANDLING.md](./patterns/ERROR_HANDLING.md) | 에러 처리 전략 | 에러 처리 구현 시 |
| [patterns/TESTING.md](./patterns/TESTING.md) | 테스트 전략 (Phase 0/1) | 테스트 작성 시 |
| [patterns/ACCESSIBILITY.md](./patterns/ACCESSIBILITY.md) | 접근성 가이드 | UI 구현 시 (필독) |
| [domain/chat/README.md](./domain/chat/README.md) | 채팅 기능 도메인 (Spring AI + Expo) | 채팅 기능 작업 시 |
| [domain/voice/README.md](./domain/voice/README.md) | 음성 인터페이스 도메인 | 음성 기능 작업 시 |
| [domain/senior-ux/README.md](./domain/senior-ux/README.md) | 시니어 UX 가이드 | UI/UX 작업 시 (필독) |
| [plans/2026-02-15-product-design.md](./plans/2026-02-15-product-design.md) | 전체 제품 설계 문서 | 제품 방향 확인 시 |
| [decisions/](./decisions/) | 아키텍처 결정 기록 (ADR) | 설계 변경 시 |

## Project Context

- **프로젝트 목적**: 디지털 소외 계층인 시니어들이 AI를 쉽게 활용할 수 있는 모바일 앱
- **핵심 가치**: "자식들이 이 앱만 깔아주면 안심하고 지낼 수 있도록"
- **타겟 사용자**: 60세 이상 시니어 (스마트폰)
- **AI 페르소나**: 다솜이 - 따뜻한 손자/손녀 캐릭터

## Tech Stack Overview

| 영역 | 기술 |
|------|------|
| 모바일 | React Native / Expo (Expo Router) |
| 백엔드 | Spring Boot (Java/Kotlin) |
| AI | Spring AI + Anthropic Claude |
| DB | PostgreSQL + Redis |
| 음성 | Whisper API (STT) + OpenAI TTS |
