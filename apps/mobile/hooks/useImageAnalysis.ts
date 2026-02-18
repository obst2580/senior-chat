import { useCallback, useState } from 'react';

import { analyzePhoto } from '@/lib/api-client';
import type { PhotoAnalysisResponse } from '@/types/helper';

export function useImageAnalysis() {
  const [result, setResult] = useState<PhotoAnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(
    async (imageBase64: string, question?: string) => {
      setIsAnalyzing(true);
      setError(null);

      const response = await analyzePhoto({
        userId: 1,
        imageBase64,
        question,
      });

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(
          response.error ?? '사진 분석에 실패했어요. 다시 시도해주세요.',
        );
      }

      setIsAnalyzing(false);
    },
    [],
  );

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    result,
    isAnalyzing,
    error,
    analyze,
    clearResult,
  };
}
