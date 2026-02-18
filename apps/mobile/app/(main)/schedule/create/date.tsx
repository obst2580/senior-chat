import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';
import SeniorDatePicker from '@/components/ui/SeniorDatePicker';

export default function ScheduleDateScreen() {
  const router = useRouter();
  const { title } = useLocalSearchParams<{ title: string }>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedDate) return;
    router.push({
      pathname: '/(main)/schedule/create/time',
      params: { title, date: selectedDate },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.step}>2단계 / 5단계</Text>
        <Text style={styles.question}>언제 하시나요?</Text>
        <SeniorDatePicker
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
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
              disabled={!selectedDate}
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 8,
  },
  buttonHalf: {
    flex: 1,
  },
});
