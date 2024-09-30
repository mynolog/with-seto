export const validateName = (value: string) => {
  const regex = /^[a-zA-Z가-힣]{2,}$/
  return regex.test(value)
}

export const validateEmail = (value: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(value)
}

export const validatePassword = (value: string) => {
  const regex = /^[a-zA-Z0-9]{8,15}$/
  return regex.test(value)
}
