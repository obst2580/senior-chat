import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import { type Message } from '@/types/chat';

interface MessageBubbleProps {
  readonly message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
      accessibilityRole="text"
      accessibilityLabel={
        isUser
          ? `내가 보낸 메시지: ${message.content}`
          : `다솜이의 답변: ${message.content}`
      }
    >
      {!isUser && <Text style={styles.senderName}>다솜이</Text>}
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.aiText,
          ]}
        >
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  senderName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 4,
    marginLeft: 4,
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  userBubble: {
    backgroundColor: COLORS.userMessageBg,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: COLORS.aiMessageBg,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
  },
  userText: {
    color: COLORS.text,
  },
  aiText: {
    color: COLORS.text,
  },
});
