import FeaturedMovieList from '../models/FeaturedMovieList'
import axios from '../axios.config'
import { useQuery } from 'react-query'

const fetchFeaturedMovieLists = () => {
  return axios.get<FeaturedMovieList[]>(
    '/api/featured-movie-list/movie-of-list'
  )
}

const useFeaturedMovieList = () => {
  const { data } = useQuery('featured-movie-list', fetchFeaturedMovieLists)

  return { data }
}

export default useFeaturedMovieList
