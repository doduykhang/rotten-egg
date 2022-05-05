import Link from 'next/link'
import React from 'react'
import MovieTableItem from '../../models/MovieTableItem'

interface Props {
  movies: MovieTableItem[]
}

const MovieTable: React.FC<Props> = ({ movies }) => {
  const headerClass = 'p-3 '
  const tableCellClass = 'p-3 '
  return (
    <div className="text-white ">
      <table>
        <thead className="borderb bg-gray-800">
          <tr>
            <th className={headerClass}>Rating</th>
            <th className={headerClass}>Title</th>
            <th className={headerClass}>Credit</th>
          </tr>
        </thead>

        {movies.map((movie) => {
          return (
            <tr className="border-b border-gray-400 bg-gray-700">
              <td className={tableCellClass}>
                <span className="rounded-lg bg-green-400 p-2 text-black">
                  {movie.totalRating === 0
                    ? '-- '
                    : (movie.ratingCount / movie.totalRating) * 100}
                  %
                </span>
              </td>
              <Link href={`/movie/${movie.id}`}>
                <td
                  className={tableCellClass + ' cursor-pointer text-blue-300'}
                >
                  {movie.title}
                </td>
              </Link>
              <td className={tableCellClass}>{movie.credit}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default MovieTable
