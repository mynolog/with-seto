import type { LoginUser } from '../types/UserTypes.ts'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth/store'
import useForm from '../hooks/useForm'
import CommonButton from './common/button/CommonButton.tsx'
import OauthLoginButton from './common/button/OauthLoginButton.tsx'

export default function SignIn() {
  const { form, handleFormChange } = useForm<LoginUser>({
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

  const handleSignInSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = form
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
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSignInSubmit}
        className="w-2/4 flex flex-col px-24 gap-3 shadow-2xl rounded-xl"
      >
        <h1 className="flex items-center justify-center text-2xl font-bold my-10">
          로그인
        </h1>
        <div className="w-full flex items-center justify-center gap-2">
          <OauthLoginButton
            provider="Google"
            fontSize="1.25rem"
            bgColor="#4284F3"
          />
          <OauthLoginButton
            provider="Kakao"
            fontSize="1.25rem"
            bgColor="#F6D503"
            textColor="black"
          />
        </div>
        <label htmlFor="email">
          <span>이메일</span>
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleFormChange}
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
          required
        />
        <label htmlFor="password">
          <span>비밀번호</span>
        </label>
        <input
          name="password"
          value={form.password}
          type="password"
          onChange={handleFormChange}
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
          required
        />
        <CommonButton>로그인</CommonButton>
        <div>
          <span>아직 계정이 없으신가요? </span>
          <Link to="/sign-up">가입하기 →</Link>
        </div>
      </form>
    </div>
  )
}
