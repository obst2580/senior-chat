import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

interface CameraButtonProps {
  readonly onPress: () => void;
}

export default function CameraButton({ onPress }: CameraButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressedButton,
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="사진 찍기"
      >
        <Text style={styles.icon}>CAM</Text>
      </Pressable>
      <Text style={styles.label}>사진 찍기</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
