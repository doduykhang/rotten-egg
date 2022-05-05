import React from 'react'
import UserReviewTable from '../../components/user/UserReviewTable'
import useUserInfo from '../../hooks/apis/user/useUserInfo'

const info = () => {
  const { data } = useUserInfo()
  if (!data) return <div>Not user</div>

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-2 text-2xl font-bold text-white">Review history</h1>
      <UserReviewTable movies={data.data.movies} />
    </div>
  )
}

export default info
