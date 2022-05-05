import axios from '../axios.config'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const createReview = (data: any) => {
  return axios.post('/api/review', data)
}

const deleteReview = (movieId: string) => {
  return axios.delete(`/api/review/${movieId}`)
}

const getReview = (movieId: string) => {
  return axios.get(`/api/review/${movieId}`)
}

const updateReview = (data: any) => {
  return axios.put('/api/review', data)
}

const useReview = (movieId: string) => {
  const queryClient = useQueryClient()
  const { mutate: create } = useMutation('create-review', createReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movie-detail', movieId])
      queryClient.invalidateQueries(['user-review', movieId])
    },
  })
  const { mutate: update } = useMutation('create-review', updateReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movie-detail', movieId])
      queryClient.invalidateQueries(['user-review', movieId])
    },
  })
  const { mutate: deletee } = useMutation('delete-review', deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movie-detail', movieId])
      queryClient.invalidateQueries(['user-review', movieId])
    },
  })
  const { data } = useQuery(
    ['user-review', movieId],
    () => getReview(movieId),
    { keepPreviousData: true }
  )
  return { data, create, update, deletee }
}

export default useReview
