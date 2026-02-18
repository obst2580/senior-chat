import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';
import SeniorTimePicker from '@/components/ui/SeniorTimePicker';

export default function ScheduleTimeScreen() {
  const router = useRouter();
  const { title, date } = useLocalSearchParams<{ title: string; date: string }>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedTime) return;
    router.push({
      pathname: '/(main)/schedule/create/reminder',
      params: { title, date, time: selectedTime },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.step}>3단계 / 5단계</Text>
        <Text style={styles.question}>몇 시에 하시나요?</Text>
        <SeniorTimePicker
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
        />
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
              disabled={!selectedTime}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
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
