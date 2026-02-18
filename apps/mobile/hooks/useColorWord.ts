import { useCallback, useState } from 'react';

const COLOR_NAMES = ['빨강', '파랑', '초록', '노랑', '보라'] as const;

const COLOR_HEX_MAP: Record<string, string> = {
  '빨강': '#E53935',
  '파랑': '#1E88E5',
  '초록': '#43A047',
  '노랑': '#FDD835',
  '보라': '#8E24AA',
};

function shuffle<T>(array: readonly T[]): readonly T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function pickRandom<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function pickDifferent(exclude: string): string {
  const remaining = COLOR_NAMES.filter((c) => c !== exclude);
  return pickRandom(remaining);
}

function generateRound() {
  const word = pickRandom(COLOR_NAMES);
  const displayColorName = pickDifferent(word);
  const displayColor = COLOR_HEX_MAP[displayColorName];
  const options = shuffle(COLOR_NAMES);

  return { word, displayColor, displayColorName, options };
}

export function useColorWord() {
  const [roundData, setRoundData] = useState(() => generateRound());
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [round, setRound] = useState(1);

  const checkAnswer = useCallback(
    (answer: string): boolean => {
      const correct = answer === roundData.displayColorName;
      setIsCorrect(correct);
      return correct;
    },
    [roundData.displayColorName],
  );

  const nextRound = useCallback(() => {
    setRoundData(generateRound());
    setIsCorrect(null);
    setRound((prev) => prev + 1);
  }, []);

  return {
    word: roundData.word,
    displayColor: roundData.displayColor,
    options: roundData.options,
    isCorrect,
    checkAnswer,
    nextRound,
    round,
  };
}
