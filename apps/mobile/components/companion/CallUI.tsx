import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

import CompanionAvatar from './CompanionAvatar';

interface CallUIProps {
  readonly companionName: string;
  readonly onEndCall: () => void;
  readonly onStartCall: () => void;
  readonly isCallActive: boolean;
}

export default function CallUI({
  companionName,
  onEndCall,
  onStartCall,
  isCallActive,
}: CallUIProps) {
  return (
    <View style={styles.container}>
      <CompanionAvatar name={companionName} size={120} />

      {isCallActive ? (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>통화 중...</Text>
        </View>
      ) : null}

      <View style={styles.buttonContainer}>
        {isCallActive ? (
          <Pressable
            style={({ pressed }) => [
              styles.callButton,
              styles.endCallButton,
              pressed && styles.pressedButton,
            ]}
            onPress={onEndCall}
            accessibilityRole="button"
            accessibilityLabel="통화 끊기"
          >
            <Ionicons name="call" size={32} color={COLORS.white} />
            <Text style={styles.buttonLabel}>끊기</Text>
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.callButton,
              styles.startCallButton,
              pressed && styles.pressedButton,
            ]}
            onPress={onStartCall}
            accessibilityRole="button"
            accessibilityLabel="전화하기"
          >
            <Ionicons name="call" size={32} color={COLORS.white} />
            <Text style={styles.buttonLabel}>전화하기</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.companionCallBg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 32,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  callButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startCallButton: {
    backgroundColor: COLORS.success,
  },
  endCallButton: {
    backgroundColor: COLORS.error,
  },
  pressedButton: {
    opacity: 0.85,
  },
  buttonLabel: {
    marginTop: 8,
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    fontWeight: '600',
    color: COLORS.white,
  },
});
