import { StyleSheet, View } from 'react-native';

import ChatInput from '@/components/chat/ChatInput';
import MessageList from '@/components/chat/MessageList';
import { COLORS } from '@/constants/colors';
import { useChat } from '@/hooks/useChat';

interface ChatWindowProps {
  readonly userId: number;
}

export default function ChatWindow({ userId }: ChatWindowProps) {
  const { messages, isLoading, send } = useChat(userId);

  return (
    <View style={styles.container}>
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSend={send} disabled={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
