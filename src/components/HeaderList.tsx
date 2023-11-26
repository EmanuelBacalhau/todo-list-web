'use client'

import { ListData, ListDetails } from "@/app/dashboard/page";
import { ChevronLeft, PlusCircle, Trash, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { CreateTaskModal } from "./CreateTaskModal";
import { api } from "@/services/api";

type Props = {
  setOpenListModal: Dispatch<SetStateAction<ListData | null>>,
  openListModal: ListData | null,
  listSelected: ListDetails | undefined
}

export function HeaderList ({ openListModal, setOpenListModal, listSelected }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false)

  

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <button
          className="text-gray-100 hover:text-gray-300 transition-colors"
          onClick={() => setOpenListModal(null)}
        >
          <ChevronLeft size={30}/>
        </button>

        <h1 className="text-gray-200 text-xl">
          {
            openListModal?.name
          }
        </h1>

        <button onClick={() => setOpenModal(true)} className="text-gray-100 hover:text-green-500">
          <PlusCircle />
        </button>
          
              
      </div>
      <div className="text-center">
        {
          !listSelected?.tasks.length ? 
            <span className="text-center text-gray-50" >Não foi encontrado nada por aqui!😥</span> 
          : 
            (
              <div className="grid grid-cols-5 mb-5 px-3 text-left">
                <span></span>
                <span className="text-gray-100 text-base uppercase font-medium">Título</span>
                <span className="text-gray-100 text-base uppercase font-medium px-1">Descrição</span>
                <span className="text-gray-100 text-base uppercase font-medium">Status</span>
                <span className="text-gray-100 text-base uppercase font-medium text-center">Opções</span>
              </div>
            )
        }
      </div>
      {
        openModal && <CreateTaskModal setOpenModal={setOpenModal} list_id={openListModal!.id} />
      }
    </div>
  )
}