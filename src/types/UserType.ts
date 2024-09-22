export type User = {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  avatar?: string;
  date?: Date;
};

export type LoginUser = Pick<User, "email" | "password">;

export type SignInResponse = {
  message: string;
  data: {
    avatar: string;
    date: Date;
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};
