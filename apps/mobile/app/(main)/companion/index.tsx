import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import ChatWindow from '@/components/chat/ChatWindow';
import { useCompanion } from '@/hooks/useCompanion';

export default function CompanionScreen() {
  const router = useRouter();
  const { profile, loadProfile, error } = useCompanion();

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const companionName = profile?.name ?? '다솜이';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarSmall}>
            <Text style={styles.avatarEmoji}>
              {getCompanionEmoji(companionName)}
            </Text>
          </View>
          <View>
            <Text style={styles.headerName}>{companionName}</Text>
            <Text style={styles.headerStatus}>
              {error ? '연결 안 됨' : 'AI 말벗'}
            </Text>
          </View>
        </View>
        <Pressable
          style={styles.settingsButton}
          onPress={() => router.push('/(main)/companion/settings')}
          accessibilityRole="button"
          accessibilityLabel="말벗 설정"
          hitSlop={12}
        >
          <Ionicons
            name="settings-outline"
            size={26}
            color={COLORS.textSecondary}
          />
        </Pressable>
      </View>

      <View style={styles.chatArea}>
        <ChatWindow userId={1} companionName={companionName} />
      </View>
    </SafeAreaView>
  );
}

function getCompanionEmoji(name: string): string {
  const emojiMap: Record<string, string> = {
    '\uB2E4\uC194\uC774': '\uD83D\uDC9B',
    '\uBCF5\uC21C\uC774': '\uD83C\uDF3B',
    '\uC601\uD76C': '\uD83C\uDF38',
    '\uCCA0\uC218': '\uD83D\uDE0A',
  };
  return emojiMap[name] ?? '\uD83D\uDC9B';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    backgroundColor: COLORS.white,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarSmall: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  headerName: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerStatus: {
    fontSize: FONT_SIZES.xs,
    lineHeight: LINE_HEIGHTS.xs,
    color: COLORS.textSecondary,
  },
  settingsButton: {
    padding: 8,
  },
  chatArea: {
    flex: 1,
  },
});
