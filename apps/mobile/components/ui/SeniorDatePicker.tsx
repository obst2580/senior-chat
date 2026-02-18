import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';

interface SeniorDatePickerProps {
  readonly selectedDate: string | null;
  readonly onSelectDate: (date: string) => void;
}

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function SeniorDatePicker({
  selectedDate,
  onSelectDate,
}: SeniorDatePickerProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={prevMonth}
          style={styles.navButton}
          accessibilityRole="button"
          accessibilityLabel="이전 달"
        >
          <Text style={styles.navText}>◀</Text>
        </Pressable>
        <Text style={styles.monthText}>
          {year}년 {month + 1}월
        </Text>
        <Pressable
          onPress={nextMonth}
          style={styles.navButton}
          accessibilityRole="button"
          accessibilityLabel="다음 달"
        >
          <Text style={styles.navText}>▶</Text>
        </Pressable>
      </View>
      <View style={styles.weekRow}>
        {DAYS_OF_WEEK.map((day) => (
          <View key={day} style={styles.weekCell}>
            <Text style={styles.weekText}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.daysGrid}>
        {days.map((day, index) => {
          if (day === null) {
            return <View key={`empty-${index}`} style={styles.dayCell} />;
          }
          const dateStr = formatDate(year, month, day);
          const isSelected = selectedDate === dateStr;
          return (
            <Pressable
              key={dateStr}
              style={[styles.dayCell, isSelected && styles.dayCellSelected]}
              onPress={() => onSelectDate(dateStr)}
              accessibilityRole="button"
              accessibilityLabel={`${month + 1}월 ${day}일`}
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.dayTextSelected,
                ]}
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
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    minWidth: TOUCH_TARGET.min,
    minHeight: TOUCH_TARGET.min,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
  },
  monthText: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekText: {
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  dayCellSelected: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  dayTextSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
});
