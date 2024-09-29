import type { ChangeEvent } from 'react'
import { useState } from 'react'

export default function useForm<T>(initialValues: T) {
  const [form, setForm] = useState<T>(initialValues)

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
