export const validateName = (value: string) => {
  const regex = /^[a-zA-Z가-힣]{2,}$/
  return {
    error: !regex.test(value),
    message: regex.test(value) ? '' : '이름은 최소 2자 이상 입력해주세요.',
  }
}

export const validateEmail = (value: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return {
    error: !regex.test(value),
    message: regex.test(value) ? '' : '이메일 형식에 맞게 입력해주세요.',
  }
}

export const validatePassword = (value: string) => {
  const regex = /^[a-zA-Z0-9]{8,15}$/
  return {
    error: !regex.test(value),
    message: regex.test(value)
      ? ''
      : '비밀번호는 8자 이상 ~ 15자 이하. 특수문자는 허용되지 않습니다.',
  }
}

export const validatePasswordConfirm = (
  value: string,
  confirmValue: string,
) => {
  const result = value === confirmValue
  return {
    error: !result,
    message: result ? '' : '비밀번호와 비밀번호 재확인이 일치하지 않습니다.',
  }
}
