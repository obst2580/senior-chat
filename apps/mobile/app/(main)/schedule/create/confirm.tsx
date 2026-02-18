import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';
import { useSchedule } from '@/hooks/useSchedule';

const REMINDER_LABELS: Record<string, string> = {
  '10': '10분 전',
  '30': '30분 전',
  '60': '1시간 전',
  '1440': '하루 전',
};

function formatTimeDisplay(time: string): string {
  const [hStr, mStr] = time.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const period = h >= 12 ? '오후' : '오전';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${period} ${displayH}시 ${m}분`;
}

export default function ScheduleConfirmScreen() {
  const router = useRouter();
  const { title, date, time, reminderMinutes } = useLocalSearchParams<{
    title: string;
    date: string;
    time: string;
    reminderMinutes: string;
  }>();
  const { addSchedule } = useSchedule();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reminderLabel = REMINDER_LABELS[reminderMinutes ?? ''] ?? `${reminderMinutes}분 전`;
  const timeDisplay = time ? formatTimeDisplay(time) : '-';

  const handleSubmit = async () => {
    if (!title || !date || !time || !reminderMinutes) return;
    setIsSubmitting(true);
    const success = await addSchedule({
      title,
      date,
      time,
      reminderMinutes: parseInt(reminderMinutes, 10),
    });
    setIsSubmitting(false);
    if (success) {
      router.replace('/(main)/schedule');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.step}>5단계 / 5단계</Text>
        <Text style={styles.question}>이 일정이 맞나요?</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Ionicons name="document-text-outline" size={24} color={COLORS.primary} />
            <Text style={styles.summaryLabel}>무엇을</Text>
            <Text style={styles.summaryValue}>{title ?? '-'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
            <Text style={styles.summaryLabel}>언제</Text>
            <Text style={styles.summaryValue}>{date ?? '-'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Ionicons name="time-outline" size={24} color={COLORS.primary} />
            <Text style={styles.summaryLabel}>몇 시</Text>
            <Text style={styles.summaryValue}>{timeDisplay}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
            <Text style={styles.summaryLabel}>알림</Text>
            <Text style={styles.summaryValue}>{reminderLabel}</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <View style={styles.buttonHalf}>
            <SeniorButton
              label="수정하기"
              onPress={() => router.back()}
              variant="secondary"
            />
          </View>
          <View style={styles.buttonHalf}>
            <SeniorButton
              label="등록하기"
              onPress={handleSubmit}
              disabled={isSubmitting}
            />
          </View>
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
    gap: 16,
  },
  step: {
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  question: {
    fontSize: FONT_SIZES.xl,
    lineHeight: LINE_HEIGHTS.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryLabel: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    width: 60,
  },
  summaryValue: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.text,
    fontWeight: '600',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
    paddingBottom: 8,
  },
  buttonHalf: {
    flex: 1,
  },
});
