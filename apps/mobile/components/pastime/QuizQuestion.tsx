import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';

interface QuizQuestionProps {
  readonly question: string;
  readonly options: readonly string[];
  readonly onAnswer: (index: number) => void;
  readonly selectedIndex: number | null;
  readonly correctIndex?: number;
}

function getOptionStyle(
  index: number,
  selectedIndex: number | null,
  correctIndex: number | undefined,
) {
  if (selectedIndex === null) {
    return styles.option;
  }

  if (correctIndex != null) {
    if (index === correctIndex) {
      return [styles.option, styles.correctOption];
    }
    if (index === selectedIndex && selectedIndex !== correctIndex) {
      return [styles.option, styles.incorrectOption];
    }
  }

  if (index === selectedIndex) {
    return [styles.option, styles.selectedOption];
  }

  return styles.option;
}

function getOptionTextStyle(
  index: number,
  selectedIndex: number | null,
  correctIndex: number | undefined,
) {
  if (selectedIndex === null) {
    return styles.optionText;
  }

  if (correctIndex != null) {
    if (index === correctIndex) {
      return [styles.optionText, styles.correctOptionText];
    }
    if (index === selectedIndex && selectedIndex !== correctIndex) {
      return [styles.optionText, styles.incorrectOptionText];
    }
  }

  if (index === selectedIndex) {
    return [styles.optionText, styles.selectedOptionText];
  }

  return styles.optionText;
}

export default function QuizQuestion({
  question,
  options,
  onAnswer,
  selectedIndex,
  correctIndex,
}: QuizQuestionProps) {
  const hasAnswered = selectedIndex !== null;

  return (
    <View style={styles.container}>
      <Text
        style={styles.question}
        accessibilityRole="text"
      >
        {question}
      </Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              getOptionStyle(index, selectedIndex, correctIndex),
              pressed && !hasAnswered && styles.pressed,
            ]}
            onPress={() => onAnswer(index)}
            disabled={hasAnswered}
            accessibilityRole="button"
            accessibilityLabel={`${index + 1}번: ${option}`}
            accessibilityState={{
              selected: selectedIndex === index,
              disabled: hasAnswered,
            }}
          >
            <Text style={getOptionTextStyle(index, selectedIndex, correctIndex)}>
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  question: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    minHeight: TOUCH_TARGET.min,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.userMessageBg,
  },
  correctOption: {
    borderColor: COLORS.gameCorrect,
    backgroundColor: '#E8F5E9',
  },
  incorrectOption: {
    borderColor: COLORS.gameIncorrect,
    backgroundColor: '#FFEBEE',
  },
  pressed: {
    opacity: 0.85,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.text,
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  correctOptionText: {
    color: COLORS.gameCorrect,
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: COLORS.gameIncorrect,
    fontWeight: '600',
  },
});
