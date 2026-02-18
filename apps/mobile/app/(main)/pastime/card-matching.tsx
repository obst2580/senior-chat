import { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';
import CardGrid from '@/components/pastime/CardGrid';
import ScoreDisplay from '@/components/pastime/ScoreDisplay';
import { useCardMatching } from '@/hooks/useCardMatching';
import { useGame } from '@/hooks/useGame';

export default function CardMatchingScreen() {
  const { cards, matchedCount, isComplete, flipCard, resetGame } =
    useCardMatching();
  const game = useGame();

  useEffect(() => {
    if (isComplete && game.isActive) {
      game.endGame();
    }
  }, [isComplete, game.isActive, game.endGame]);

  const handleStart = useCallback(() => {
    resetGame();
    game.startGame();
  }, [resetGame, game.startGame]);

  const handleFlip = useCallback(
    (id: string) => {
      if (!game.isActive) return;
      flipCard(id);
      game.addScore(1);
    },
    [game.isActive, flipCard, game.addScore],
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.score}>{`점수: ${game.score}`}</Text>
          <Text style={styles.timer}>{`시간: ${game.timeElapsed}초`}</Text>
        </View>

        {!game.isActive && !game.isComplete ? (
          <View style={styles.startArea}>
            <Text style={styles.instruction}>카드를 뒤집어 같은 그림을 찾아보세요!</Text>
            <SeniorButton label="게임 시작" onPress={handleStart} />
          </View>
        ) : isComplete ? (
          <View style={styles.completeArea}>
            <ScoreDisplay score={game.score} label="최종 점수" />
            <Text style={styles.completeText}>
              {`${game.timeElapsed}초 만에 완료했어요!`}
            </Text>
            <SeniorButton label="다시 하기" onPress={handleStart} />
          </View>
        ) : (
          <View style={styles.gameArea}>
            <Text style={styles.matchInfo}>
              {`맞춘 쌍: ${matchedCount / 2} / ${cards.length / 2}`}
            </Text>
            <CardGrid cards={cards} onFlip={handleFlip} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  score: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    fontWeight: '700',
    color: COLORS.text,
  },
  timer: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
  },
  startArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  instruction: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  gameArea: {
    flex: 1,
    gap: 16,
  },
  matchInfo: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  completeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  completeText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
