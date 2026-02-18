import { useCallback, useState } from 'react';

import {
  getCompanionProfile,
  updateCompanionProfile,
} from '@/lib/api-client';
import type {
  CompanionProfile,
  CompanionProfileRequest,
} from '@/types/companion';

export function useCompanion() {
  const [profile, setProfile] = useState<CompanionProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getCompanionProfile(1);

      if (response.success && response.data) {
        setProfile(response.data);
      } else {
        setError(response.error ?? '프로필을 불러올 수 없어요.');
      }
    } catch {
      setError('서버에 연결할 수 없어요.');
    }

    setIsLoading(false);
  }, []);

  const saveProfile = useCallback(
    async (data: CompanionProfileRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await updateCompanionProfile(1, data);

        if (response.success && response.data) {
          setProfile(response.data);
        } else {
          setError(response.error ?? '프로필 저장에 실패했어요.');
        }
      } catch {
        setError('서버에 연결할 수 없어요.');
      }

      setIsLoading(false);
    },
    [],
  );

  return {
    profile,
    isLoading,
    error,
    loadProfile,
    saveProfile,
  };
}
