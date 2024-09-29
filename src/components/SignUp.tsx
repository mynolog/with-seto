import type { User } from '../types/UserType'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useAuthStore } from '../stores/auth/store'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import useForm from '../hooks/useForm'

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
        '비밀번호가 일치하지 않습니다. 다시 확인 후 입력해주세요.'
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
        <button className="py-4 rounded-full text-white text-xl bg-[#4284F3] outline-none border-none">
          <FontAwesomeIcon icon={faGoogle} />
          <span> Google 계정으로 가입하기</span>
        </button>
        <button className="mb-10 py-4 rounded-full text-black text-xl bg-[#F6D503] outline-none border-none">
          <FontAwesomeIcon icon={faComment} />
          <span> Kakao 계정으로 가입하기</span>
        </button>
        <label htmlFor="name">
          <span>이름*</span>
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleFormChange}
          required
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
        />
        <label htmlFor="email">
          <span>이메일*</span>
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleFormChange}
          required
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
        />
        <label htmlFor="password">
          <span>비밀번호*</span>
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleFormChange}
          className="p-2 bg-[#EEEEEE] outline-none rounded-none"
        />
        <label htmlFor="passwordConfirm">
          <span> 비밀번호 재확인*</span>
        </label>
        <input
          type="password"
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={handleFormChange}
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
  )
}
