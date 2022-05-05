import { useRouter } from 'next/router'
import React from 'react'
import Movie from '../../models/Movie'

interface Props {
  movie: Movie
}

const MovieSearchCard: React.FC<Props> = ({ movie }) => {
  const router = useRouter()

  return (
    <div className="flex gap-5 ">
      <img className="w-20" src={movie.imageUrl} />
      <div className="flex flex-col justify-center ">
        <p
          onClick={() => router.push(`/movie/${movie.id}`)}
          className="cursor-pointer font-bold hover:text-red-400"
        >
          {movie.title + ' (' + new Date(movie.releaseDate).getFullYear() + ')'}
        </p>
        <p className="text-gray-500 ">
          {movie.Cast.slice(0, 3)
            .map((cast) => cast.person.personName)
            .join(',')}
        </p>
      </div>
    </div>
  )
}

export default MovieSearchCard
