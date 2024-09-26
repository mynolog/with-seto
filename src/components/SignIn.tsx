import type { LoginUser } from '../types/UserType'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'

export default function SignIn() {
  const [input, setInput] = useState<LoginUser>({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const { signIn } = useAuthStore()

  // useEffect(() => {
  //   if (isLogin) {
  //     return
  //   } else {
  //     navigate('/sign-in')
  //   }
  // }, [isLogin, navigate])

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSignInSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = input
    const userInfo = {
      email,
      password,
    }
    postSignIn(userInfo)
  }

  const postSignIn = async ({ email, password }: LoginUser) => {
    const result = await signIn(email, password)
    if (result) {
      navigate('/my-page')
    }
  }

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSignInSubmit}
        className="w-2/4 flex flex-col px-24 gap-2 shadow-2xl rounded-xl"
      >
        <h1 className="flex items-center justify-center text-2xl font-bold my-10">
          로그인
        </h1>
        <button className="py-4 rounded-full text-white text-xl bg-[#4284F3] outline-none border-none">
          <FontAwesomeIcon icon={faGoogle} />
          <span> Google 로그인</span>
        </button>
        <button className="mb-10 py-4 rounded-full text-black text-xl bg-[#F6D503] outline-none border-none">
          <FontAwesomeIcon icon={faComment} />
          <span> Kakao 로그인</span>
        </button>
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
  )
}
