import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS, TOUCH_TARGET } from '@/constants/typography';

interface ChatInputProps {
  readonly onSend: (message: string) => void;
  readonly disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="메시지를 입력하세요..."
        placeholderTextColor={COLORS.textLight}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
        multiline
        maxLength={2000}
        editable={!disabled}
        accessibilityLabel="메시지 입력"
        accessibilityHint="메시지를 입력한 후 전송 버튼을 눌러주세요"
      />
      <Pressable
        style={({ pressed }) => [
          styles.sendButton,
          (!text.trim() || disabled) && styles.sendButtonDisabled,
          pressed && text.trim() && !disabled && styles.sendButtonPressed,
        ]}
        onPress={handleSend}
        disabled={!text.trim() || disabled}
        accessibilityRole="button"
        accessibilityLabel="전송"
      >
        <Text
          style={[
            styles.sendButtonText,
            (!text.trim() || disabled) && styles.sendButtonTextDisabled,
          ]}
        >
          전송
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    backgroundColor: COLORS.white,
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: TOUCH_TARGET.min,
    maxHeight: 120,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  sendButton: {
    minHeight: TOUCH_TARGET.min,
    minWidth: TOUCH_TARGET.min,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  sendButtonPressed: {
    opacity: 0.85,
  },
  sendButtonText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    fontWeight: '600',
    color: COLORS.white,
  },
  sendButtonTextDisabled: {
    color: COLORS.textLight,
  },
});
