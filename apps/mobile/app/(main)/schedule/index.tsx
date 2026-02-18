import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { COLORS } from '@/constants/colors';
import SeniorButton from '@/components/ui/SeniorButton';
import CalendarView from '@/components/schedule/CalendarView';
import ScheduleList from '@/components/schedule/ScheduleList';
import { useSchedule } from '@/hooks/useSchedule';
import type { Schedule } from '@/types/schedule';

export default function ScheduleScreen() {
  const router = useRouter();
  const { schedules, isLoading, loadSchedules } = useSchedule();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const filteredSchedules: readonly Schedule[] = selectedDate
    ? schedules.filter((s) => s.date === selectedDate)
    : schedules;

  const handleSelectDate = useCallback((date: string) => {
    setSelectedDate((prev) => (prev === date ? null : date));
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <CalendarView
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
        />
        <View style={styles.listArea}>
          <ScheduleList
            schedules={filteredSchedules}
            isLoading={isLoading}
          />
        </View>
        <View style={styles.buttonArea}>
          <SeniorButton
            label="일정 만들기"
            onPress={() => router.push('/(main)/schedule/create/what')}
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
    padding: 16,
    gap: 12,
  },
  listArea: {
    flex: 1,
  },
  buttonArea: {
    paddingBottom: 8,
  },
});
