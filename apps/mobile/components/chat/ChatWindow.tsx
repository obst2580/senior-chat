import { StyleSheet, View } from 'react-native';

import ChatInput from '@/components/chat/ChatInput';
import MessageList from '@/components/chat/MessageList';
import { COLORS } from '@/constants/colors';
import { useChat } from '@/hooks/useChat';

interface ChatWindowProps {
  readonly userId: number;
  readonly companionName?: string;
  readonly city?: string | null;
  readonly district?: string | null;
}

export default function ChatWindow({
  userId,
  companionName = '다솜이',
  city,
  district,
}: ChatWindowProps) {
  const { messages, isLoading, isSpeaking, send } = useChat(
    userId,
    companionName,
    { city: city ?? null, district: district ?? null },
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
