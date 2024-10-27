export interface Reward {
  id: number;
  type: RewardType;
  amount: number;
  createdAt: string;
}

export enum RewardType {
  RUNNING = 'RUNNING',
  ATTENDANCE = 'ATTENDANCE',
  STUDY = 'STUDY',
}
