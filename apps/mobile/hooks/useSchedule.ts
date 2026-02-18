import { useCallback, useState } from 'react';

import { getSchedules, createSchedule } from '@/lib/api-client';
import type { Schedule, ScheduleCreationData } from '@/types/schedule';

interface ScheduleState {
  readonly schedules: readonly Schedule[];
  readonly isLoading: boolean;
  readonly error: string | null;
}

const initialState: ScheduleState = {
  schedules: [],
  isLoading: false,
  error: null,
};

export function useSchedule() {
  const [state, setState] = useState<ScheduleState>(initialState);

  const loadSchedules = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const response = await getSchedules(1);

    if (response.success && response.data) {
      setState({
        schedules: response.data,
        isLoading: false,
        error: null,
      });
    } else {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: response.error ?? '일정을 불러오는데 실패했어요.',
      }));
    }
  }, []);

  const addSchedule = useCallback(
    async (data: ScheduleCreationData): Promise<boolean> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await createSchedule({
        userId: 1,
        title: data.title,
        date: data.date,
        time: data.time,
        reminderMinutes: data.reminderMinutes,
      });

      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          schedules: [...prev.schedules, response.data!],
          isLoading: false,
        }));
        return true;
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: response.error ?? '일정 등록에 실패했어요.',
      }));
      return false;
    },
    [],
  );

  return {
    schedules: state.schedules,
    isLoading: state.isLoading,
    error: state.error,
    loadSchedules,
    addSchedule,
  };
}
