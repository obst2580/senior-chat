import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SeniorButton from '@/components/ui/SeniorButton';
import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';

export default function LoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    router.replace('/(main)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>안녕하세요!</Text>
        <Text style={styles.subtitle}>
          전화번호를 입력해주세요
        </Text>

        <TextInput
          style={styles.input}
          placeholder="010-0000-0000"
          placeholderTextColor={COLORS.textLight}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          autoFocus
        />

        <SeniorButton
          label="시작하기"
          onPress={handleLogin}
          disabled={phoneNumber.length < 10}
        />
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
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    lineHeight: LINE_HEIGHTS.xxl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: TOUCH_TARGET.comfortable,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: 24,
    textAlign: 'center',
  },
});
