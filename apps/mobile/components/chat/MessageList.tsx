import { useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import MessageBubble from '@/components/chat/MessageBubble';
import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import { type Message } from '@/types/chat';

interface MessageListProps {
  readonly messages: readonly Message[];
  readonly isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const flatListRef = useRef<FlatList<Message>>(null);

  if (messages.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>안녕하세요!</Text>
        <Text style={styles.emptySubtitle}>
          다솜이에게 무엇이든 물어보세요
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={messages as Message[]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MessageBubble message={item} />}
      contentContainerStyle={styles.listContent}
      onContentSizeChange={() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }}
      ListFooterComponent={
        isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>다솜이가 생각하고 있어요...</Text>
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
  emptyTitle: {
    fontSize: FONT_SIZES.xxl,
    lineHeight: LINE_HEIGHTS.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  emptySubtitle: {
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
