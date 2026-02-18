import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

interface StepHeaderProps {
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly title: string;
}

export default function StepHeader({
  currentStep,
  totalSteps,
  title,
}: StepHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>
        {currentStep}단계 / {totalSteps}단계
      </Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${(currentStep / totalSteps) * 100}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  step: {
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  title: {
    fontSize: FONT_SIZES.xl,
    lineHeight: LINE_HEIGHTS.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.divider,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
});
