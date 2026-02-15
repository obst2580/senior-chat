import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>설정</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>글씨 크기</Text>
          <Text style={styles.sectionDescription}>
            글씨 크기를 조절할 수 있어요
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>음성 설정</Text>
          <Text style={styles.sectionDescription}>
            음성 대화 설정을 바꿀 수 있어요
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 정보</Text>
          <Text style={styles.sectionDescription}>
            버전 0.1.0
          </Text>
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
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    lineHeight: LINE_HEIGHTS.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 32,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
  },
});
