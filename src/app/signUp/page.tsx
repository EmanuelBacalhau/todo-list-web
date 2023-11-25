import Image from 'next/image'

import logoAuth from '../../../public/logo-auth.svg'
import Link from 'next/link'
import { FormSignUp } from '@/components/FormSignUp'

export default function SignUp() {
  return (
    <main className='flex items-center justify-center min-h-screen bg-zinc-900'>
      <div 
        className='
          border border-gray-100 rounded-lg
          w-[500px] 
          flex items-center flex-col
          p-14
        '
      >
        <Image 
          src={logoAuth} 
          alt='logo-auth'
          width={250}
          className='mb-7'
        />

        <FormSignUp />

        <Link 
          href={'/'}
          className='mt-5 text-gray-100 hover:text-gray-300 transition-colors'
        >
          Já possui uma conta? Acesse
        </Link>
      </div>
    </main>
  )
}
