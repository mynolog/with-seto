import type { ChangeEvent } from 'react'
import { useState } from 'react'

type InvalidError = {
  name: boolean
  email: boolean
  password: boolean
}

export default function useForm<T>(initialValues: T) {
  const [form, setForm] = useState<T>(initialValues)
  const [invalidErrors, setInvalidErrors] = useState<InvalidError>({
    name: false,
    email: false,
    password: false,
  })

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const reset = () => {
    setForm(initialValues)
  }

  return { form, handleFormChange, reset }
}
