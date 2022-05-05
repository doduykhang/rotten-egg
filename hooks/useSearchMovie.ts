import React, { useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import axios from '../axios.config'
import Movie from '../models/Movie'

const searchMovie = ({ pageParam = 0, word = '' }) => {
  return axios.get<Movie[]>('/api/movie', {
    params: { page: pageParam, word },
  })
}

const useSearchMovie = () => {
  const [word, setWord] = useState('')

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    remove,
  } = useInfiniteQuery(
    ['search-movie', word],
    async ({ pageParam }) => searchMovie({ pageParam, word }),
    {
      initialData: () => {
        return {
          pageParams: [undefined],
          pages: [],
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage) return allPages.length

        return lastPage.data.length > 0 ? allPages.length : undefined
      },
    }
  )

  const fetchNext = () => {
    if (hasNextPage) fetchNextPage()
  }

  return { data, setWord, fetchNext, isFetchingNextPage, refetch, remove }
}

export default useSearchMovie
