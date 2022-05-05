import React from 'react'
import Movie from '../../models/Movie'

interface Props {
  movie: Movie
}

const MovieDetail: React.FC<Props> = ({ movie }) => {
  return (
    <div className="flex flex-col justify-center space-x-4 sm:flex-row">
      <img
        className="w-full rounded sm:h-64 sm:w-48"
        src={movie.imageUrl}
        alt={movie.title}
      />
      <div className="flex max-w-md flex-grow flex-col items-center justify-center rounded border-2 border-white p-4">
        <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
        <div className="mt-2 flex items-center space-x-1">
          <p className="border-2 border-gray-400 px-1 text-sm text-gray-400">
            {movie.rating.ratingName}
          </p>
          <p className="text-gray-400">
            , {new Date(movie.releaseDate).getFullYear()}
          </p>
          <p className="text-gray-400">
            ,{' '}
            {movie.genres
              .map((genre) => genre.genreName)
              .slice(0, 2)
              .join('/')}
          </p>
          <p className="text-gray-400">, {movie.runtime}m</p>
        </div>
        <div className="mt-2 text-2xl text-white">
          {movie.totalRating === 0
            ? '-- '
            : (movie.ratingCount / movie.totalRating) * 100}
          %
        </div>
        <p className="cursor-pointer text-blue-300">
          {movie.totalRating / 5} reviews
        </p>
      </div>
    </div>
  )
}

export default MovieDetail
