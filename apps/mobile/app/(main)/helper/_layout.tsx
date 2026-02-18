import { Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';

export default function HelperLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontSize: 24, fontWeight: '600' },
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'AI 도우미',
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              hitSlop={16}
              accessibilityRole="button"
              accessibilityLabel="뒤로 가기"
            >
              <Ionicons name="chevron-back" size={28} color={COLORS.text} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="result" options={{ title: '분석 결과' }} />
    </Stack>
  );
}
