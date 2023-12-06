import { useAuth } from "@/hooks/use-auth"

export function ProfileHeader() {
  const { user, authenticated } = useAuth()
  return (
    <div className="flex rounded-full bg-gray-400 w-10 h-10 items-center justify-center">
      <p className="uppercase font-medium">{authenticated && user.name[0]}</p>
      <p className="uppercase font-medium">{authenticated && user.name[1]}</p>
    </div>
  )
}