import Image from 'next/image'

import logoAuth from '../../public/logo-auth.svg'
import { FormSignIn } from '@/components/FormSignIn'
import Link from 'next/link'

export default function Home() {



  return (
    <main className='flex items-center justify-center h-screen bg-zinc-900'>
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

        <FormSignIn />

        <Link 
          href={'signUp'}
          className='mt-5 text-gray-100 hover:text-gray-300 transition-colors'
        >
          Não possui uma conta? Registre-se
        </Link>
      </div>
    </main>
  )
}
