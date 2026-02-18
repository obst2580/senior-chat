import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

interface ScoreDisplayProps {
  readonly score: number;
  readonly label?: string;
}

export default function ScoreDisplay({ score, label }: ScoreDisplayProps) {
  return (
    <View
      style={styles.container}
      accessibilityRole="text"
      accessibilityLabel={label ? `${label}: ${score}점` : `${score}점`}
    >
      {label != null && <Text style={styles.label}>{label}</Text>}
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  label: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  score: {
    fontSize: FONT_SIZES.xxl,
    lineHeight: LINE_HEIGHTS.xxl,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
