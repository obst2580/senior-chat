import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';
import { useWordChain } from '@/hooks/useWordChain';

const TEMP_USER_ID = 1;

export default function WordChainScreen() {
  const { words, isMyTurn, isLoading, error, submitWord, resetGame } =
    useWordChain(TEMP_USER_ID);
  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    const submitted = input.trim();
    setInput('');
    await submitWord(submitted);
    inputRef.current?.focus();
  }, [input, isLoading, submitWord]);

  const renderWordItem = useCallback(
    ({ item, index }: { readonly item: string; readonly index: number }) => {
      const isUser = index % 2 === 0;
      return (
        <View
          style={[
            styles.wordBubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
        >
          <Text style={styles.wordSpeaker}>{isUser ? '나' : 'AI'}</Text>
          <Text style={styles.wordText}>{item}</Text>
        </View>
      );
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <View style={styles.content}>
          {words.length === 0 ? (
            <View style={styles.emptyArea}>
              <Text style={styles.instruction}>
                AI와 끝말잇기를 해보세요!{'\n'}먼저 단어를 입력해주세요.
              </Text>
            </View>
          ) : (
            <FlatList
              data={words}
              renderItem={renderWordItem}
              keyExtractor={(_, index) => String(index)}
              contentContainerStyle={styles.wordList}
              inverted={false}
            />
          )}

          {error != null && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          {isLoading && (
            <View style={styles.loadingArea}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.loadingText}>AI가 생각 중...</Text>
            </View>
          )}

          <View style={styles.inputArea}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="단어를 입력하세요"
              placeholderTextColor={COLORS.textLight}
              editable={isMyTurn && !isLoading}
              onSubmitEditing={handleSubmit}
              returnKeyType="send"
              accessibilityLabel="끝말잇기 단어 입력"
            />
            <SeniorButton
              label="보내기"
              onPress={handleSubmit}
              disabled={!input.trim() || !isMyTurn || isLoading}
            />
          </View>

          {words.length > 0 && (
            <SeniorButton
              label="새 게임"
              onPress={resetGame}
              variant="secondary"
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  emptyArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instruction: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  wordList: {
    gap: 8,
    paddingVertical: 8,
  },
  wordBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: COLORS.userMessageBg,
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: COLORS.aiMessageBg,
    alignSelf: 'flex-start',
  },
  wordSpeaker: {
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  wordText: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    color: COLORS.error,
    textAlign: 'center',
  },
  loadingArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  loadingText: {
    fontSize: FONT_SIZES.sm,
    lineHeight: LINE_HEIGHTS.sm,
    color: COLORS.textSecondary,
  },
  inputArea: {
    gap: 12,
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
});
