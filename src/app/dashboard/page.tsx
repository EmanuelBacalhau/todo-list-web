'use client'

import { Check, ChevronLeft, Plus, PlusCircle, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { HeaderDashboard } from "@/components/HeaderDashboard";
import { ListAllLists } from "@/components/ListAllLists";
import { CreateListModal } from "@/components/CreateListModal";
import { api } from "@/services/api";
import { Task } from "@/components/Task";
import { HeaderList } from "@/components/HeaderList";

export type ListData = {
  id: string
  name: string
  description: string
  created_at: string
  tasks: [
    {
      status: boolean
    }
  ]
}

export type ListDetails = {
  list: ListData,
  tasks: [{
    id: string,
    title: string,
    description: string,
    status: boolean
  }]
}

export default function Dashboard() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openListModal, setOpenListModal] = useState<ListData | null>(null)
  const [listSelected, setListSelected] = useState<ListDetails>()

  useEffect(() => {
    if (openListModal) {
      getListData()
    }
  }, [openListModal, listSelected])

  async function getListData() {
    const response = await api.get(`/lists/${openListModal?.id}`)
    setListSelected(response.data)
  }


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

      <ListAllLists setOpenListModal={setOpenListModal} />

      {
        openModal && (
         <CreateListModal setOpenModal={setOpenModal} />
        )
      }
      
      {
        openListModal && (
          <div className="w-full h-full fixed bg-zinc-900 top-0 left-0 px-8 py-4">
            <HeaderList listSelected={listSelected} openListModal={openListModal} setOpenListModal={setOpenListModal} />
            {
              <div>
                {
                  listSelected?.tasks?.map((task, index) => (
                    <Task key={task.id} task={task} index={index}/>
                  ))
                }
              </div>
            }
          </div>
        )
      }
    </div>
  )
}