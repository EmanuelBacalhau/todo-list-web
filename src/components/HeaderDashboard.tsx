import Image from "next/image";

import logoHome from '../../public/logo-home.svg'
import { CircleUserRound, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { destroyCookie } from "nookies";
import { TOKEN } from "@/variables-environment";
import { useRouter } from "next/navigation";

export function HeaderDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  function handleSignOut() {
    destroyCookie(null, TOKEN)
    router.push('/')
  }

  return (
    <div className="flex justify-between items-center bg-zinc-800 px-10 py-4">
      <Image src={logoHome} alt="logo-home" width={300}/>

      <div className="flex gap-3 items-center">
        <p className="text-gray-100 text-lg">{user.name}</p>
        <button onClick={handleSignOut} className="text-gray-100 hover:text-gray-200">
          <LogOut size={30}/>
        </button>
      </div>
    </div>
  )
}