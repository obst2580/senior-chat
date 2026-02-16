# Data Model

> PostgreSQL 기반 엔티티 설계

## 상태 (문서 vs 구현)

이 문서는 목표 스키마(Phase 1)를 정의한다. 현재 구현(Phase 0)은 일부 엔티티만 존재하며 스키마가 다르다.

### Phase 0 (현재 구현)

- 식별자
  - JPA 엔티티는 `Long` ID(IDENTITY) 기반
- Chat
  - `chat_messages`는 `conversation_id`가 없고 `user_id` 기반으로 메시지를 묶는다
  - 구현 파일: `apps/api/src/main/java/com/seniar/chat/ChatMessage.java`, `apps/api/src/main/java/com/seniar/chat/ChatRepository.java`
- User
  - 최소 필드만 존재(전화번호, 닉네임, 구독 티어 등)
  - 구현 파일: `apps/api/src/main/java/com/seniar/user/User.java`
- Conversation/Subscription
  - Phase 1 목표(아래)로 계획되어 있으나 아직 미구현

### Phase 1 (목표)

- UUID 기반 `users`, `conversations`, `chat_messages` 및 (Phase 2) `subscriptions`

## ER Diagram

```
User 1---* Conversation 1---* ChatMessage
User 1---0..1 Subscription
```

---

## User (사용자)

```sql
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number    VARCHAR(20) NOT NULL UNIQUE,
    name            VARCHAR(50),
    region_city     VARCHAR(30),
    region_district VARCHAR(30),
    region_dong     VARCHAR(30),
    font_size       VARCHAR(20) DEFAULT 'large',
    voice_enabled   BOOLEAN DEFAULT true,
    voice_speed     DECIMAL(2,1) DEFAULT 0.8,
    onboarding_done BOOLEAN DEFAULT false,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);
```

| 필드 | 타입 | 설명 |
|------|------|------|
| id | UUID | PK |
| phone_number | VARCHAR(20) | 전화번호 (인증용, 유니크) |
| name | VARCHAR(50) | 이름/호칭 (온보딩에서 수집) |
| region_city | VARCHAR(30) | 시/도 (서울특별시, 경기도 등) |
| region_district | VARCHAR(30) | 구/시 (강남구, 수원시 등) |
| region_dong | VARCHAR(30) | 동/읍/면 (역삼동, 매탄동 등) |
| font_size | VARCHAR(20) | 'normal', 'large', 'extra-large' |
| voice_enabled | BOOLEAN | TTS 자동 재생 여부 |
| voice_speed | DECIMAL | TTS 속도 (0.5~2.0) |
| onboarding_done | BOOLEAN | 온보딩 완료 여부 |

---

## Conversation (대화)

```sql
CREATE TABLE conversations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id),
    title           VARCHAR(100),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conversations_user_id ON conversations(user_id);
```

| 필드 | 타입 | 설명 |
|------|------|------|
| id | UUID | PK |
| user_id | UUID | FK -> users |
| title | VARCHAR(100) | 대화 제목 (첫 메시지 기반 자동 생성) |

---

## ChatMessage (채팅 메시지)

```sql
CREATE TABLE chat_messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id),
    role            VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant')),
    content         TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_conversation_id ON chat_messages(conversation_id);
```

| 필드 | 타입 | 설명 |
|------|------|------|
| id | UUID | PK |
| conversation_id | UUID | FK -> conversations |
| role | VARCHAR(10) | 'user' 또는 'assistant' |
| content | TEXT | 메시지 내용 |

---

## Subscription (구독 - Phase 2)

```sql
CREATE TABLE subscriptions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL UNIQUE REFERENCES users(id),
    plan            VARCHAR(20) NOT NULL DEFAULT 'free',
    started_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at      TIMESTAMP,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);
```

| 필드 | 타입 | 설명 |
|------|------|------|
| id | UUID | PK |
| user_id | UUID | FK -> users (1:1) |
| plan | VARCHAR(20) | 'free', 'premium' |
| started_at | TIMESTAMP | 구독 시작일 |
| expires_at | TIMESTAMP | 구독 만료일 (null이면 무기한) |

---

## Redis 캐시 구조

| Key Pattern | Value | TTL | 용도 |
|-------------|-------|-----|------|
| `session:{userId}` | JWT 세션 데이터 | 24h | 세션 관리 |
| `auth:code:{phoneNumber}` | 인증 코드 | 3min | SMS 인증 |
| `chat:context:{conversationId}` | 최근 메시지 배열 | 1h | AI 대화 컨텍스트 |
| `rate:chat:{userId}` | 요청 카운트 | 1min | Rate limiting |

---

## Java Entity (참고)

### Phase 0 (현재 구현)

- `User`: `apps/api/src/main/java/com/seniar/user/User.java`
  - `Long id` (IDENTITY)
  - `phoneNumber`, `nickname`, `tier`, `createdAt`, `lastActiveAt`
- `ChatMessage`: `apps/api/src/main/java/com/seniar/chat/ChatMessage.java`
  - `Long id` (IDENTITY)
  - `Long userId`, `role`, `content`, `createdAt`

### Phase 1 (목표)

- UUID 기반 `User/Conversation/ChatMessage`로 확장 (위 SQL 스키마 참고)
