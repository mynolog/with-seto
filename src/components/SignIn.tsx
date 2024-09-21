import type { User } from "../types/UserType";
import { useState } from "react";

export default function SignIn() {
  // const [email, setEmail] = useState<User | null>(null);

  return (
    <div>
      <form>
        <h1>로그인</h1>
        <label>
          <input placeholder="이메일" />
        </label>
        <label>
          <input type="password" placeholder="비밀번호" />
        </label>
        <button>로그인</button>
      </form>
    </div>
  );
}
