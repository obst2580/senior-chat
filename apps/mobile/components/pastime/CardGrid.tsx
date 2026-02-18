import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';
import type { CardItem } from '@/types/pastime';

interface CardGridProps {
  readonly cards: readonly CardItem[];
  readonly onFlip: (id: string) => void;
}

export default function CardGrid({ cards, onFlip }: CardGridProps) {
  return (
    <View style={styles.grid}>
      {cards.map((card) => (
        <Pressable
          key={card.id}
          style={({ pressed }) => [
            styles.card,
            !card.isFlipped && !card.isMatched && styles.faceDownCard,
            card.isFlipped && !card.isMatched && styles.flippedCard,
            card.isMatched && styles.matchedCard,
            pressed && !card.isFlipped && !card.isMatched && styles.pressed,
          ]}
          onPress={() => onFlip(card.id)}
          disabled={card.isFlipped || card.isMatched}
          accessibilityRole="button"
          accessibilityLabel={
            card.isFlipped || card.isMatched
              ? `카드: ${card.value}`
              : '뒤집히지 않은 카드'
          }
          accessibilityState={{
            disabled: card.isFlipped || card.isMatched,
          }}
        >
          <Text style={card.isFlipped || card.isMatched ? styles.cardValue : styles.cardBack}>
            {card.isFlipped || card.isMatched ? card.value : '?'}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  card: {
    width: '22%',
    aspectRatio: 1,
    minHeight: TOUCH_TARGET.min,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  faceDownCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  flippedCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
  },
  matchedCard: {
    backgroundColor: '#E8F5E9',
    borderColor: COLORS.gameCorrect,
  },
  pressed: {
    opacity: 0.85,
  },
  cardValue: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    color: COLORS.text,
  },
  cardBack: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    color: COLORS.white,
    fontWeight: '700',
  },
});
