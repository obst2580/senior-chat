import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';
import { useCompanion } from '@/hooks/useCompanion';

const DIALECT_OPTIONS = [
  '표준어',
  '경상도',
  '전라도',
  '충청도',
  '제주도',
] as const;

export default function CompanionSettingsScreen() {
  const { profile, isLoading, error, loadProfile, saveProfile } =
    useCompanion();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dialect, setDialect] = useState<string>('표준어');

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (!profile) return;
    setName(profile.name);
    setAge(String(profile.age));
    setDialect(profile.dialect);
  }, [profile]);

  const handleSave = () => {
    const parsedAge = parseInt(age, 10);
    if (!name.trim() || isNaN(parsedAge)) return;
    saveProfile({ name: name.trim(), age: parsedAge, dialect });
  };

  const canSave = name.trim().length > 0 && age.trim().length > 0;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>말벗 이름</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="다솜이"
          placeholderTextColor={COLORS.textLight}
          accessibilityLabel="말벗 이름 입력"
        />

        <Text style={styles.label}>나이</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="나이를 입력하세요"
          keyboardType="number-pad"
          placeholderTextColor={COLORS.textLight}
          accessibilityLabel="나이 입력"
        />

        <Text style={styles.label}>말투</Text>
        <View style={styles.radioGroup}>
          {DIALECT_OPTIONS.map((option) => {
            const selected = dialect === option;
            return (
              <Pressable
                key={option}
                style={[
                  styles.radioButton,
                  selected && styles.radioButtonSelected,
                ]}
                onPress={() => setDialect(option)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                accessibilityLabel={`${option} 말투 선택`}
              >
                <Text
                  style={[
                    styles.radioLabel,
                    selected && styles.radioLabelSelected,
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonArea}>
          <SeniorButton
            label={isLoading ? '저장 중...' : '저장하기'}
            onPress={handleSave}
            disabled={!canSave || isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 12,
  },
  label: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 8,
  },
  input: {
    minHeight: TOUCH_TARGET.min,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  radioButton: {
    minHeight: TOUCH_TARGET.min,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.userMessageBg,
  },
  radioLabel: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  radioLabelSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 8,
  },
  buttonArea: {
    marginTop: 24,
  },
});
