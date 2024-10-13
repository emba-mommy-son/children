export interface FriendResponse {
  userId: number;
  name: string;
  profileImage: string;
  hasProblem: boolean;
}

export interface FriendRankResponse {
  userId: number;
  name: string;
  profileImage: string;
  score: number;
}
