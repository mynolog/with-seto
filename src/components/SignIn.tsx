import type { LoginUser, SignInResponse } from "../types/UserType";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isLoginSelector, TokenAtom } from "../recoil/TokenAtom";
import api from "../apis/interceptor";

export default function SignIn() {
  const [input, setInput] = useState<LoginUser>({
    email: "",
    password: "",
  });
  const setAccessToken = useSetRecoilState(TokenAtom);
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginSelector);

  useEffect(() => {
    if (isLogin) {
      return;
    } else {
      navigate("/sign-in");
    }
  }, [isLogin, navigate]);

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
      const response = await api.post<SignInResponse>("/users/signin", {
        email,
        password,
      });
      setAccessToken(response.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSignInSubmit}
        className="w-2/4 flex flex-col px-24 gap-2 shadow-2xl rounded-xl"
      >
        <h1 className="flex items-center justify-center text-2xl font-bold my-10">
          로그인
        </h1>
        <label htmlFor="email">
          <span>이메일</span>
        </label>
        <input
          name="email"
          value={input.email}
          onChange={handleChangeInput}
          placeholder="abc@na.com"
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
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
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
        />
        <button className="mx-24 my-10 py-4 rounded-full text-white text-xl bg-[#AABFB2] outline-none border-none">
          로그인
        </button>
        <div>
          <span>아직 계정이 없으신가요? </span>
          <Link to="/sign-up">가입하기 →</Link>
        </div>
      </form>
    </div>
  );
}
