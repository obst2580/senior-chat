import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

interface VoiceButtonProps {
  readonly onPress: () => void;
  readonly isRecording?: boolean;
  readonly disabled?: boolean;
}

export default function VoiceButton({
  onPress,
  isRecording = false,
  disabled = false,
}: VoiceButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          isRecording && styles.recordingButton,
          disabled && styles.disabledButton,
          pressed && !disabled && styles.pressedButton,
        ]}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={isRecording ? '녹음 중지' : '음성으로 말하기'}
        accessibilityState={{ disabled }}
      >
        <Text style={styles.icon}>{isRecording ? '||' : 'MIC'}</Text>
      </Pressable>
      <Text style={styles.label}>
        {isRecording ? '듣고 있어요...' : '말하기'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: COLORS.error,
  },
  disabledButton: {
    backgroundColor: COLORS.border,
  },
  pressedButton: {
    opacity: 0.85,
  },
  icon: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.white,
    fontWeight: '700',
  },
  label: {
    marginTop: 8,
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    color: COLORS.textSecondary,
  },
});
