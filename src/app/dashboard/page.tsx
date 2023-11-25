'use client'

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { HeaderDashboard } from "@/components/HeaderDashboard";
import { ListAllLists } from "@/components/ListAllLists";
import { CreateListModal } from "@/components/CreateListModal";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className='min-h-screen bg-zinc-900'>
      <HeaderDashboard />

      <div className='w-full flex justify-end px-10 mt-4'>
        <button 
          className='
            flex gap-1 text-gray-100 
            p-1 rounded-md items-center 
            bg-green-500 text-base
            hover:bg-green-600 transition-colors
            hover:text-gray-200
          '
          onClick={() => setOpenModal(true)}
        >
          <Plus size={20}/>
          ADD
        </button>
      </div>

      <ListAllLists />

      {
        openModal && (
         <CreateListModal setOpenModal={setOpenModal} />
        )
      }
      
    </div>
  )
}