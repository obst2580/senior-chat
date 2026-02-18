import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import type { Schedule } from '@/types/schedule';

import ScheduleCard from './ScheduleCard';

interface ScheduleListProps {
  readonly schedules: readonly Schedule[];
  readonly isLoading: boolean;
}

function EmptyState() {
  return (
    <View style={styles.emptyContainer} accessibilityRole="text">
      <Text style={styles.emptyText}>등록된 일정이 없어요</Text>
    </View>
  );
}

function renderItem({ item }: { readonly item: Schedule }) {
  return <ScheduleCard schedule={item} />;
}

function keyExtractor(item: Schedule) {
  return item.id;
}

export default function ScheduleList({
  schedules,
  isLoading,
}: ScheduleListProps) {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={schedules}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={EmptyState}
    />
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    color: COLORS.textSecondary,
  },
});
