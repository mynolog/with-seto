export type User = {
  name?: string
  email: string
  password: string
  passwordConfirm?: string
  avatar?: string
  date?: Date
}

export type LoginUser = Pick<User, 'email' | 'password'>
