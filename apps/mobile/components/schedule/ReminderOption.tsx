import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';

interface ReminderOptionProps {
  readonly label: string;
  readonly isSelected: boolean;
  readonly onPress: () => void;
}

export default function ReminderOption({
  label,
  isSelected,
  onPress,
}: ReminderOptionProps) {
  return (
    <Pressable
      style={[styles.option, isSelected && styles.selectedOption]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`알림: ${label}`}
      accessibilityState={{ selected: isSelected }}
    >
      <Text style={[styles.label, isSelected && styles.selectedLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    minHeight: TOUCH_TARGET.comfortable,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.userMessageBg,
  },
  label: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  selectedLabel: {
    color: COLORS.primary,
  },
});
