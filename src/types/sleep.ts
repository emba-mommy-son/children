export interface SleepData {
  id: string;
  startDate: Date;
  endDate: Date;
  value: string; // INBED | ASLEEP | AWAKE 일수도?
  isSynced: boolean;
  syncAttempts: number;
  lastSyncAttempt?: Date;
}

export interface HealthServiceError {
  code: string;
  message: string;
}

export interface SleepSyncInfo {
  lasySyncTime: string;
  status: 'success' | 'failed';
}
