import { useCallback, useEffect, useRef, useState } from 'react';

import type { CardItem } from '@/types/pastime';

const EMOJI_VALUES = [
  '🍎', '🌸', '🐶', '🎵',
  '⭐', '🌈', '🎂', '🐱',
];

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

function createCards(): readonly CardItem[] {
  const pairs = EMOJI_VALUES.flatMap((value, index) => [
    { id: `card-${index}-a`, value, isFlipped: false, isMatched: false },
    { id: `card-${index}-b`, value, isFlipped: false, isMatched: false },
  ]);
  return shuffle(pairs);
}

export function useCardMatching() {
  const [cards, setCards] = useState<readonly CardItem[]>(() => createCards());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flippedCards = cards.filter((c) => c.isFlipped && !c.isMatched);
  const flippedCount = flippedCards.length;
  const matchedCount = cards.filter((c) => c.isMatched).length;
  const isComplete = matchedCount === cards.length;

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const flipCard = useCallback(
    (id: string) => {
      const card = cards.find((c) => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return;

      const currentFlipped = cards.filter((c) => c.isFlipped && !c.isMatched);
      if (currentFlipped.length >= 2) return;

      const updatedCards = cards.map((c) =>
        c.id === id ? { ...c, isFlipped: true } : c,
      );
      setCards(updatedCards);

      const newFlipped = updatedCards.filter((c) => c.isFlipped && !c.isMatched);
      if (newFlipped.length === 2) {
        const [first, second] = newFlipped;
        if (first.value === second.value) {
          timeoutRef.current = setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === first.id || c.id === second.id
                  ? { ...c, isMatched: true, isFlipped: false }
                  : c,
              ),
            );
          }, 500);
        } else {
          timeoutRef.current = setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === first.id || c.id === second.id
                  ? { ...c, isFlipped: false }
                  : c,
              ),
            );
          }, 1000);
        }
      }
    },
    [cards],
  );

  const resetGame = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCards(createCards());
  }, []);

  return {
    cards,
    flippedCount,
    matchedCount,
    isComplete,
    flipCard,
    resetGame,
  };
}
