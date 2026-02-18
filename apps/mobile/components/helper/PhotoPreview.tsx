import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

import SeniorButton from '@/components/ui/SeniorButton';

interface PhotoPreviewProps {
  readonly uri: string;
  readonly onRetake: () => void;
  readonly onAnalyze: () => void;
  readonly isAnalyzing: boolean;
}

export default function PhotoPreview({
  uri,
  onRetake,
  onAnalyze,
  isAnalyzing,
}: PhotoPreviewProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={styles.image}
        accessibilityLabel="촬영한 사진"
        resizeMode="cover"
      />

      {isAnalyzing && (
        <Text style={styles.loadingText}>사진을 분석하고 있어요...</Text>
      )}

      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <SeniorButton
            label="다시 찍기"
            onPress={onRetake}
            variant="secondary"
            disabled={isAnalyzing}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <SeniorButton
            label="분석하기"
            onPress={onAnalyze}
            variant="primary"
            disabled={isAnalyzing}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 16,
    backgroundColor: COLORS.border,
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  buttonWrapper: {
    flex: 1,
  },
});
