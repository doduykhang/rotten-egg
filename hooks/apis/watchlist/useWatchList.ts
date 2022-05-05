import axios from '../../../axios.config'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const getWatchlistStatus = (movieId: string) => {
  return axios.get(`/api/watch-list/${movieId}`)
}

const addToWatchListApi = (movieId: string) => {
  return axios.post(`/api/watch-list/${movieId}`)
}

const removeFromWatchListApi = (movieId: string) => {
  return axios.delete(`/api/watch-list/${movieId}`)
}

const useWatchList = (movieId: string) => {
  const queryClient = useQueryClient()

  const { data } = useQuery(['watch-list', movieId], () =>
    getWatchlistStatus(movieId)
  )

  const { mutate: add } = useMutation(
    ['add-to-watchlist', movieId],
    addToWatchListApi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['watch-list', movieId])
      },
    }
  )

  const { mutate: remove } = useMutation(
    ['add-to-watchlist', movieId],
    removeFromWatchListApi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['watch-list', movieId])
      },
    }
  )
  const addToWatchlist = () => {
    add(movieId)
  }
  const removeFromWatchlist = () => {
    remove(movieId)
    queryClient.invalidateQueries(['watch-list', movieId])
  }
  return { data, addToWatchlist, removeFromWatchlist }
}

export default useWatchList
