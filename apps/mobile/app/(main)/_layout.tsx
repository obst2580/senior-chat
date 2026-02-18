import { Stack } from 'expo-router';

import { COLORS } from '@/constants/colors';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontSize: 24, fontWeight: '600' },
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ title: '설정' }} />
      <Stack.Screen
        name="helper"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="companion"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="schedule"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="pastime"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
