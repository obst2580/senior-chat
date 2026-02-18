import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import FeatureCard from '@/components/ui/FeatureCard';
import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.greeting}>안녕하세요!</Text>
        <Text style={styles.subGreeting}>무엇을 도와드릴까요?</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.row}>
          <FeatureCard
            title="AI 도우미"
            subtitle="사진으로 물어보기"
            icon="camera"
            iconColor="#FFFFFF"
            iconBgColor="#FF6B6B"
            onPress={() => router.push('/(main)/helper')}
          />
          <View style={styles.gap} />
          <FeatureCard
            title="AI 말벗"
            subtitle="대화 친구"
            icon="call"
            iconColor="#FFFFFF"
            iconBgColor="#4ECDC4"
            onPress={() => router.push('/(main)/companion')}
          />
        </View>
        <View style={styles.row}>
          <FeatureCard
            title="일정 알리미"
            subtitle="약속 관리"
            icon="calendar"
            iconColor="#FFFFFF"
            iconBgColor="#FFB347"
            onPress={() => router.push('/(main)/schedule')}
          />
          <View style={styles.gap} />
          <FeatureCard
            title="시간 보내기"
            subtitle="두뇌 게임"
            icon="game-controller"
            iconColor="#FFFFFF"
            iconBgColor="#7C83FD"
            onPress={() => router.push('/(main)/pastime')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: FONT_SIZES.xxl,
    lineHeight: LINE_HEIGHTS.xxl,
    fontWeight: '800',
    color: COLORS.text,
  },
  subGreeting: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
  },
  gap: {
    width: 16,
  },
});
