import axios from '../../../axios.config'
import { useQuery } from 'react-query'
import Person from '../../../models/Person'
import MovieTableItem from '../../../models/MovieTableItem'

interface Props {
  personInfo: Person
  movies: MovieTableItem[]
}

const getPersonInfo = (personId: string) => {
  return axios.get<Props>(`/api/movie/person/${personId}`)
}

const usePersonInfo = (personId: string) => {
  const { data } = useQuery(['person-info', personId], () =>
    getPersonInfo(personId)
  )
  return { data }
}

export default usePersonInfo
