import { api } from "@/services/api"
import { Loader2 } from "lucide-react"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

type Props = {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export function FormCreateList({setOpenModal}: Props ) {
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  

  async function handleCreateList(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    await api.post('/lists/register', {name, description})
    setOpenModal(false)
    setLoading(false)

    setName('')
    setDescription('')
  }

  return (
    <form className="px-3 mt-5 gap-3 flex flex-col" onSubmit={handleCreateList}>
      <div className="flex flex-col">
        <label className="text-gray-800 font-medium">
          Nome
        </label>
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            text-gray-800
            border border-gray-400
            rounded-md 
            focus:outline-blue-500
            p-2
          " 
          type="text" 
          placeholder="Nome da sua lista"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-800 font-medium">
          Descrição
        </label>
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            text-gray-800
            border border-gray-400
            rounded-md 
            focus:outline-blue-500
            p-2 h-[170px] 
            min-h-[170px]
            max-h-[170px]
          "
          placeholder="Descrição sobre sua lista de atividades..."
          required
        />
    </div>

    <button 
      type="submit"
      className="
        mt-2
        p-2 bg-green-500 
        hover:bg-green-600
        w-full 
        rounded-md font-bold 
        text-gray-800 
        uppercase
        transition-colors
        flex items-center justify-center
      "
      disabled={loading}
    >
      {
        !loading ?
        'CRIAR'
        : (
          <Loader2 className="animate-spin"/>
        )
      }
    </button>
    </form>
  )
}