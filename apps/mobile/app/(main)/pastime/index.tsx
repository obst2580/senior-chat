import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import FeatureCard from '@/components/ui/FeatureCard';
import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

export default function PastimeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>두뇌 게임</Text>
        <View style={styles.grid}>
          <View style={styles.row}>
            <FeatureCard
              title="카드 뒤집기"
              subtitle="같은 그림 찾기"
              icon="grid"
              iconColor="#FFFFFF"
              iconBgColor="#FF6B6B"
              onPress={() => router.push('/(main)/pastime/card-matching')}
            />
            <View style={styles.gap} />
            <FeatureCard
              title="순서 맞추기"
              subtitle="숫자 순서대로"
              icon="list"
              iconColor="#FFFFFF"
              iconBgColor="#4ECDC4"
              onPress={() => router.push('/(main)/pastime/number-ordering')}
            />
          </View>
          <View style={styles.row}>
            <FeatureCard
              title="색깔 글자"
              subtitle="글자 색 맞추기"
              icon="color-palette"
              iconColor="#FFFFFF"
              iconBgColor="#FFB347"
              onPress={() => router.push('/(main)/pastime/color-word')}
            />
            <View style={styles.gap} />
            <FeatureCard
              title="끝말잇기"
              subtitle="AI와 단어 대결"
              icon="chatbubbles"
              iconColor="#FFFFFF"
              iconBgColor="#7C83FD"
              onPress={() => router.push('/(main)/pastime/word-chain')}
            />
          </View>
        </View>
        <Text style={styles.sectionTitle}>오늘의 도전</Text>
        <FeatureCard
          title="오늘의 퀴즈"
          subtitle="매일 새로운 문제"
          icon="help-circle"
          iconColor="#FFFFFF"
          iconBgColor="#FF8A65"
          onPress={() => router.push('/(main)/pastime/daily-quiz')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
  },
  grid: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
  },
  gap: {
    width: 16,
  },
});
