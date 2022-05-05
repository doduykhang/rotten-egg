import axios from '../../../axios.config'
import { useMutation, useQuery } from 'react-query'
import { useState } from 'react'

const useMovieService = (name: string, uri: string) => {
  const [page, setPage] = useState(0)

  const getAll = (page: number) => {
    return axios.get(uri, { params: { page } })
  }

  const createApi = (data: any) => {
    return axios.post(uri, data)
  }

  const updateApi = (data: any) => {
    return axios.put(uri, data)
  }

  const deleteApi = (data: any) => {
    return axios.delete(`${uri}/${data.id}`)
  }

  const { data, refetch } = useQuery([name, page], () => getAll(page))
  const { mutate: create } = useMutation('create' + name, createApi, {
    onSuccess: () => {
      refetch()
    },
  })

  const { mutate: update } = useMutation('update' + name, updateApi, {
    onSuccess: () => {
      refetch()
    },
  })

  const { mutate: deletee } = useMutation('delete' + name, deleteApi, {
    onSuccess: () => {
      // refetch()
    },
  })

  const onCreate = (data: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      create(data, {
        onSuccess: () => {
          refetch()
          resolve('Created')
        },
        onError: () => {
          reject('Error')
        },
      })
    })
  }

  const onUpdate = (data: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      update(data, {
        onSuccess: () => {
          refetch()
          resolve('Updated')
        },
        onError: () => {
          reject('Error')
        },
      })
    })
  }

  const onDelete = (data: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      deletee(data, {
        onSuccess: () => {
          refetch()
          resolve('Deleted')
        },
        onError: (err: any) => {
          reject(err.response.data.message)
        },
      })
    })
  }

  const nextPage = () => {
    setPage((old) => old + 1)
  }

  const previousPage = () => {
    if (page > 0) setPage((old) => old - 1)
  }

  return { data, onCreate, onUpdate, onDelete, refetch, nextPage, previousPage }
}

export default useMovieService
