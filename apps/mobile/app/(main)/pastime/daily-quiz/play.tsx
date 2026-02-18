import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { COLORS } from '@/constants/colors';
import { FONT_SIZES, LINE_HEIGHTS } from '@/constants/typography';
import QuizQuestionComponent from '@/components/pastime/QuizQuestion';
import QuizProgress from '@/components/pastime/QuizProgress';
import { useDailyQuiz } from '@/hooks/useDailyQuiz';

export default function DailyQuizPlayScreen() {
  const router = useRouter();
  const {
    questions,
    currentIndex,
    answers,
    isLoading,
    isComplete,
    loadQuestions,
    answerQuestion,
    getScore,
  } = useDailyQuiz();

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  useEffect(() => {
    if (isComplete) {
      const score = getScore();
      const total = questions.length;
      router.replace({
        pathname: '/(main)/pastime/daily-quiz/result',
        params: { score: String(score), total: String(total) },
      });
    }
  }, [isComplete, getScore, questions.length, router]);

  if (isLoading || questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>문제를 불러오고 있어요...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <QuizProgress
          current={currentIndex + 1}
          total={questions.length}
        />
        <QuizQuestionComponent
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={answerQuestion}
          selectedIndex={selectedAnswer}
        />
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
    padding: 24,
    gap: 24,
  },
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    lineHeight: LINE_HEIGHTS.md,
    color: COLORS.textSecondary,
  },
});
