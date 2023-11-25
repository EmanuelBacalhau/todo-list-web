'use client'

import { api } from '@/services/api'
import { setTokenStorage, verifyTokenStorage } from '@/storage/token-storage'
import { AppError } from '@/utils/app-error'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useEffect } from 'react'
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

  const router = useRouter()

  useEffect(() => {
    checkAuthentication()    
  }, [])

  function checkAuthentication() {
    const {exists, token} = verifyTokenStorage()
    if (exists)  {
      updateToken(token)
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  function updateToken(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  async function signIn({email, password}: SignInProps) {
    try {
      const response = await api.post('/auth', {email, password})
      updateToken(response.data)
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