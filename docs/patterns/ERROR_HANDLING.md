# Error Handling

## 에러 처리 전략

### API 에러
```typescript
// lib/chat-api.ts 에서 처리
try {
  const response = await streamText(...)
  return response
} catch (error) {
  if (error instanceof APIError) {
    throw new ChatError('AI_SERVICE_ERROR', '잠시 후 다시 시도해주세요.')
  }
  throw new ChatError('UNKNOWN_ERROR', '문제가 발생했어요. 다시 시도해볼까요?')
}
```

### 사용자 표시 에러 메시지

시니어 사용자를 위해 에러 메시지는 반드시:
- 쉬운 말로 작성
- 해결 방법을 함께 제시
- 긍정적이고 안심시키는 톤

| 에러 유형 | 사용자 메시지 |
|-----------|-------------|
| API 오류 | "잠시 문제가 생겼어요. 조금 후에 다시 말씀해 주세요." |
| 네트워크 | "인터넷 연결을 확인해 주세요. 연결되면 다시 시도해 볼게요." |
| 입력 초과 | "메시지가 너무 길어요. 좀 더 짧게 말씀해 주시겠어요?" |
| 음성 인식 실패 | "잘 못 알아들었어요. 다시 한번 말씀해 주세요." |

### 커스텀 에러 타입

```typescript
// types/common.ts
type ErrorCode = 'AI_SERVICE_ERROR' | 'NETWORK_ERROR' | 'INVALID_INPUT' | 'VOICE_ERROR'

interface ChatError {
  code: ErrorCode
  message: string       // 사용자 표시용 (한국어)
  details?: string      // 개발자용 상세 정보
}
```
