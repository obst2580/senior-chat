import { useCallback, useState } from 'react';

function shuffle(array: readonly number[]): readonly number[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function createNumbers(): readonly number[] {
  const nums = Array.from({ length: 16 }, (_, i) => i + 1);
  return shuffle(nums);
}

export function useNumberOrdering() {
  const [numbers, setNumbers] = useState<readonly number[]>(() => createNumbers());
  const [tappedNumbers, setTappedNumbers] = useState<readonly number[]>([]);
  const [nextExpected, setNextExpected] = useState(1);

  const isComplete = nextExpected > 16;

  const tapNumber = useCallback(
    (num: number): boolean => {
      if (num !== nextExpected) {
        return false;
      }

      setTappedNumbers((prev) => [...prev, num]);
      setNextExpected((prev) => prev + 1);
      return true;
    },
    [nextExpected],
  );

  const resetGame = useCallback(() => {
    setNumbers(createNumbers());
    setTappedNumbers([]);
    setNextExpected(1);
  }, []);

  return {
    numbers,
    nextExpected,
    tappedNumbers,
    isComplete,
    tapNumber,
    resetGame,
  };
}
