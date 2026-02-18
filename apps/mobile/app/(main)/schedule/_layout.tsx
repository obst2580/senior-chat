import { Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/constants/colors';

export default function ScheduleLayout() {
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
          title: '일정 알리미',
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
      <Stack.Screen
        name="create/what"
        options={{ title: '일정 만들기' }}
      />
      <Stack.Screen
        name="create/date"
        options={{ title: '일정 만들기' }}
      />
      <Stack.Screen
        name="create/time"
        options={{ title: '일정 만들기' }}
      />
      <Stack.Screen
        name="create/reminder"
        options={{ title: '일정 만들기' }}
      />
      <Stack.Screen
        name="create/confirm"
        options={{ title: '일정 만들기' }}
      />
    </Stack>
  );
}
