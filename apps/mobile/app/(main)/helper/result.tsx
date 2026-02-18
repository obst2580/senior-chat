import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';

export default function HelperResultScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>분석 결과</Text>
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            아직 분석 결과가 없어요.{'\n'}사진을 찍어서 질문해보세요.
          </Text>
        </View>
        <SeniorButton
          label="다시 찍기"
          onPress={() => router.back()}
          variant="secondary"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    gap: 24,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    lineHeight: LINE_HEIGHTS.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  resultBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resultText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.text,
  },
});
