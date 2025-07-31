export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    birthdayDate: Date;
    height: number;
    gender: string;
  };
}