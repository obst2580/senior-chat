import { useCallback, useEffect, useRef, useState } from 'react';

interface GameState {
  readonly score: number;
  readonly timeElapsed: number;
  readonly isActive: boolean;
  readonly isComplete: boolean;
}

const initialState: GameState = {
  score: 0,
  timeElapsed: 0,
  isActive: false,
  isComplete: false,
};

export function useGame() {
  const [state, setState] = useState<GameState>(initialState);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.isActive) {
      intervalRef.current = setInterval(() => {
        setState((prev) => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isActive]);

  const addScore = useCallback((points: number) => {
    setState((prev) => ({ ...prev, score: prev.score + points }));
  }, []);

  const startGame = useCallback(() => {
    setState({
      score: 0,
      timeElapsed: 0,
      isActive: true,
      isComplete: false,
    });
  }, []);

  const endGame = useCallback(() => {
    setState((prev) => ({ ...prev, isActive: false, isComplete: true }));
  }, []);

  const resetGame = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    score: state.score,
    timeElapsed: state.timeElapsed,
    isActive: state.isActive,
    isComplete: state.isComplete,
    addScore,
    startGame,
    endGame,
    resetGame,
  };
}
