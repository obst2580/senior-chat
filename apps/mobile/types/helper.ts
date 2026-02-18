export interface PhotoAnalysisRequest {
  readonly userId: number;
  readonly imageBase64: string;
  readonly question?: string;
}

export interface PhotoAnalysisResponse {
  readonly analysisId: string;
  readonly result: string;
  readonly createdAt: string;
}

export interface HelperState {
  readonly photoUri: string | null;
  readonly isAnalyzing: boolean;
  readonly result: PhotoAnalysisResponse | null;
  readonly error: string | null;
}
