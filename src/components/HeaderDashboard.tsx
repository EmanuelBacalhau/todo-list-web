import Image from "next/image";

import logoHome from '../../public/logo-home.svg'
import { CircleUserRound } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function HeaderDashboard() {
  const { user } = useAuth()

  return (
    <div className="flex justify-between items-center bg-zinc-800 px-10 py-4">
      <Image src={logoHome} alt="logo-home" width={300}/>

      <div className="flex gap-3 items-center">
        <p className="text-gray-100 text-lg">{user.name}</p>
        <CircleUserRound className="text-gray-100" size={30}/>
      </div>
    </div>
  )
}