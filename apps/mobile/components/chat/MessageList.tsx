import { useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import MessageBubble from '@/components/chat/MessageBubble';
import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import { type Message } from '@/types/chat';

interface MessageListProps {
  readonly messages: readonly Message[];
  readonly isLoading: boolean;
  readonly isSpeaking?: boolean;
  readonly companionName?: string;
}

export default function MessageList({
  messages,
  isLoading,
  isSpeaking = false,
  companionName = '다솜이',
}: MessageListProps) {
  const flatListRef = useRef<FlatList<Message>>(null);

  return (
    <FlatList
      ref={flatListRef}
      data={messages as Message[]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MessageBubble message={item} />}
      contentContainerStyle={
        messages.length === 0 ? styles.emptyContent : styles.listContent
      }
      onContentSizeChange={() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            {companionName}에게 말을 걸어보세요
          </Text>
        </View>
      }
      ListFooterComponent={
        isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              {companionName}이(가) 생각하고 있어요...
            </Text>
          </View>
        ) : isSpeaking ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              {companionName}이(가) 말하고 있어요...
            </Text>
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 16,
  },
  loadingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
});
