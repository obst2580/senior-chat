import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';

interface SeniorButtonProps {
  readonly label: string;
  readonly onPress: () => void;
  readonly disabled?: boolean;
  readonly variant?: 'primary' | 'secondary';
}

export default function SeniorButton({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
}: SeniorButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
    >
      <Text
        style={[
          styles.label,
          isPrimary ? styles.primaryLabel : styles.secondaryLabel,
          disabled && styles.disabledLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: TOUCH_TARGET.min,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.border,
    borderColor: COLORS.border,
  },
  pressedButton: {
    opacity: 0.85,
  },
  label: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '600',
  },
  primaryLabel: {
    color: COLORS.white,
  },
  secondaryLabel: {
    color: COLORS.primary,
  },
  disabledLabel: {
    color: COLORS.textLight,
  },
});
