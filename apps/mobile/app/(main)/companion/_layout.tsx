import { Stack } from 'expo-router';

import { COLORS } from '@/constants/colors';

export default function CompanionLayout() {
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
          headerShown: false,
        }}
      />
      <Stack.Screen name="settings" options={{ title: '말벗 설정' }} />
    </Stack>
  );
}
