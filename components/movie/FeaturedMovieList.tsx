import React, { useRef } from 'react'
import FeaturedMovieList from '../../models/FeaturedMovieList'
import MovieCard from './MovieCard'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
interface Props {
  featuredMovieList: FeaturedMovieList
}

const FeaturedMovieList: React.FC<Props> = ({ featuredMovieList }) => {
  const ref = useRef<HTMLUListElement | null>(null)

  const onRightArrowClick = () => {
    if (ref != null) {
      const current = ref.current?.scrollLeft || 0
      ref.current?.scroll({ left: current + 200, behavior: 'smooth' })
    }
  }
  const onLeftArrowClick = () => {
    if (ref != null) {
      const current = ref.current?.scrollLeft || 0
      ref.current?.scroll({ left: current - 200, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      <div className="flex cursor-pointer items-center justify-between">
        <h1 className="mb-3 pl-20 text-4xl font-bold  text-white">
          {featuredMovieList.name.toLocaleUpperCase()}
        </h1>
      </div>
      <button
        onClick={onLeftArrowClick}
        className="absolute top-1/2 left-0 z-10 rounded-full bg-gray-500/50 p-2"
      >
        <FaArrowLeft size={30} />
      </button>
      <button
        onClick={onRightArrowClick}
        className="absolute top-1/2 right-0 z-10 rounded-full bg-gray-500/50 p-2"
      >
        <FaArrowRight size={30} />
      </button>
      <ul
        ref={ref}
        className="no-scrollbar relative flex w-full justify-between space-x-5 overflow-x-auto"
      >
        {featuredMovieList.movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeaturedMovieList
