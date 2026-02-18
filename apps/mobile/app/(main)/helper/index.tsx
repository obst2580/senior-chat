import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';
import PhotoPreview from '@/components/helper/PhotoPreview';
import AnalysisResult from '@/components/helper/AnalysisResult';
import { useCamera } from '@/hooks/useCamera';
import { useImageAnalysis } from '@/hooks/useImageAnalysis';

export default function HelperScreen() {
  const { photoUri, photoBase64, takePhoto, pickFromGallery, clearPhoto } =
    useCamera();
  const { result, isAnalyzing, error, analyze, clearResult } =
    useImageAnalysis();

  const handleAnalyze = async () => {
    if (!photoBase64) return;
    await analyze(photoBase64);
  };

  const handleRetake = () => {
    clearPhoto();
    clearResult();
  };

  // 분석 결과가 있으면 결과 화면
  if (result) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <AnalysisResult
          result={result.result}
          onNewPhoto={handleRetake}
        />
      </SafeAreaView>
    );
  }

  // 사진이 선택되면 미리보기
  if (photoUri) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <PhotoPreview
          uri={photoUri}
          isAnalyzing={isAnalyzing}
          onRetake={handleRetake}
          onAnalyze={handleAnalyze}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </SafeAreaView>
    );
  }

  // 초기 화면: 사진 촬영/선택
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.iconArea}>
          <Ionicons name="camera" size={80} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>사진으로 질문해보세요</Text>
        <Text style={styles.description}>
          궁금한 것을 사진으로 찍으면{'\n'}AI가 알려드려요
        </Text>
        <View style={styles.buttonArea}>
          <SeniorButton label="사진 찍기" onPress={takePhoto} />
          <View style={styles.buttonGap} />
          <SeniorButton
            label="앨범에서 선택"
            variant="secondary"
            onPress={pickFromGallery}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconArea: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.userMessageBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    lineHeight: LINE_HEIGHTS.xl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonArea: {
    width: '100%',
    paddingHorizontal: 24,
  },
  buttonGap: {
    height: 12,
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    textAlign: 'center',
    padding: 16,
  },
});
