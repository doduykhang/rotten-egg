import React from 'react'
import Movie from '../../models/Movie'

interface Props {
  movie: Movie
}

const MovieInfo: React.FC<Props> = ({ movie }) => {
  const headerStyle = 'table-cell text-right text-gray-400'
  const rowStyle = 'table-cell px-5 text-left'
  return (
    <div className="flex justify-center">
      <div className="w-1/2 rounded border-2 border-white py-2 px-4 text-white">
        <p>{movie.description}</p>
        <div className="flex justify-center">
          <ul className="table">
            <li className="table-row">
              <div className={headerStyle}>Rating: </div>
              <div className={rowStyle}>{movie.rating.ratingName}</div>
            </li>
            <li className="table-row text-right">
              <div className={headerStyle}>Genre:</div>
              <div className={rowStyle}>
                {movie.genres.map((genre) => genre.genreName).join(', ')}
              </div>
            </li>
            <li className="table-row">
              <div className={headerStyle}>Original language:</div>
              <div className={rowStyle}>
                {movie.originalLanguage.languageName}
              </div>
            </li>
            <li className="table-row">
              <div className={headerStyle}>Runtime:</div>
              <div className={rowStyle}>{movie.runtime}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MovieInfo
