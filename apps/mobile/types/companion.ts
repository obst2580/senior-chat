export interface CompanionProfile {
  readonly id: string;
  readonly userId: number;
  readonly name: string;
  readonly age: number;
  readonly dialect: '표준어' | '경상도' | '전라도' | '충청도' | '제주도';
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CompanionState {
  readonly profile: CompanionProfile | null;
  readonly isCallActive: boolean;
  readonly isMuted: boolean;
  readonly isLoading: boolean;
  readonly error: string | null;
}

export interface CompanionProfileRequest {
  readonly name: string;
  readonly age: number;
  readonly dialect: string;
}

export interface CompanionChatRequest {
  readonly userId: number;
  readonly message: string;
  readonly conversationId?: string;
}

export interface CompanionChatResponse {
  readonly message: {
    readonly id: string;
    readonly role: 'assistant';
    readonly content: string;
    readonly createdAt: string;
  };
  readonly conversationId: string;
}
