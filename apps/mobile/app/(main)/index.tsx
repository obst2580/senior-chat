import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import FeatureCard from '@/components/ui/FeatureCard';
import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.greeting}>반가워요, <Text style={styles.highlight}>어르신!</Text></Text>
        <Text style={styles.subGreeting}>오늘도 활기찬 하루 보내세요.</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.row}>
          <FeatureCard
            title="AI 도우미"
            subtitle="사진으로 척척"
            icon="camera"
            iconColor="#FFFFFF"
            iconBgColor="#FF6B6B"
            cardBgColor="#FFF5F5"
            onPress={() => router.push('/(main)/helper')}
          />
          <View style={styles.gap} />
          <FeatureCard
            title="AI 말벗"
            subtitle="도란도란 대화"
            icon="call"
            iconColor="#FFFFFF"
            iconBgColor="#4ECDC4"
            cardBgColor="#F0FDFD"
            onPress={() => router.push('/(main)/companion')}
          />
        </View>
        <View style={styles.row}>
          <FeatureCard
            title="일정 알림"
            subtitle="잊지 않게 챙겨요"
            icon="calendar"
            iconColor="#FFFFFF"
            iconBgColor="#FF9F43"
            cardBgColor="#FFF9F2"
            onPress={() => router.push('/(main)/schedule')}
          />
          <View style={styles.gap} />
          <FeatureCard
            title="즐거운 놀이"
            subtitle="두뇌 튼튼 게임"
            icon="game-controller"
            iconColor="#FFFFFF"
            iconBgColor="#54A0FF"
            cardBgColor="#F2F8FF"
            onPress={() => router.push('/(main)/pastime')}
          />
        </View>
      </View>

      <View style={styles.benefitSection}>
        <Text style={styles.sectionTitle}>오늘의 혜택 알림</Text>
        <View style={styles.benefitCard}>
          <View style={styles.benefitIcon}>
            <Ionicons name="gift" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.benefitContent}>
            <Text style={styles.benefitText}>인천시 시니어 무료 교육</Text>
            <Text style={styles.benefitSubText}>지금 바로 확인해 보세요!</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  highlight: {
    color: COLORS.primary,
  },
  subGreeting: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginTop: 8,
    fontWeight: '500',
  },
  grid: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
  },
  gap: {
    width: 16,
  },
  benefitSection: {
    marginTop: 40,
    gap: 12,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.text,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.divider,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  benefitIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 126, 95, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitContent: {
    flex: 1,
  },
  benefitText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  benefitSubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
});
