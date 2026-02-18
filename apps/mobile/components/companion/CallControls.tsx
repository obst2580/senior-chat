import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';
import { TOUCH_TARGET } from '@/constants/typography';

interface CallControlsProps {
  readonly isMuted: boolean;
  readonly onToggleMute: () => void;
  readonly onEndCall: () => void;
}

export default function CallControls({
  isMuted,
  onToggleMute,
  onEndCall,
}: CallControlsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.controlButton,
          styles.muteButton,
          isMuted && styles.mutedButton,
          pressed && styles.pressedButton,
        ]}
        onPress={onToggleMute}
        accessibilityRole="button"
        accessibilityLabel={isMuted ? '음소거 해제' : '음소거'}
        accessibilityState={{ selected: isMuted }}
      >
        <Ionicons
          name={isMuted ? 'mic-off' : 'mic'}
          size={28}
          color={isMuted ? COLORS.white : COLORS.text}
        />
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.controlButton,
          styles.endCallButton,
          pressed && styles.pressedButton,
        ]}
        onPress={onEndCall}
        accessibilityRole="button"
        accessibilityLabel="통화 종료"
      >
        <Ionicons name="call" size={28} color={COLORS.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  controlButton: {
    width: TOUCH_TARGET.comfortable,
    height: TOUCH_TARGET.comfortable,
    borderRadius: TOUCH_TARGET.comfortable / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteButton: {
    backgroundColor: COLORS.border,
  },
  mutedButton: {
    backgroundColor: COLORS.textSecondary,
  },
  endCallButton: {
    backgroundColor: COLORS.error,
  },
  pressedButton: {
    opacity: 0.85,
  },
});
