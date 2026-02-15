export interface Message {
  readonly id: string;
  readonly role: 'user' | 'assistant';
  readonly content: string;
  readonly createdAt: string;
}

export interface ChatSession {
  readonly id: string;
  readonly messages: readonly Message[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SendMessageRequest {
  readonly sessionId: string;
  readonly content: string;
}

export interface SendMessageResponse {
  readonly message: Message;
}

export interface ChatState {
  readonly messages: readonly Message[];
  readonly isLoading: boolean;
  readonly error: string | null;
}
