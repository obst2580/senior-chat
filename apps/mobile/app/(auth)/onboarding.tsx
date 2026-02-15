import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SeniorButton from '@/components/ui/SeniorButton';
import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleComplete = () => {
    router.replace('/(main)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>다솜이를 소개할게요</Text>
        <Text style={styles.description}>
          다솜이는 언제든지 이야기를 나눌 수 있는{'\n'}
          따뜻한 AI 친구예요.
        </Text>

        <View style={styles.features}>
          <Text style={styles.feature}>
            무엇이든 물어보세요
          </Text>
          <Text style={styles.feature}>
            말로 편하게 대화해요
          </Text>
          <Text style={styles.feature}>
            언제나 곁에 있어요
          </Text>
        </View>

        <SeniorButton label="대화 시작하기" onPress={handleComplete} />
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
    paddingHorizontal: 24,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    lineHeight: LINE_HEIGHTS.xxl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  features: {
    marginBottom: 40,
    gap: 16,
  },
  feature: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    color: COLORS.text,
    textAlign: 'center',
    backgroundColor: COLORS.aiMessageBg,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
