import type { User } from '../types/UserTypes.ts'
import type { InvalidError } from '../types/ErrorTypes.ts'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '../utils/validator/userValidator.ts'

export default function useForm(initialValues: User) {
  const [form, setForm] = useState<User>(initialValues)
  const [invalidErrors, setInvalidErrors] = useState<InvalidError>({
    name: {
      message: '',
      error: false,
    },
    email: {
      message: '',
      error: false,
    },
    password: {
      message: '',
      error: false,
    },
    passwordConfirm: {
      message: '',
      error: false,
    },
  })

  const reset = () => {
    setForm(initialValues)
    setInvalidErrors({
      name: { message: '', error: false },
      email: { message: '', error: false },
      password: { message: '', error: false },
    })
  }

  const validator = (name: string, value: string) => {
    const errors: InvalidError = { ...invalidErrors }
    if (value === '') {
      reset()
    }
    if (name === 'email') {
      const { error, message } = validateName(value)
      errors.name.error = error
      errors.name.message = message
    }
    if (name === 'email') {
      const { error, message } = validateEmail(value)
      errors.email.error = error
      errors.email.message = message
    }
    if (name === 'password') {
      const { error, message } = validatePassword(value)
      errors.password.error = error
      errors.password.message = message
    }
    if (name === 'passwordConfirm') {
      const passwordValue = form.password
      const { error, message } = validatePasswordConfirm(passwordValue, value)
      //TODO: 타입 단언 없이 하는 방법 고민
      errors.passwordConfirm!.error = error
      errors.passwordConfirm!.message = message
    }
    setInvalidErrors(errors)
  }

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    validator(name, value)
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return { form, handleFormChange, reset, invalidErrors }
}
