import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';

interface CompanionAvatarProps {
  readonly name: string;
  readonly size?: number;
}

export default function CompanionAvatar({
  name,
  size = 100,
}: CompanionAvatarProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="person-circle"
        size={size}
        color={COLORS.primary}
        accessibilityElementsHidden
      />
      <Text
        style={styles.name}
        accessibilityRole="text"
        accessibilityLabel={`말벗 이름: ${name}`}
      >
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  name: {
    marginTop: 8,
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
});
