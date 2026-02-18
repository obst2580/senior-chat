import { StyleSheet, View } from 'react-native';

import ChatInput from '@/components/chat/ChatInput';
import MessageList from '@/components/chat/MessageList';
import { COLORS } from '@/constants/colors';
import { useChat } from '@/hooks/useChat';

interface ChatWindowProps {
  readonly userId: number;
  readonly companionName?: string;
}

export default function ChatWindow({
  userId,
  companionName = '다솜이',
}: ChatWindowProps) {
  const { messages, isLoading, isSpeaking, send } = useChat(
    userId,
    companionName,
  );

  return (
    <View style={styles.container}>
      <MessageList
        messages={messages}
        isLoading={isLoading}
        isSpeaking={isSpeaking}
        companionName={companionName}
      />
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
