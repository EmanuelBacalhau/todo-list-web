'use client'

import { api } from '@/services/api'
import { setTokenStorage } from '@/storage/token-storage'
import { ReactNode, createContext } from 'react'

type SignInProps = {
  email: string
  password: string
}

type AuthContextProps = {
  signIn: (data: SignInProps) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {

  async function signIn({email, password}: SignInProps) {
    const response = await api.post('/auth', {email, password})
    setTokenStorage(response.data)
  }

  return (
    <AuthContext.Provider value={{ signIn }}>
      {
        children
      }
    </AuthContext.Provider>
  )
}