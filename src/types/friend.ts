export interface Friend {
  userId: number;
  name: string;
  profileImage: string;
  hasProblem: boolean;
}

export interface FriendDetail {
  userId: number;
  name: string;
  profileImage: string;
  roomId: number;
  friend: boolean;
}

export interface FriendRank {
  userId: number;
  name: string;
  profileImage: string;
  score: number;
}
