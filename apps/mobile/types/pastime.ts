export type GameType =
  | 'card-matching'
  | 'number-ordering'
  | 'color-word'
  | 'word-chain'
  | 'daily-quiz';

export interface CardItem {
  readonly id: string;
  readonly value: string;
  readonly isFlipped: boolean;
  readonly isMatched: boolean;
}

export interface QuizQuestion {
  readonly id: string;
  readonly question: string;
  readonly options: readonly string[];
  readonly correctIndex: number;
}

export interface DailyQuizResult {
  readonly quizId: string;
  readonly totalQuestions: number;
  readonly correctCount: number;
  readonly score: number;
  readonly completedAt: string;
}

export interface GameState {
  readonly score: number;
  readonly timeElapsed: number;
  readonly isActive: boolean;
  readonly isComplete: boolean;
}

export interface WordChainRequest {
  readonly userId: number;
  readonly word: string;
  readonly sessionId?: string;
}

export interface WordChainResponse {
  readonly word: string;
  readonly sessionId: string;
  readonly isValid: boolean;
  readonly message?: string;
}

export interface DailyQuizSubmitRequest {
  readonly userId: number;
  readonly answers: readonly number[];
}
