import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';

interface ColorWordDisplayProps {
  readonly word: string;
  readonly displayColor: string;
  readonly options: readonly string[];
  readonly onAnswer: (color: string) => void;
}

export default function ColorWordDisplay({
  word,
  displayColor,
  options,
  onAnswer,
}: ColorWordDisplayProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        <Text
          style={[styles.word, { color: displayColor }]}
          accessibilityLabel={`${word}이라는 글자가 다른 색으로 표시되어 있습니다`}
        >
          {word}
        </Text>
      </View>
      <Text style={styles.instruction}>
        글자의 색깔을 고르세요
      </Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <Pressable
            key={option}
            style={({ pressed }) => [
              styles.optionButton,
              pressed && styles.pressed,
            ]}
            onPress={() => onAnswer(option)}
            accessibilityRole="button"
            accessibilityLabel={`${option} 선택`}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    alignItems: 'center',
  },
  wordContainer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  word: {
    fontSize: 48,
    lineHeight: 60,
    fontWeight: '700',
  },
  instruction: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    width: '100%',
  },
  optionButton: {
    minHeight: TOUCH_TARGET.min,
    minWidth: '45%',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  pressed: {
    opacity: 0.85,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
