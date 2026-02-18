import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';
import ReminderOption from '@/components/schedule/ReminderOption';

const REMINDER_OPTIONS = [
  { label: '10분 전', value: 10 },
  { label: '30분 전', value: 30 },
  { label: '1시간 전', value: 60 },
  { label: '하루 전', value: 1440 },
] as const;

export default function ScheduleReminderScreen() {
  const router = useRouter();
  const { title, date, time } = useLocalSearchParams<{
    title: string;
    date: string;
    time: string;
  }>();
  const [selected, setSelected] = useState<number>(30);

  const handleNext = () => {
    router.push({
      pathname: '/(main)/schedule/create/confirm',
      params: { title, date, time, reminderMinutes: String(selected) },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.step}>4단계 / 5단계</Text>
        <Text style={styles.question}>언제 알려드릴까요?</Text>
        <View style={styles.options}>
          {REMINDER_OPTIONS.map((option) => (
            <ReminderOption
              key={option.value}
              label={option.label}
              isSelected={selected === option.value}
              onPress={() => setSelected(option.value)}
            />
          ))}
        </View>
        <View style={styles.buttonRow}>
          <View style={styles.buttonHalf}>
            <SeniorButton
              label="이전"
              onPress={() => router.back()}
              variant="secondary"
            />
          </View>
          <View style={styles.buttonHalf}>
            <SeniorButton
              label="다음"
              onPress={handleNext}
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
  options: {
    gap: 12,
    marginTop: 8,
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
