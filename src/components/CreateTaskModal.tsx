import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FormCreateTask } from "./FormCreateTask";

type Props = {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  list_id: string
}

export function CreateTaskModal({ setOpenModal, list_id }: Props) {
  return (
    <div className="h-full w-full bg-slate-950/50 fixed left-0 top-0 flex items-center justify-center">
      <div className="w-[60%] bg-gray-50 items-center rounded-xl p-4">
        <div className="w-full flex justify-between items-center">
          <div></div>
          <h1 className="text-2xl font-bold text-gray-800">NOVA TASK</h1>
          <button className="text-gray-800 hover:text-red-500 transition-colors" onClick={() => setOpenModal(false)}>
            <X size={30} />
          </button>
        </div>

        <FormCreateTask setOpenModal={setOpenModal} list_id={list_id} />
      </div>
  </div>
  )
}