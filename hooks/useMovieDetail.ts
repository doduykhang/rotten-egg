import React from 'react'
import { useQuery } from 'react-query'
import axios from '../axios.config'
import Movie from '../models/Movie'

const fetchMovieDetail = (movieId: string) => {
  return axios.get<Movie>(`/api/movie/${movieId}`)
}

const useMovieDetail = (movieId: string) => {
  const { data } = useQuery(['movie-detail', movieId], () =>
    fetchMovieDetail(movieId)
  )
  return { data }
}

export default useMovieDetail
