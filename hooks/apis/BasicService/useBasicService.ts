import axios from '../../../axios.config'
import { useMutation, useQuery } from 'react-query'

const useBasicService = (name: string, uri: string) => {
  const getAll = () => {
    return axios.get(uri)
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

  const { data, refetch } = useQuery(name, getAll)
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
        onError: (err) => {
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

  return { data, onCreate, onUpdate, onDelete, refetch }
}

export default useBasicService
