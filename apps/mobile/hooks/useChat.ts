import { useCallback, useState } from 'react';

import { sendMessage } from '@/lib/api-client';
import { type ChatState, type Message } from '@/types/chat';

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
};

export function useChat(userId: number) {
  const [state, setState] = useState<ChatState>(initialState);

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
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, response.data!.message],
          isLoading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: response.error ?? '메시지 전송에 실패했어요. 다시 시도해주세요.',
        }));
      }
    },
    [userId, state.isLoading],
  );

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    send,
    clearError,
  };
}
