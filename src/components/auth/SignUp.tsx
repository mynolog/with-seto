import type { User } from '../../types/UserTypes.ts'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useAuthStore } from '../../stores/auth/store.ts'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm.tsx'
import OauthLoginButton from '../common/button/OauthLoginButton.tsx'
import CommonButton from '../common/button/CommonButton.tsx'
import CommonInput from '../common/input/CommonInput.tsx'

export default function SignUp() {
  const { form, handleFormChange } = useForm<User>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [validationError, setValidationError] = useState<string | null>(null)

  const { signUp } = useAuthStore()
  const navigate = useNavigate()

  const handleSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { name, email, password, passwordConfirm } = form
    e.preventDefault()
    if (password !== passwordConfirm) {
      setValidationError(
        '비밀번호가 일치하지 않습니다. 다시 확인 후 입력해주세요.',
      )
    }
    const userInfo = {
      name,
      email,
      password,
    }
    postSignUp(userInfo)
  }

  const postSignUp = async ({ name, email, password }: User) => {
    const result = await signUp(name, email, password)
    if (result) {
      navigate('/sign-in')
    }
  }
  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSignUpSubmit}
        className="w-2/4 flex flex-col px-24 gap-2 shadow-2xl rounded-xl"
      >
        <h1 className="flex items-center justify-center text-2xl font-bold my-10">
          회원가입
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
        <label htmlFor="name">
          <span>이름*</span>
        </label>
        <CommonInput
          name="name"
          value={form.name}
          onChange={handleFormChange}
          required={true}
        />

        <label htmlFor="email">
          <span>이메일*</span>
        </label>
        <CommonInput
          name="email"
          value={form.email}
          onChange={handleFormChange}
          type="email"
          required={true}
        />
        <label htmlFor="password">
          <span>비밀번호*</span>
        </label>
        <CommonInput
          name="password"
          value={form.password}
          onChange={handleFormChange}
          type="password"
          required={true}
        />
        <label htmlFor="passwordConfirm">
          <span> 비밀번호 재확인*</span>
        </label>
        <CommonInput
          name="passwordConfirm"
          value={form.passwordConfirm!}
          onChange={handleFormChange}
          type="password"
          required={true}
        />
        <CommonButton>가입하기</CommonButton>
        {validationError && <div>{validationError}</div>}
        <div>
          <span>이미 계정이 있으신가요? </span>
          <Link to="/sign-in">로그인 →</Link>
        </div>
      </form>
    </div>
  )
}
