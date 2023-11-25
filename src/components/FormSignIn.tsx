'use client'

import { FormEvent, useState } from "react"
import { InputAuth } from "./InputAuth"
import { ButtonAuth } from "./ButtonAuth"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export function FormSignIn () {
  const { signIn } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    await signIn({email, password})
    setLoading(false)
    router.push('/dashboard')
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
        required
      />
      <InputAuth 
        type='password' 
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <ButtonAuth 
        title="ENTRAR" 
        loading={loading} 
        disabled={loading}
      />
    </form>
  )

}