import { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement>


export function InputAuth({...props}: Props) {
  return (
    <input 
      {...props}
      className='
        text-gray-50
          p-2
          bg-transparent 
          outline-none 
          border-b focus:border-blue-700
          transition-colors
      ' 
    />
  )
}