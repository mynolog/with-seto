import { create } from 'zustand'

type UserState = {
  email: string | null
  name: string | null
  avatar: string | null
}

export const userStore = create<UserState>(() => ({
  email: null,
  name: null,
  avatar: null,
}))
