import { ChangeEvent } from 'react'

type CommonInputProps = {
  name: string
  value: string
  type?: string
  required?: boolean
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function CommonInput({
  name,
  value,
  type = 'text',
  required = false,
  placeholder = '',
  onChange,
}: CommonInputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2 bg-[#EEEEEE] outline-none rounded-none"
    />
  )
}
