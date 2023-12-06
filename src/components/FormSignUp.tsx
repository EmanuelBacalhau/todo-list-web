'use client'

import { FormEvent, useState } from "react"
import { InputAuth } from "./InputAuth"
import { ButtonAuth } from "./ButtonAuth"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export function FormSignUp () {
  const { signUp } = useAuth()
  const route = useRouter()


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [birthday, setBirthday] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    if (password != confirmPassword) {
      setLoading(false)
      return toast.error('As senhas não são iguais')
    }
    await signUp({name, email, password, birthday: new Date(birthday)})
    setLoading(false)
  }


  return (
    <form 
      className='flex flex-col gap-3 w-full'
      onSubmit={handleSubmit}
    >
      <InputAuth 
        type='text' 
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <InputAuth 
        type='email' 
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputAuth 
        type='password' 
        placeholder='Senha'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <InputAuth 
        type='password' 
        placeholder='Confirme sua senha'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <InputAuth 
        type='date' 
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        className="text-white"
        required
      />
      <ButtonAuth 
        title="CRIAR" 
        loading={loading} 
        disabled={loading}
      />
    </form>
  )

}