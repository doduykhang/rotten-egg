import axios from '../../../axios.config'
import { useMutation, useQuery } from 'react-query'

const useCast = (name: string, uri: string, id: string) => {
  const getAll = () => {
    return axios.get(uri + '/' + id)
  }

  const createApi = (data: any) => {
    return axios.post(uri, { ...data, movieId: id })
  }

  const updateApi = (data: any) => {
    return axios.put(uri, { ...data, movieId: id })
  }

  const deleteApi = (data: any) => {
    return axios.delete(`${uri}/${data.id}`)
  }

  const { data, refetch } = useQuery([name, id], getAll)
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
          resolve('Success')
        },
        onError: () => {
          reject('error')
        },
      })
    })
  }

  const onUpdate = (data: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      update(data, {
        onSuccess: () => {
          refetch()
          resolve('success')
        },
        onError: () => {
          reject('error')
        },
      })
    })
  }

  const onDelete = (data: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      deletee(data, {
        onSuccess: () => {
          refetch()
          resolve('success')
        },
        onError: () => {
          reject('error')
        },
      })
    })
  }

  return { data, onCreate, onUpdate, onDelete }
}

export default useCast
