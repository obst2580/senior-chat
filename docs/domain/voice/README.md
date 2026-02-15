# Voice Domain (음성 인터페이스)

## 개요

시니어 사용자가 타이핑 없이 음성으로 AI와 대화할 수 있는 인터페이스.

## 기술 옵션

### 음성 인식 (STT)
| 옵션 | 장점 | 단점 |
|------|------|------|
| Web Speech API | 무료, 브라우저 내장 | 브라우저 호환성 제한 |
| Whisper API | 높은 정확도, 다국어 | 비용 발생 |
| Deepgram | 실시간 스트리밍 | 비용 발생 |

### 음성 합성 (TTS)
| 옵션 | 장점 | 단점 |
|------|------|------|
| Web Speech API | 무료, 브라우저 내장 | 음질 제한 |
| ElevenLabs | 자연스러운 음성 | 비용 발생 |
| OpenAI TTS | 다양한 음성 | 비용 발생 |

## 구현 우선순위

1. **Phase 1**: Web Speech API 기반 기본 음성 입력/출력 (무료)
2. **Phase 2**: Whisper API 연동으로 정확도 향상
3. **Phase 3**: 프리미엄 TTS로 자연스러운 음성 출력

## 컴포넌트 구조

```
src/components/voice/
├── VoiceButton.tsx       # 음성 입력 버튼 (크고 명확한)
├── VoiceWaveform.tsx     # 녹음 중 시각적 피드백
└── SpeakButton.tsx       # AI 응답 읽어주기 버튼
```
