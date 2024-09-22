import type { User } from "../types/UserType";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "../apis/interceptor";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [input, setInput] = useState<User>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValidationError("");
  };

  const handleSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { name, email, password, passwordConfirm } = input;
    e.preventDefault();
    if (password !== passwordConfirm) {
      setValidationError(
        "비밀번호가 일치하지 않습니다. 다시 확인 후 입력해주세요."
      );
    }
    const userInfo = {
      name,
      email,
      password,
    };
    postSignUp(userInfo);
  };

  const postSignUp = async ({ name, email, password }: User) => {
    try {
      const response = await api.post("/users/signup", {
        name,
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
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSignUpSubmit}
        className="w-2/4 flex flex-col px-24 gap-2 shadow-2xl rounded-xl"
      >
        <h1 className="flex items-center justify-center text-2xl font-bold my-10">
          회원가입
        </h1>
        <label htmlFor="name">
          <span>이름</span>
        </label>
        <input
          name="name"
          value={input.name}
          onChange={handleChangeInput}
          required
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
        />
        <label htmlFor="email">
          <span>이메일</span>
        </label>
        <input
          name="email"
          value={input.email}
          onChange={handleChangeInput}
          placeholder="abc@na.com"
          required
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
        />
        <label htmlFor="password">
          <span>비밀번호</span>
        </label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChangeInput}
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
        />
        <label htmlFor="passwordConfirm">
          <span> 비밀번호 재확인</span>
        </label>
        <input
          type="password"
          name="passwordConfirm"
          value={input.passwordConfirm}
          onChange={handleChangeInput}
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
        />
        <button className="mx-24 my-10 py-4 rounded-full text-white text-xl bg-[#AABFB2] outline-none border-none">
          가입하기
        </button>
        {validationError && <div>{validationError}</div>}
        <div>
          <span>이미 계정이 있으신가요? </span>
          <Link to="/sign-in">로그인 →</Link>
        </div>
      </form>
    </div>
  );
}
