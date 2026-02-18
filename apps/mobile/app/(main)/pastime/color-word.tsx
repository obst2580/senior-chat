import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import SeniorButton from '@/components/ui/SeniorButton';
import ColorWordDisplay from '@/components/pastime/ColorWordDisplay';
import ScoreDisplay from '@/components/pastime/ScoreDisplay';
import { useColorWord } from '@/hooks/useColorWord';
import { useGame } from '@/hooks/useGame';

const MAX_ROUNDS = 10;

export default function ColorWordScreen() {
  const { word, displayColor, options, isCorrect, checkAnswer, nextRound, round } =
    useColorWord();
  const game = useGame();
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current !== null) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (round > MAX_ROUNDS && game.isActive) {
      game.endGame();
    }
  }, [round, game.isActive, game.endGame]);

  const handleStart = useCallback(() => {
    nextRound();
    game.startGame();
  }, [nextRound, game.startGame]);

  const handleAnswer = useCallback(
    (color: string) => {
      if (!game.isActive || isCorrect !== null) return;
      const correct = checkAnswer(color);
      if (correct) {
        game.addScore(10);
      }

      feedbackTimeoutRef.current = setTimeout(() => {
        if (round < MAX_ROUNDS) {
          nextRound();
        }
      }, 1000);
    },
    [game.isActive, isCorrect, checkAnswer, game.addScore, nextRound, round],
  );

  const gameOver = game.isComplete || round > MAX_ROUNDS;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.score}>{`점수: ${game.score}`}</Text>
          <Text style={styles.roundInfo}>{`${Math.min(round, MAX_ROUNDS)} / ${MAX_ROUNDS}`}</Text>
          <Text style={styles.timer}>{`시간: ${game.timeElapsed}초`}</Text>
        </View>

        {!game.isActive && !gameOver ? (
          <View style={styles.startArea}>
            <Text style={styles.instruction}>
              글자의 색깔을 맞춰보세요!{'\n'}글자 내용이 아니라 색깔이에요!
            </Text>
            <SeniorButton label="게임 시작" onPress={handleStart} />
          </View>
        ) : gameOver ? (
          <View style={styles.completeArea}>
            <ScoreDisplay score={game.score} label="최종 점수" />
            <Text style={styles.completeText}>
              {`${MAX_ROUNDS}라운드 완료!`}
            </Text>
            <SeniorButton label="다시 하기" onPress={handleStart} />
          </View>
        ) : (
          <View style={styles.gameArea}>
            <ColorWordDisplay
              word={word}
              displayColor={displayColor}
              options={options}
              onAnswer={handleAnswer}
            />
            {isCorrect !== null && (
              <Text
                style={[
                  styles.feedback,
                  isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
                ]}
              >
                {isCorrect ? '정답!' : '아쉬워요!'}
              </Text>
            )}
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
    alignItems: 'center',
  },
  score: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    fontWeight: '700',
    color: COLORS.text,
  },
  roundInfo: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    fontWeight: '600',
    color: COLORS.primary,
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
    justifyContent: 'center',
    gap: 20,
  },
  feedback: {
    fontSize: FONT_SIZES.lg,
    lineHeight: LINE_HEIGHTS.lg,
    fontWeight: '700',
    textAlign: 'center',
  },
  correctFeedback: {
    color: COLORS.gameCorrect,
  },
  incorrectFeedback: {
    color: COLORS.gameIncorrect,
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
