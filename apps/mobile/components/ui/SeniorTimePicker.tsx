import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';

interface SeniorTimePickerProps {
  readonly selectedTime: string | null;
  readonly onSelectTime: (time: string) => void;
}

const PERIODS = ['오전', '오후'] as const;
const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
const MINUTES = [0, 10, 20, 30, 40, 50] as const;

function formatTime(period: string, hour: number, minute: number): string {
  const h24 = period === '오후' && hour !== 12 ? hour + 12 : period === '오전' && hour === 12 ? 0 : hour;
  return `${String(h24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export default function SeniorTimePicker({
  selectedTime,
  onSelectTime,
}: SeniorTimePickerProps) {
  const selectedParts = selectedTime?.split(':');
  const selectedH = selectedParts ? parseInt(selectedParts[0], 10) : null;
  const selectedM = selectedParts ? parseInt(selectedParts[1], 10) : null;
  const currentPeriod = selectedH !== null && selectedH >= 12 ? '오후' : '오전';

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>오전 / 오후</Text>
      <View style={styles.periodRow}>
        {PERIODS.map((period) => (
          <Pressable
            key={period}
            style={[
              styles.periodButton,
              currentPeriod === period && styles.periodSelected,
            ]}
            onPress={() => {
              const h = selectedH !== null ? (period === '오전' ? (selectedH >= 12 ? selectedH - 12 : selectedH) : (selectedH < 12 ? selectedH + 12 : selectedH)) : (period === '오전' ? 9 : 14);
              const m = selectedM ?? 0;
              onSelectTime(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
            }}
            accessibilityRole="radio"
            accessibilityState={{ selected: currentPeriod === period }}
            accessibilityLabel={period}
          >
            <Text
              style={[
                styles.periodText,
                currentPeriod === period && styles.periodTextSelected,
              ]}
            >
              {period}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>시</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.optionRow}>
          {HOURS.map((hour) => {
            const h24 = currentPeriod === '오후' && hour !== 12 ? hour + 12 : currentPeriod === '오전' && hour === 12 ? 0 : hour;
            const isSelected = selectedH === h24;
            return (
              <Pressable
                key={hour}
                style={[styles.timeButton, isSelected && styles.timeSelected]}
                onPress={() => {
                  const m = selectedM ?? 0;
                  onSelectTime(formatTime(currentPeriod, hour, m));
                }}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`${hour}시`}
              >
                <Text
                  style={[
                    styles.timeText,
                    isSelected && styles.timeTextSelected,
                  ]}
                >
                  {hour}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <Text style={styles.sectionLabel}>분</Text>
      <View style={styles.optionRow}>
        {MINUTES.map((minute) => {
          const isSelected = selectedM === minute;
          return (
            <Pressable
              key={minute}
              style={[styles.timeButton, isSelected && styles.timeSelected]}
              onPress={() => {
                const h = selectedH ?? (currentPeriod === '오전' ? 9 : 14);
                onSelectTime(`${String(h).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
              }}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${minute}분`}
            >
              <Text
                style={[
                  styles.timeText,
                  isSelected && styles.timeTextSelected,
                ]}
              >
                {String(minute).padStart(2, '0')}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {selectedTime && (
        <Text style={styles.selectedDisplay}>
          {currentPeriod} {selectedH !== null ? (selectedH > 12 ? selectedH - 12 : selectedH === 0 ? 12 : selectedH) : '-'}시 {selectedM ?? 0}분
        </Text>
      )}
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
    gap: 12,
  },
  sectionLabel: {
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  periodRow: {
    flexDirection: 'row',
    gap: 12,
  },
  periodButton: {
    flex: 1,
    minHeight: TOUCH_TARGET.min,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  periodSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.userMessageBg,
  },
  periodText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  periodTextSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  timeButton: {
    minWidth: TOUCH_TARGET.min,
    minHeight: TOUCH_TARGET.min,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  timeSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.userMessageBg,
  },
  timeText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  timeTextSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  selectedDisplay: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 8,
  },
});
