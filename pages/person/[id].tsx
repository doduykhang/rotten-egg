import { useRouter } from 'next/router'
import React from 'react'
import MovieTable from '../../components/person/MovieTable'
import PersonCard from '../../components/person/PersonCard'
import usePersonInfo from '../../hooks/apis/person/usePersonInfo'

const personInfo = () => {
  const router = useRouter()
  const { id } = router.query
  if (typeof id != 'string') return <div>Invalid id</div>

  const { data } = usePersonInfo(id)

  if (!data) return <div>No person</div>

  return (
    <div className="flex flex-col items-center">
      <PersonCard person={data.data.personInfo} />
      <h1 className="my-4 flex justify-center text-2xl font-bold text-white">
        Filmography
      </h1>
      <MovieTable movies={data.data.movies} />
    </div>
  )
}

export default personInfo
