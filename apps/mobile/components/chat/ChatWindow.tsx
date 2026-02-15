import { StyleSheet, View } from 'react-native';

import ChatInput from '@/components/chat/ChatInput';
import MessageList from '@/components/chat/MessageList';
import { COLORS } from '@/constants/colors';
import { useChat } from '@/hooks/useChat';

interface ChatWindowProps {
  readonly sessionId: string;
}

export default function ChatWindow({ sessionId }: ChatWindowProps) {
  const { messages, isLoading, send } = useChat(sessionId);

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
