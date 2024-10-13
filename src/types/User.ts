export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  id: number;
  username: string;
  name: string;
  phoneNumber: string;
  profileImage: string;
  reward: number;
}
