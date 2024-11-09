export interface SignInRequest {
  username: string;
  password: string;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  username: string;
  name: string;
  fcmToken: string;
  phoneNumber: string;
  profileImage: string;
  reward: number;
  rewardImage: string;
}

export interface FriendInfo {
  id: number;
  username: string;
  name: string;
  phoneNumber: string;
  profileImage: string;
  friend: boolean;
}
