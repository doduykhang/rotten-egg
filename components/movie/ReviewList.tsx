import React from 'react'
import Review from '../../models/Review'
import ReviewCard from './ReviewCard'

interface Props {
  reviews: Review[]
}

const ReviewList: React.FC<Props> = ({ reviews }) => {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        {reviews.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
      <div className="flex justify-end">
        <button className=" text-blue-400">Show all</button>
      </div>
    </>
  )
}

export default ReviewList
