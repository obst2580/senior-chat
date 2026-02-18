import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';

export default function ScheduleWhatScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');

  const handleNext = () => {
    if (title.trim().length === 0) return;
    router.push({
      pathname: '/(main)/schedule/create/date',
      params: { title: title.trim() },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.step}>1단계 / 5단계</Text>
        <Text style={styles.question}>무엇을 하시나요?</Text>
        <TextInput
          style={styles.input}
          placeholder="예: 병원 가기, 친구 만나기"
          placeholderTextColor={COLORS.textLight}
          accessibilityLabel="일정 제목 입력"
          accessibilityHint="무엇을 할 건지 적어주세요"
          value={title}
          onChangeText={setTitle}
          autoFocus
        />
        <View style={styles.buttonArea}>
          <SeniorButton
            label="다음"
            onPress={handleNext}
            disabled={title.trim().length === 0}
          />
        </View>
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
    padding: 24,
    gap: 16,
  },
  step: {
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  question: {
    fontSize: FONT_SIZES.xl,
    lineHeight: LINE_HEIGHTS.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  input: {
    minHeight: TOUCH_TARGET.comfortable,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  buttonArea: {
    marginTop: 'auto',
    paddingBottom: 8,
  },
});
