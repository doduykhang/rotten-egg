import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import StarRatings from 'react-star-ratings'
import Movie from '../../models/Movie'
import { convertRating } from '../../utils/convertRating'

interface Props {
  movie: Movie
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const router = useRouter()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }

  const formatRuntime = (runtime: number) => {
    const hour = Math.floor(runtime / 60)
    const minute = runtime % 60
    return hour + 'hr ' + minute + 'minute'
  }

  let movieRating = -1
  if (movie.totalRating !== 0) {
    movieRating = (movie.ratingCount / movie.totalRating) * 100
  }
  return (
    <>
      <div className="w-60 shrink-0 space-y-2 text-white">
        <img className="h-96 w-60 " src={movie.imageUrl} alt={movie.title} />
        <StarRatings
          rating={convertRating(movie.totalRating ?? 0, movie.ratingCount ?? 0)}
          starRatedColor="yellow"
          starDimension="20px"
          starSpacing="5px"
        />
        <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
        <p className=" text-sm text-gray-500">
          {formatRuntime(movie.runtime) + ' | ' + movie.rating.ratingName}
        </p>
        <p className="text-sm text-gray-500">
          Released {formatDate(movie.releaseDate)}
        </p>
        <button
          onClick={() => router.push(`/movie/${movie.id}`)}
          className="border-2 border-red-500 px-4 py-2 font-bold"
        >
          SEE MORE
        </button>
      </div>
    </>
  )
}

export default MovieCard
