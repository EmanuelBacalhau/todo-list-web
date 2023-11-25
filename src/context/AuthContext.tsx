'use client'

import { api } from '@/services/api'
import { setTokenStorage } from '@/storage/token-storage'
import { AppError } from '@/utils/app-error'
import { ReactNode, createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'

type SignInProps = {
  email: string
  password: string
}

type SignUpProps = {
  name: string
  email: string
  password: string
  birthday: Date
}

type AuthContextProps = {
  signIn: (data: SignInProps) => Promise<void>
  signUp: (data: SignUpProps) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {

  async function signIn({email, password}: SignInProps) {
    try {
      const response = await api.post('/auth', {email, password})
      setTokenStorage(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'
      toast.error(message)      
    }
  }

  async function signUp({name, email, password, birthday}: SignUpProps) {
    try {
      await api.post('/users/register', {email, password, name, birthday})
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'
      toast.error(message)      
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp }}>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        theme='dark'
      />
      {
        children
      }
    </AuthContext.Provider>
  )
}