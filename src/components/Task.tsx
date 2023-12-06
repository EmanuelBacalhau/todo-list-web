import { api } from "@/services/api";
import { Check, Trash2, X } from "lucide-react";

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

  async function handleConcludeTask() {
    await api.put(`/tasks/${task.id}/conclude`)
  }

  async function handleUnCloseTask() {
    await api.patch(`/tasks/${task.id}/unClose`)
  }

  async function handleRemoveTask() {
    await api.delete(`/tasks/${task.id}`)
  }

  return (
    <div key={task.id} className={`${task.status ? 'bg-green-500' : 'bg-gray-200/40'} grid grid-cols-5 p-3 rounded-md mb-2`}>
      <span>{index + 1}</span>
      <span>{task.title}</span>
      <span className="px-1 whitespace-nowrap overflow-hidden text-ellipsis">{task.description}</span>
      <span>{task.status  || task.status ? 'Concluido' : 'Pendente'}</span>
      <div className="flex gap-10 justify-center">
        {
          task.status ? 
            <button onClick={handleUnCloseTask} className={'text-gray-950 hover:text-red-600 transition-colors'} >
              <X size={25} />
            </button>
          :
            <button 
              onClick={handleConcludeTask} 
              className={'text-gray-950 hover:text-green-600 transition-colors'}
            >
              <Check size={25} />
            </button>
        }

        <button 
          onClick={handleRemoveTask} 
          className={`${task.status ? 
            'text-gray-950 hover:text-red-600' 
            : 'text-gray-950 hover:text-red-600'} transition-colors`}
          >
          <Trash2 size={21} />
        </button>
      </div>
    </div>
  )
}