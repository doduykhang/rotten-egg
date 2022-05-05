import { useRouter } from 'next/router'
import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import StarRatings from 'react-star-ratings'
import CastList from '../../components/movie/CastList'
import CrewList from '../../components/movie/CrewList'
import useUserContext from '../../contexts/UserProvider'
import useWatchList from '../../hooks/apis/watchlist/useWatchList'
import useMovieDetail from '../../hooks/useMovieDetail'
import { convertRating } from '../../utils/convertRating'

const movie = () => {
  const router = useRouter()
  const { id } = router.query
  if (typeof id !== 'string') return <div>no id</div>

  const { data: movie } = useMovieDetail(id)
  const userContext = useUserContext()
  const {
    data: watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useWatchList(id)
  console.log(typeof watchlist?.data.status)

  return (
    <div className="ring-8">
      <div
        className="relative h-screen w-full object-cover"
        style={{
          backgroundImage: `linear-gradient(to left, rgba(0,0,0,0.6) 0%,rgba(0,0,0,1) 100%), url("https://collider.com/wp-content/uploads/avengers-character-poster-banner.jpeg")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <div className="absolute top-40 left-40 space-y-2 ">
          <img className="w-96" src={movie?.data.imageUrl} alt="" />
          <div className="text-6xl font-bold text-white">
            {movie?.data.title}
          </div>
          <StarRatings
            rating={convertRating(
              movie?.data.totalRating ?? 0,
              movie?.data.ratingCount ?? 0
            )}
            starRatedColor="yellow"
            starDimension="35px"
            starSpacing="10px"
          />
          <div className="text-xl text-gray-300">
            {movie?.data.genres.map((genre) => genre.genreName).join(',')}
          </div>
          <div className="text-gray-300">{movie?.data.description}</div>
          {userContext?.user && (
            <>
              <div className="">
                {!watchlist?.data.status ? (
                  <button
                    onClick={addToWatchlist}
                    className="bg-teal-300 py-1 px-2 text-white"
                  >
                    <FaPlus size={40} />
                  </button>
                ) : (
                  <button
                    onClick={removeFromWatchlist}
                    className="bg-red-300 py-1 px-2 text-white"
                  >
                    <FaMinus size={40} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-3 flex justify-center text-3xl font-bold text-white">
          Casts
        </p>
        <CastList casts={movie?.data.Cast ?? []} />
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-3 flex justify-center text-3xl font-bold text-white">
          Crews
        </p>
        <CrewList crews={movie?.data.Crew ?? []} />
      </div>
    </div>
  )
}

export default movie
