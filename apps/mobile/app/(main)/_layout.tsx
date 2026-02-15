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
    />
  );
}
