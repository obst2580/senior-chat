import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

import SeniorButton from '@/components/ui/SeniorButton';

interface AnalysisResultProps {
  readonly result: string;
  readonly onNewPhoto: () => void;
}

export default function AnalysisResult({
  result,
  onNewPhoto,
}: AnalysisResultProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.card}
        contentContainerStyle={styles.cardContent}
      >
        <Text style={styles.resultText}>{result}</Text>
      </ScrollView>

      <SeniorButton label="새 사진 찍기" onPress={onNewPhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardContent: {
    padding: 20,
  },
  resultText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.text,
  },
});
