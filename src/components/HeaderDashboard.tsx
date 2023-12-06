import Image from "next/image";

import logoHome from '../../public/logo-home.svg'
import { useAuth } from "@/hooks/use-auth";
import { destroyCookie } from "nookies";
import { TOKEN } from "@/variables-environment";
import { useRouter } from "next/navigation";
import { ProfileHeader } from "./ProfileHeader";
import { useState } from "react";
import { FunctionsModal } from "./FunctionModal";

export function HeaderDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [openModal, setOpenModal] = useState<boolean>(false)

  function handleSignOut() {
    destroyCookie(null, TOKEN)
    router.push('/')
  }

  return (
    <div>
      <div className="flex justify-between items-center bg-zinc-800 px-10 py-4">
        <Image src={logoHome} alt="logo-home" width={300}/>

        <div className="flex gap-3 items-center">
          <h1 className="text-lg text-gray-50">{user.name}</h1>
          <button onClick={() => setOpenModal(!openModal)}>
            <ProfileHeader />
          </button>
        </div>
      </div>

      {
        openModal && 
        <FunctionsModal handleSignOut={handleSignOut} />
      }
    </div>
  )
}