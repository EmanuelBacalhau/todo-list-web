'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ListOfTask } from "./ListOfTask"
import { useAuth } from "@/hooks/use-auth"
import { api } from "@/services/api"

type ListData = {
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

type Props = {
  setOpenListModal: Dispatch<SetStateAction<ListData | null>>
}

export function ListAllLists({ setOpenListModal }: Props) {
  const { authenticated } = useAuth()

  const [lists, setLists] = useState<ListData[]>([])

  useEffect(() => {
    if(authenticated) {
      handleGetList()
    }
  }, [authenticated, lists])

  async function handleGetList() {
    const response = await api.get('/lists')

    setLists(response.data)
  }

  const allConcludes = lists.reduce((newValue, element) => {
    const tasks = element.tasks
    tasks.forEach((element)  => {
      if (element.status) {
        newValue = true
      } else {
        newValue = false
      }
    })

    return newValue
  }, false)

  const listGrid = 'mt-4 px-10 w-full grid gap-3 sm:grid-cols-3 md:grid-cols-4'

  return (
    <div className={lists.length ? listGrid : 'text-center w-full mt-10'}>
        {
          !lists.length ?
            <span className="text-gray-100 text-lg font-medium">
                Não foi encontrado nada por aqui! 😢
            </span>
          : 
          lists?.map((list) => (
            <ListOfTask
              key={list.id}
              id={list.id}
              title={list.name} 
              description={list.description}
              created_at={list.created_at}
              onClick={() => setOpenListModal(list)}
              allConcludes={allConcludes || lists.length === 0}
            />
          ))
        }
      </div>
  )
}