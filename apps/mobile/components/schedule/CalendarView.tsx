import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';

interface CalendarViewProps {
  readonly selectedDate: string | null;
  readonly onSelectDate: (date: string) => void;
}

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;

function getMonthInfo(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

function formatDateString(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function CalendarView({
  selectedDate,
  onSelectDate,
}: CalendarViewProps) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const { firstDay, daysInMonth } = getMonthInfo(year, month);

  const monthLabel = `${year}년 ${month + 1}월`;

  const blanks: readonly null[] = Array.from({ length: firstDay }, () => null);
  const days: readonly number[] = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1,
  );
  const cells: readonly (number | null)[] = [...blanks, ...days];

  return (
    <View style={styles.container} accessibilityLabel={`${monthLabel} 달력`}>
      <Text style={styles.monthTitle}>{monthLabel}</Text>

      <View style={styles.weekdayRow}>
        {WEEKDAY_LABELS.map((label) => (
          <View key={label} style={styles.weekdayCell}>
            <Text style={styles.weekdayText}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((day, index) => {
          if (day === null) {
            return <View key={`blank-${index}`} style={styles.dayCell} />;
          }

          const dateString = formatDateString(year, month, day);
          const isSelected = selectedDate === dateString;

          return (
            <Pressable
              key={dateString}
              style={[styles.dayCell, isSelected && styles.selectedDayCell]}
              onPress={() => onSelectDate(dateString)}
              accessibilityRole="button"
              accessibilityLabel={`${month + 1}월 ${day}일`}
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[styles.dayText, isSelected && styles.selectedDayText]}
              >
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
  },
  monthTitle: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  weekdayText: {
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: TOUCH_TARGET.min,
  },
  selectedDayCell: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
  },
  dayText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.text,
  },
  selectedDayText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});
