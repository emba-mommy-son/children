export interface Reward {
  id: number;
  //! FIXME : type 뭐뭐있는지 받아서 enum으로 설정하기
  type: 'RUNNING';
  amount: number;
  createdAt: string;
}
