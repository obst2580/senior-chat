import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';

interface NumberGridProps {
  readonly numbers: readonly number[];
  readonly onTap: (num: number) => void;
  readonly nextExpected: number;
}

export default function NumberGrid({ numbers, onTap, nextExpected }: NumberGridProps) {
  return (
    <View style={styles.grid}>
      {numbers.map((num) => {
        const tapped = num < nextExpected;
        const isNext = num === nextExpected;

        return (
          <Pressable
            key={num}
            style={({ pressed }) => [
              styles.numberButton,
              isNext && styles.nextExpectedButton,
              tapped && styles.tappedButton,
              pressed && !tapped && styles.pressed,
            ]}
            onPress={() => onTap(num)}
            disabled={tapped}
            accessibilityRole="button"
            accessibilityLabel={`숫자 ${num}`}
            accessibilityState={{
              disabled: tapped,
            }}
          >
            <Text style={[styles.numberText, tapped && styles.tappedText]}>
              {num}
            </Text>
          </Pressable>
        );
      })}
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
  numberButton: {
    width: '22%',
    aspectRatio: 1,
    minHeight: TOUCH_TARGET.min,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  nextExpectedButton: {
    borderColor: COLORS.primaryLight,
    backgroundColor: '#E3F2FD',
  },
  tappedButton: {
    backgroundColor: COLORS.gameCorrect,
    borderColor: COLORS.gameCorrect,
  },
  pressed: {
    opacity: 0.85,
  },
  numberText: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  tappedText: {
    color: COLORS.white,
  },
});
