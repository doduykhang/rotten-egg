import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import MovieCard from '../components/movie/MovieCard'
import MovieSearchCard from '../components/movie/MovieSearchCard'
import useSearchMovie from '../hooks/useSearchMovie'

const search = () => {
  const {
    data: movies,
    setWord,
    fetchNext,
    isFetchingNextPage,

    refetch,
    remove,
  } = useSearchMovie()

  const ref = useRef<any>(null)

  const [searchWord, setSearchWord] = useState('')
  const handleSearch = (e: any) => {
    e.preventDefault()
    setWord(searchWord)
    // remove()
  }

  useEffect(() => {
    const current = ref.current

    const onScrollToEnd = (e: any) => {
      if (current.scrollHeight - current.offsetHeight == current.scrollTop) {
        if (!isFetchingNextPage) fetchNext()
        // console.log('end')
      }
    }
    current.addEventListener('scroll', onScrollToEnd)

    return () => {
      current.removeEventListener('scroll', onScrollToEnd)
    }
  }, [])

  return (
    <div className="h-[90%]">
      <form
        className="mb-3 flex items-center  space-x-2  px-2"
        onSubmit={handleSearch}
      >
        <input
          className="bottom-2 rounded border-2 border-gray-400 bg-black p-2 text-white focus:border-white focus:outline-none"
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button className="text-white " type="submit">
          <FaSearch className="h-6 w-6" />
        </button>
      </form>
      <section
        ref={ref}
        className="flex h-full flex-col gap-2 space-x-4 overflow-y-auto"
      >
        {movies?.pages.map((page) => {
          return page?.data.map((movie) => (
            <MovieSearchCard key={movie.id} movie={movie} />
          ))
        })}
      </section>
    </div>
  )
}

export default search
