export interface Reward {
  id: number;
  type: RewardType;
  amount: number;
  createdAt: string;
}

// ! FIXME : 엔티티에 RUNNING밖에 없음 업데이트 되면 수정
export enum RewardType {
  RUNNING = 'RUNNING',
}
