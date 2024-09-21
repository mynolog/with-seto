import type { User } from "../types/UserType";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "../apis/interceptor";

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
    <div>
      <form onSubmit={handleSignUpSubmit}>
        <h1>회원가입</h1>
        <label htmlFor="name">
          <span>이름</span>
        </label>
        <input
          name="name"
          value={input.name}
          onChange={handleChangeInput}
          required
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
        />
        <label htmlFor="password">
          <span>비밀번호</span>
        </label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChangeInput}
        />
        <label htmlFor="passwordConfirm">
          <span> 비밀번호 재확인</span>
        </label>
        <input
          type="password"
          name="passwordConfirm"
          value={input.passwordConfirm}
          onChange={handleChangeInput}
        />
        <button>가입하기</button>
        {validationError && <div>{validationError}</div>}
      </form>
    </div>
  );
}

/* 

name: String, required
email: String, required
password: String, required
avatar: String
date: Date

*/
