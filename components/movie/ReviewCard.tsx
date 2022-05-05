import React from 'react'
import Review from '../../models/Review'

interface Props {
  review: Review
}

const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <div className="w-52 rounded-2xl border-2 p-3 text-white">
      <p className="text-xl font-bold">{review.user.displayName}</p>
      <p className="mt-2">{review.reviewContent}</p>
      <div className="mt-2 flex justify-end text-gray-400">
        <p>{`Rating: ${review.rating}/5`}</p>
      </div>
    </div>
  )
}

export default ReviewCard
