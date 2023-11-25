'use client'

import { FormEvent, useState } from "react"
import { InputAuth } from "./InputAuth"
import { ButtonAuth } from "./ButtonAuth"
import { api } from "@/services/api"
import { setTokenStorage } from "@/storage/token-storage"
import { useAuth } from "@/hooks/use-auth"

export function FormSignIn () {
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

    async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    signIn({email, password})
    setLoading(false)
  }


  return (
    <form 
      className='flex flex-col gap-3 w-full'
      onSubmit={handleSubmit}
    >
      <InputAuth 
        type='email' 
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputAuth 
        type='password' 
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonAuth 
        title="ENTRAR" 
        loading={loading} 
        disabled={loading}
      />
    </form>
  )

}