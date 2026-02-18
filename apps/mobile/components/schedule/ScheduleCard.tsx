import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import type { Schedule } from '@/types/schedule';

interface ScheduleCardProps {
  readonly schedule: Schedule;
}

function formatReminderLabel(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}분 전`;
  }
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) {
    return `${hours}시간 전`;
  }
  return `${hours}시간 ${remaining}분 전`;
}

export default function ScheduleCard({ schedule }: ScheduleCardProps) {
  return (
    <View
      style={styles.card}
      accessibilityRole="text"
      accessibilityLabel={`일정: ${schedule.title}, ${schedule.date} ${schedule.time}, 알림: ${formatReminderLabel(schedule.reminderMinutes)}`}
    >
      <Text style={styles.title}>{schedule.title}</Text>

      <View style={styles.detailRow}>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={COLORS.textSecondary}
        />
        <Text style={styles.detailText}>{schedule.date}</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons
          name="time-outline"
          size={20}
          color={COLORS.textSecondary}
        />
        <Text style={styles.detailText}>{schedule.time}</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons
          name="notifications-outline"
          size={20}
          color={COLORS.textSecondary}
        />
        <Text style={styles.detailText}>
          {formatReminderLabel(schedule.reminderMinutes)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.scheduleCardBg,
    borderRadius: 16,
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
  },
});
