export type CommonError = {
  message: string
  error: boolean
}

export type InvalidError = {
  name: CommonError
  email: CommonError
  password: CommonError
  passwordConfirm?: CommonError
}
