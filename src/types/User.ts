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
  phoneNumber: string;
  profileImage: string;
  reward: number;
}
