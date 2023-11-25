import { Loader2 } from "lucide-react"
import { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  title: string
  loading: boolean
}

export function ButtonAuth({ title, loading }: Props) {
  return (
    <button 
      className={`
        text-gray-50
        bg-blue-700 
        p-2 
        rounded-md
        font-bold
        text-base
        mt-7
        hover:bg-blue-800
        transition-colors
        flex items-center justify-center
        ${loading && 'cursor-not-allowed'}
      `}
    >
      {!loading ? title : (
        <Loader2 className="animate-spin"  />
      ) }
    </button>
  )
}