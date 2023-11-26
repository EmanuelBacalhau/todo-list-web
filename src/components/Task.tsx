import { api } from "@/services/api";
import { Check, Trash2, X } from "lucide-react";
import { tree } from "next/dist/build/templates/app-page";
import { useState } from "react";
import { CreateTaskModal } from "./CreateTaskModal";

type Task = {
  id: string,
  title: string,
  description: string,
  status: boolean
}

type Props = {
  task: Task,
  index: number
}

export function Task ({task, index}: Props) {
  const [conclude, setConclude] = useState<boolean>(false)

  async function handleConcludeTask() {
    setConclude(true)
    await api.put(`/tasks/${task.id}/conclude`)
  }

  async function handleRemoveTask() {
    await api.delete(`/tasks/${task.id}`)
  }

  return (
    <div key={task.id} className={`${task.status ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-200/40 hover:bg-gray-200/50'} grid grid-cols-5 p-3 rounded-md mb-2`}>
      <span>{index + 1}</span>
      <span>{task.title}</span>
      <span className="px-1 whitespace-nowrap overflow-hidden text-ellipsis">{task.description}</span>
      <span>{task.status  || conclude ? 'Concluido' : 'Pendente'}</span>
      <div className="flex gap-10 justify-center">
        <button disabled={conclude} className={`${task.status || conclude ? 'text-gray-950 hover:text-gray-700 cursor-not-allowed': 'text-green-500 hover:text-green-600'} transition-colors`} onClick={handleConcludeTask}>
          <Check size={25} />
        </button>
      
        <button onClick={handleRemoveTask} className={`${task.status || conclude ? 'text-gray-950 hover:text-red-600' : 'text-red-600 hover:text-red-700'}  transition-colors`}>
          <Trash2 size={21} />
        </button>
      </div>
    </div>
  )
}