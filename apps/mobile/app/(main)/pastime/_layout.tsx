import { Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';

export default function PastimeLayout() {
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
          title: '시간 보내기',
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
      <Stack.Screen name="card-matching" options={{ title: '카드 뒤집기' }} />
      <Stack.Screen
        name="number-ordering"
        options={{ title: '순서 맞추기' }}
      />
      <Stack.Screen name="color-word" options={{ title: '색깔 글자' }} />
      <Stack.Screen name="word-chain" options={{ title: '끝말잇기' }} />
      <Stack.Screen
        name="daily-quiz/index"
        options={{ title: '오늘의 퀴즈' }}
      />
      <Stack.Screen
        name="daily-quiz/play"
        options={{ title: '오늘의 퀴즈' }}
      />
      <Stack.Screen
        name="daily-quiz/result"
        options={{ title: '퀴즈 결과' }}
      />
    </Stack>
  );
}
