import axios from '../../../axios.config'
import React from 'react'
import { useQuery } from 'react-query'
import UserReviewItem from '../../../models/UserReviewItem'

interface Props {
  movies: UserReviewItem[]
}

const getUserInfo = () => {
  return axios.get<Props>('/api/movie/user')
}

const useUserInfo = () => {
  const { data } = useQuery(['user-movie-info'], getUserInfo)
  return { data }
}

export default useUserInfo
