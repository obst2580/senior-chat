# Data Model

> PostgreSQL 기반 엔티티 설계

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

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    private String name;
    private String fontSize;
    private Boolean voiceEnabled;
    private BigDecimal voiceSpeed;
    private Boolean onboardingDone;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```
