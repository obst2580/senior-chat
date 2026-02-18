import { useCallback, useRef, useState } from 'react';
import { Audio } from 'expo-av';

import { sendMessage, fetchTtsAudio } from '@/lib/api-client';
import { type ChatState, type Message } from '@/types/chat';

function createGreeting(companionName: string): Message {
  return {
    id: 'greeting',
    role: 'assistant',
    content: `안녕하세요! ${companionName}이에요. 오늘 하루는 어떠셨어요? 궁금한 거 있으시면 편하게 말씀해 주세요~`,
    createdAt: new Date().toISOString(),
  };
}

export function useChat(userId: number, companionName: string = '다솜이') {
  const [state, setState] = useState<ChatState>({
    messages: [createGreeting(companionName)],
    isLoading: false,
    error: null,
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const playTts = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true);
      const result = await fetchTtsAudio(text);
      if (!result.success || !result.audioUri) {
        setIsSpeaking(false);
        return;
      }

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: result.audioUri },
        { shouldPlay: true },
      );
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsSpeaking(false);
        }
      });
    } catch {
      setIsSpeaking(false);
    }
  }, []);

  const send = useCallback(
    async (content: string) => {
      if (!content.trim() || state.isLoading) return;

      const userMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }));

      const response = await sendMessage(userId, content.trim());

      if (response.success && response.data) {
        const aiMessage = response.data.message;
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, aiMessage],
          isLoading: false,
        }));
        playTts(aiMessage.content);
      } else {
        const errorMsg: Message = {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: '앗, 지금 연결이 잘 안 돼요. 잠시 후 다시 말씀해 주세요~',
          createdAt: new Date().toISOString(),
        };
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, errorMsg],
          isLoading: false,
          error: response.error ?? '메시지 전송에 실패했어요.',
        }));
      }
    },
    [userId, state.isLoading, playTts],
  );

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    isSpeaking,
    error: state.error,
    send,
    clearError,
  };
}
