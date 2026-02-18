import { useCallback, useState } from 'react';

import type { ScheduleCreationData, ScheduleStep } from '@/types/schedule';

interface CreationState {
  readonly step: ScheduleStep;
  readonly data: Partial<ScheduleCreationData>;
}

const initialState: CreationState = {
  step: 'what',
  data: {},
};

export function useScheduleCreation() {
  const [state, setState] = useState<CreationState>(initialState);

  const setTitle = useCallback((title: string) => {
    setState((prev) => ({
      step: 'date',
      data: { ...prev.data, title },
    }));
  }, []);

  const setDate = useCallback((date: string) => {
    setState((prev) => ({
      step: 'time',
      data: { ...prev.data, date },
    }));
  }, []);

  const setTime = useCallback((time: string) => {
    setState((prev) => ({
      step: 'reminder',
      data: { ...prev.data, time },
    }));
  }, []);

  const setReminder = useCallback((reminderMinutes: number) => {
    setState((prev) => ({
      step: 'confirm',
      data: { ...prev.data, reminderMinutes },
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    step: state.step,
    data: state.data,
    setTitle,
    setDate,
    setTime,
    setReminder,
    reset,
  };
}
