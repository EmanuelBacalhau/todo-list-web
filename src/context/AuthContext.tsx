'use client'

import { api } from '@/services/api'
import { setTokenStorage, verifyTokenStorage } from '@/storage/token-storage'
import { AppError } from '@/utils/app-error'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useEffect, useState } from 'react'
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

type UserData = {
  name: string
}

type AuthContextProps = {
  signIn: (data: SignInProps) => Promise<void>
  signUp: (data: SignUpProps) => Promise<void>
  authenticated: boolean
  user: UserData
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()

  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<UserData>({} as UserData)

  useEffect(() => {
    checkAuthentication()    
  }, [])

  async function checkAuthentication() {
    const token = verifyTokenStorage()

    if (!token)  {
      return router.push('/')
    }
    
    api.defaults.headers.common.Authorization = token
    await getDataUser()
    setAuthenticated(true)
    router.push('/dashboard')
  }

  async function getDataUser() {
    const response = await api.get('/users')
    setUser(response.data)
  }

  async function signIn({email, password}: SignInProps) {
    try {
      const response = await api.post('/auth', {email, password})
      api.defaults.headers.common.Authorization = `Bearer ${response.data}`
      setTokenStorage(`Bearer ${response.data}`)
      await getDataUser()
      setAuthenticated(true)
      router.push('/dashboard')
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'
      toast.error(message)      
    }
  }

  async function signUp({name, email, password, birthday}: SignUpProps) {
    try {
      await api.post('/users/register', {email, password, name, birthday})
      router.push('/')
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Internal server error'
      toast.error(message)      
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, authenticated, user }}>
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