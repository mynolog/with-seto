import type { LoginUser } from "../types/UserType";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import api from "../apis/interceptor";

export default function SignIn() {
  const [input, setInput] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignInSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { email, password } = input;
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };
    postSignIn(userInfo);
  };

  const postSignIn = async ({ email, password }: LoginUser) => {
    try {
      const response = await api.post("/users/signin", {
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSignInSubmit}>
        <h1>로그인</h1>
        <label htmlFor="email">
          <span>이메일</span>
        </label>
        <input
          name="email"
          value={input.email}
          onChange={handleChangeInput}
          placeholder="abc@na.com"
        />
        <label htmlFor="password">
          <span>비밀번호</span>
        </label>
        <input
          name="password"
          value={input.password}
          type="password"
          placeholder="비밀번호"
          onChange={handleChangeInput}
        />
        <button>로그인</button>
      </form>
    </div>
  );
}
