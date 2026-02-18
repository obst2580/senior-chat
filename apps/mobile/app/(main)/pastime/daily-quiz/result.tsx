import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';

function getRankInfo(correct: number): { label: string; color: string } {
  if (correct >= 8) return { label: '상위 1% ~ 15%', color: COLORS.gameCorrect };
  if (correct === 7) return { label: '상위 16% ~ 30%', color: COLORS.primary };
  if (correct === 6) return { label: '상위 31% ~ 50%', color: COLORS.primaryLight };
  if (correct === 5) return { label: '상위 51% ~ 70%', color: COLORS.warning };
  return { label: '상위 71% ~ 99%', color: COLORS.textSecondary };
}

export default function DailyQuizResultScreen() {
  const router = useRouter();
  const { score, total } = useLocalSearchParams<{
    score: string;
    total: string;
  }>();

  const numScore = Number(score ?? '0');
  const numTotal = Number(total ?? '8');
  const rank = getRankInfo(numScore);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.resultArea}>
          <Ionicons name="trophy" size={80} color={COLORS.warning} />
          <Text style={styles.congratsText}>수고하셨어요!</Text>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>맞힌 문제</Text>
            <Text style={styles.scoreValue}>{`${numScore} / ${numTotal}`}</Text>
          </View>

          <View style={[styles.rankCard, { borderColor: rank.color }]}>
            <Text style={styles.rankLabel}>나의 순위</Text>
            <Text style={[styles.rankValue, { color: rank.color }]}>
              {rank.label}
            </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <SeniorButton
            label="다시 도전"
            onPress={() => router.replace('/(main)/pastime/daily-quiz/play')}
          />
          <SeniorButton
            label="돌아가기"
            onPress={() => router.replace('/(main)/pastime')}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  resultArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  congratsText: {
    fontSize: FONT_SIZES.xxl,
    lineHeight: LINE_HEIGHTS.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  scoreCard: {
    backgroundColor: COLORS.scheduleCardBg,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  scoreLabel: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
  },
  scoreValue: {
    fontSize: FONT_SIZES.xxl,
    lineHeight: LINE_HEIGHTS.xxl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  rankCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    width: '100%',
    borderWidth: 2,
  },
  rankLabel: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
  },
  rankValue: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '700',
  },
  buttons: {
    gap: 12,
  },
});
