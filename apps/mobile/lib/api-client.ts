import Constants from 'expo-constants';
import { type Message, type SendMessageResponse } from '@/types/chat';
import type {
  CompanionProfile,
  CompanionProfileRequest,
  CompanionChatRequest,
  CompanionChatResponse,
} from '@/types/companion';
import type {
  PhotoAnalysisRequest,
  PhotoAnalysisResponse,
} from '@/types/helper';
import type { Schedule, CreateScheduleRequest } from '@/types/schedule';
import type {
  QuizQuestion,
  DailyQuizResult,
  DailyQuizSubmitRequest,
  WordChainRequest,
  WordChainResponse,
} from '@/types/pastime';

const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? 'https://seniorapi.gomgame.net';

const TTS_BASE_URL =
  Constants.expoConfig?.extra?.ttsUrl ?? 'http://localhost:8090';

interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
}

interface ServerError {
  readonly code: string;
  readonly message: string;
}

interface ServerResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: ServerError;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  let json: ServerResponse<T> | null = null;
  try {
    json = (await response.json()) as ServerResponse<T>;
  } catch {
    json = null;
  }

  if (!response.ok) {
    return {
      success: false,
      error: json?.error?.message ?? `Request failed: ${response.status}`,
    };
  }

  if (!json?.success) {
    return {
      success: false,
      error: json?.error?.message ?? '요청에 실패했어요. 다시 시도해주세요.',
    };
  }

  return { success: true, data: json.data };
}

export async function sendMessage(
  userId: number,
  message: string,
  city?: string | null,
  district?: string | null,
): Promise<ApiResponse<SendMessageResponse>> {
  return request<SendMessageResponse>('/api/v1/chat/send', {
    method: 'POST',
    body: JSON.stringify({ userId, message, city, district }),
  });
}

export async function getChatHistory(
  userId: number,
): Promise<ApiResponse<readonly Message[]>> {
  return request<readonly Message[]>(`/api/v1/chat/history/${userId}`);
}

export async function createSession(): Promise<
  ApiResponse<{ readonly sessionId: string }>
> {
  return {
    success: false,
    error: '세션 생성 API는 아직 준비 중이에요.',
  };
}

// --- Helper (AI 도우미) ---

export async function analyzePhoto(
  data: PhotoAnalysisRequest,
): Promise<ApiResponse<PhotoAnalysisResponse>> {
  return request<PhotoAnalysisResponse>('/api/v1/helper/analyze', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// --- Companion (AI 말벗) ---

export async function getCompanionProfile(
  userId: number,
): Promise<ApiResponse<CompanionProfile>> {
  return request<CompanionProfile>(`/api/v1/companion/${userId}/profile`);
}

export async function updateCompanionProfile(
  userId: number,
  data: CompanionProfileRequest,
): Promise<ApiResponse<CompanionProfile>> {
  return request<CompanionProfile>(`/api/v1/companion/${userId}/profile`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function sendCompanionChat(
  data: CompanionChatRequest,
): Promise<ApiResponse<CompanionChatResponse>> {
  return request<CompanionChatResponse>('/api/v1/companion/chat', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// --- TTS (음성 생성) ---

export function getTtsAudioUrl(text: string): string {
  return `${TTS_BASE_URL}/tts`;
}

export async function fetchTtsAudio(
  text: string,
): Promise<{ success: boolean; audioUri?: string; error?: string }> {
  try {
    const response = await fetch(`${TTS_BASE_URL}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      return { success: false, error: 'TTS 생성에 실패했어요.' };
    }

    const blob = await response.blob();
    const fileReader = new FileReader();

    return new Promise((resolve) => {
      fileReader.onloadend = () => {
        resolve({ success: true, audioUri: fileReader.result as string });
      };
      fileReader.onerror = () => {
        resolve({ success: false, error: 'TTS 오디오 처리 실패' });
      };
      fileReader.readAsDataURL(blob);
    });
  } catch {
    return { success: false, error: 'TTS 서버에 연결할 수 없어요.' };
  }
}

// --- Schedule (일정 알리미) ---

export async function getSchedules(
  userId: number,
): Promise<ApiResponse<readonly Schedule[]>> {
  return request<readonly Schedule[]>(`/api/v1/schedules/${userId}`);
}

export async function createSchedule(
  data: CreateScheduleRequest,
): Promise<ApiResponse<Schedule>> {
  return request<Schedule>('/api/v1/schedules', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// --- Pastime (시간 보내기) ---

export async function getDailyQuizQuestions(): Promise<
  ApiResponse<readonly QuizQuestion[]>
> {
  return request<readonly QuizQuestion[]>(
    '/api/v1/pastime/daily-quiz/questions',
  );
}

export async function submitDailyQuiz(
  data: DailyQuizSubmitRequest,
): Promise<ApiResponse<DailyQuizResult>> {
  return request<DailyQuizResult>('/api/v1/pastime/daily-quiz/submit', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function sendWordChain(
  data: WordChainRequest,
): Promise<ApiResponse<WordChainResponse>> {
  return request<WordChainResponse>('/api/v1/pastime/word-chain', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
