import { LogOut } from "lucide-react"

type Props = {
  handleSignOut: () => void
}

export function FunctionsModal({ handleSignOut }: Props) {
  return (
    <div className="fixed right-0 top-12 mt-3 mr-10 bg-gray-50 p-2 w-24 flex flex-col gap-2 rounded-md">
      
      <button onClick={handleSignOut} className="flex justify-between items-center text-gray-950 hover:text-gray-700 w-full">
        Sair
        <LogOut size={20} />
      </button>
    </div>
  )
}