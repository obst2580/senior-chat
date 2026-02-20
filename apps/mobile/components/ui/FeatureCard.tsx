import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

interface FeatureCardProps {
  readonly title: string;
  readonly subtitle: string;
  readonly icon: keyof typeof Ionicons.glyphMap;
  readonly iconColor: string;
  readonly iconBgColor: string;
  readonly cardBgColor?: string; // 카드 전체 배경색 추가
  readonly onPress: () => void;
}

export default function FeatureCard({
  title,
  subtitle,
  icon,
  iconColor,
  iconBgColor,
  cardBgColor = COLORS.white,
  onPress,
}: FeatureCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: cardBgColor },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title} - ${subtitle}`}
    >
      <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
        <Ionicons name={icon} size={40} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 160,
    borderRadius: 32, // 더 둥근 모서리
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowColor: COLORS.primary, // 포인트 컬러 그림자
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)', // 아주 얇은 테두리
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    // 내부 그림자 효과
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '800', // 더 굵게
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
    opacity: 0.8,
  },
});
