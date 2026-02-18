export interface Schedule {
  readonly id: string;
  readonly userId: number;
  readonly title: string;
  readonly date: string;
  readonly time: string;
  readonly reminderMinutes: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ScheduleCreationData {
  readonly title: string;
  readonly date: string;
  readonly time: string;
  readonly reminderMinutes: number;
}

export interface CreateScheduleRequest {
  readonly userId: number;
  readonly title: string;
  readonly date: string;
  readonly time: string;
  readonly reminderMinutes: number;
}

export type ScheduleStep = 'what' | 'date' | 'time' | 'reminder' | 'confirm';
