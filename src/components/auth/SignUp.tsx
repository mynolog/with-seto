import type { User } from '../../types/UserTypes.ts'
import type { FormEvent } from 'react'
// import { useState } from 'react'
import { useAuthStore } from '../../stores/auth/store.ts'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm.tsx'
import OauthLoginButton from '../common/button/OauthLoginButton.tsx'
import CommonButton from '../common/button/CommonButton.tsx'
import CommonInput from '../common/input/CommonInput.tsx'
import LoginHr from '../common/hr/LoginHr.tsx'

export default function SignUp() {
  const { form, handleFormChange, invalidErrors } = useForm({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  // const [validationError, setValidationError] = useState<string | null>(null)

  const { signUp } = useAuthStore()
  const navigate = useNavigate()

  const handleSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { name, email, password } = form
    e.preventDefault()
    // if (password !== passwordConfirm) {
    //   setValidationError(
    //     '비밀번호가 일치하지 않습니다. 다시 확인 후 입력해주세요.',
    //   )
    // }
    const userInfo = {
      name,
      email,
      password,
    }
    postSignUp(userInfo)
  }

  const postSignUp = async ({ name, email, password }: User) => {
    if (invalidErrors.name) {
      console.error(invalidErrors.name.message)
      return
    }
    if (invalidErrors.email) {
      console.error(invalidErrors.email.message)
      return
    }
    if (invalidErrors.password) {
      console.error(invalidErrors.password.message)
      return
    }
    if (invalidErrors.passwordConfirm) {
      console.error(invalidErrors.passwordConfirm.message)
      return
    }
    //TODO: 타입 단언 없이 하는 방법 고민
    const result = await signUp(name!, email, password)
    if (result) {
      navigate('/sign-in')
    }
  }
  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSignUpSubmit}
        className="w-2/4 flex flex-col px-24 gap-3 shadow-2xl rounded-xl"
      >
        <h1 className="flex items-center justify-center text-2xl font-bold my-7">
          회원가입
        </h1>
        <label htmlFor="name">
          <span>이름* </span>
          {invalidErrors.name && (
            <span className="text-red-500 text-xs font-bold">
              {invalidErrors.name.message}
            </span>
          )}
        </label>
        <CommonInput
          name="name"
          value={form.name!}
          onChange={handleFormChange}
          type="text"
        />
        <label htmlFor="email">
          <span>이메일* </span>
          {invalidErrors.email && (
            <span className="text-red-500 text-xs font-bold">
              {invalidErrors.email.message}
            </span>
          )}
        </label>
        <CommonInput
          name="email"
          value={form.email}
          onChange={handleFormChange}
          type="text"
        />
        <label htmlFor="password">
          <span>비밀번호* </span>
          {invalidErrors.password && (
            <span className="text-red-500 text-xs font-bold">
              {invalidErrors.password.message}
            </span>
          )}
        </label>
        <CommonInput
          name="password"
          value={form.password}
          onChange={handleFormChange}
          type="password"
        />
        <label htmlFor="passwordConfirm">
          <span> 비밀번호 재확인* </span>
          {invalidErrors.passwordConfirm && (
            <span className="text-red-500 text-xs font-bold">
              {invalidErrors.passwordConfirm.message}
            </span>
          )}
        </label>
        <CommonInput
          name="passwordConfirm"
          value={form.passwordConfirm!}
          onChange={handleFormChange}
          type="password"
        />
        <CommonButton>가입하기</CommonButton>
        <LoginHr />
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
        {/*{validationError && <div>{validationError}</div>}*/}
        <div className="mb-7">
          <span>이미 계정이 있으신가요? </span>
          <Link to="/sign-in" className="text-blue-600 font-bold">
            로그인 →
          </Link>
        </div>
      </form>
    </div>
  )
}
