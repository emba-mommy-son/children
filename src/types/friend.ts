export interface Friend {
  userId: number;
  name: string;
  profileImage: string;
  hasProblem: boolean;
}

export interface FriendRank {
  userId: number;
  name: string;
  profileImage: string;
  score: number;
}
