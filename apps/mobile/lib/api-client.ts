import Constants from 'expo-constants';
import { type Message, type SendMessageResponse } from '@/types/chat';

const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:8080';

interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
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

  if (!response.ok) {
    return {
      success: false,
      error: `Request failed: ${response.status}`,
    };
  }

  const data = (await response.json()) as T;
  return { success: true, data };
}

export async function sendMessage(
  sessionId: string,
  content: string,
): Promise<ApiResponse<SendMessageResponse>> {
  return request<SendMessageResponse>('/api/chat/send', {
    method: 'POST',
    body: JSON.stringify({ sessionId, content }),
  });
}

export async function getChatHistory(
  sessionId: string,
): Promise<ApiResponse<readonly Message[]>> {
  return request<readonly Message[]>(`/api/chat/history/${sessionId}`);
}

export async function createSession(): Promise<
  ApiResponse<{ readonly sessionId: string }>
> {
  return request<{ readonly sessionId: string }>('/api/chat/session', {
    method: 'POST',
  });
}
