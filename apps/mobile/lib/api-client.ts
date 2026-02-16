import Constants from 'expo-constants';
import { type Message, type SendMessageResponse } from '@/types/chat';

const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:8080';

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
): Promise<ApiResponse<SendMessageResponse>> {
  return request<SendMessageResponse>('/api/v1/chat/send', {
    method: 'POST',
    body: JSON.stringify({ userId, message }),
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
