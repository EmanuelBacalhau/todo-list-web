'use client'

import { api } from "@/services/api";
import { Trash2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLDivElement> & {
  id: string
  title: string
  description: string
  created_at: string
}

export function ListOfTask({id, title, description, created_at, ...props}: Props) {
  const date = new Date(created_at)
  const formatDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` 

  async function handleDeleteList() {
    await api.delete(`/lists/${id}`)
  }
  
  return (
    <div {...props} className={`bg-blue-600 p-5 rounded-md w-full hover:bg-blue-700 cursor-pointer`}>
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-gray-900 text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{title}</h1>
        
        <button className="text-gray-900 hover:text-red-500 transition-colors" onClick={handleDeleteList}>
          <Trash2 size={20} />
        </button>
      </div>

      <p className="mt-3 text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{description}</p>
      <p className="mt-3 text-gray-900/90 text-right text-sm">
        Criado em: {
          formatDate
        }
        </p>
    </div>
  )
}