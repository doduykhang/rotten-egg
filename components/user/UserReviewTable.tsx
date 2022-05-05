import Link from 'next/link'
import { FaStar } from 'react-icons/fa'
import UserReviewItem from '../../models/UserReviewItem'
import StarRating from '../StarRating'

interface Props {
  movies: UserReviewItem[]
}

const UserReviewTable: React.FC<Props> = ({ movies }) => {
  const headerClass = 'p-3 '
  const tableCellClass = 'p-3 '
  return (
    <div className="text-white ">
      <table>
        {movies.map((movie) => {
          return (
            <tr className="bg-gray-700">
              <td className={tableCellClass}>
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="h-40 w-28"
                />
              </td>
              <Link href={`/movie/${movie.id}`}>
                <td
                  className={tableCellClass + ' cursor-pointer text-blue-300'}
                >
                  {movie.title}
                </td>
              </Link>
              <td className={tableCellClass}>
                <div className="flex">
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1
                    return (
                      <label>
                        <input className="hidden" type="radio" />
                        <FaStar
                          color={
                            ratingValue <= movie.myRating ? 'yellow' : 'white'
                          }
                          size={25}
                        />
                      </label>
                    )
                  })}
                </div>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default UserReviewTable
