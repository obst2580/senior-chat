import { useCallback, useState } from 'react';

import { sendWordChain } from '@/lib/api-client';

interface WordChainState {
  readonly words: readonly string[];
  readonly isMyTurn: boolean;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly sessionId: string | null;
}

const initialState: WordChainState = {
  words: [],
  isMyTurn: true,
  isLoading: false,
  error: null,
  sessionId: null,
};

export function useWordChain(userId: number) {
  const [state, setState] = useState<WordChainState>(initialState);

  const submitWord = useCallback(
    async (word: string): Promise<boolean> => {
      if (!word.trim() || state.isLoading) return false;

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        isMyTurn: false,
      }));

      const response = await sendWordChain({
        userId,
        word: word.trim(),
        sessionId: state.sessionId ?? undefined,
      });

      if (!response.success || !response.data) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isMyTurn: true,
          error: response.error ?? '단어를 보내지 못했어요. 다시 시도해주세요.',
        }));
        return false;
      }

      const { data } = response;

      if (!data.isValid) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isMyTurn: true,
          error: data.message ?? '올바르지 않은 단어예요.',
        }));
        return false;
      }

      setState((prev) => ({
        ...prev,
        words: [...prev.words, word.trim(), data.word],
        isMyTurn: true,
        isLoading: false,
        sessionId: data.sessionId,
      }));

      return true;
    },
    [userId, state.isLoading, state.sessionId],
  );

  const resetGame = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    words: state.words,
    isMyTurn: state.isMyTurn,
    isLoading: state.isLoading,
    error: state.error,
    submitWord,
    resetGame,
  };
}
