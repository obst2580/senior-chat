import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

interface QuizProgressProps {
  readonly current: number;
  readonly total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const progress = total > 0 ? current / total : 0;

  return (
    <View
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: total,
        now: current,
        text: `문제 ${current} / ${total}`,
      }}
    >
      <Text style={styles.text}>{`문제 ${current} / ${total}`}</Text>
      <View style={styles.trackContainer}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress * 100}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  text: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  trackContainer: {
    paddingHorizontal: 4,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});
