import { useCallback, useState } from 'react';

import { getDailyQuizQuestions } from '@/lib/api-client';
import type { QuizQuestion } from '@/types/pastime';

interface DailyQuizState {
  readonly questions: readonly QuizQuestion[];
  readonly currentIndex: number;
  readonly answers: readonly (number | null)[];
  readonly isLoading: boolean;
  readonly isComplete: boolean;
}

const initialState: DailyQuizState = {
  questions: [],
  currentIndex: 0,
  answers: [],
  isLoading: false,
  isComplete: false,
};

export function useDailyQuiz() {
  const [state, setState] = useState<DailyQuizState>(initialState);

  const loadQuestions = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    const response = await getDailyQuizQuestions();

    if (response.success && response.data) {
      const questions = response.data;
      setState({
        questions,
        currentIndex: 0,
        answers: questions.map(() => null),
        isLoading: false,
        isComplete: false,
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const answerQuestion = useCallback(
    (selectedIndex: number) => {
      setState((prev) => {
        if (prev.answers[prev.currentIndex] !== null) return prev;

        const updatedAnswers = prev.answers.map((answer, i) =>
          i === prev.currentIndex ? selectedIndex : answer,
        );

        const nextIndex = prev.currentIndex + 1;
        const isComplete = nextIndex >= prev.questions.length;

        return {
          ...prev,
          answers: updatedAnswers,
          currentIndex: isComplete ? prev.currentIndex : nextIndex,
          isComplete,
        };
      });
    },
    [],
  );

  const getScore = useCallback((): number => {
    return state.questions.reduce((score, question, index) => {
      const answer = state.answers[index];
      if (answer === question.correctIndex) {
        return score + 1;
      }
      return score;
    }, 0);
  }, [state.questions, state.answers]);

  return {
    questions: state.questions,
    currentIndex: state.currentIndex,
    answers: state.answers,
    isLoading: state.isLoading,
    isComplete: state.isComplete,
    loadQuestions,
    answerQuestion,
    getScore,
  };
}
