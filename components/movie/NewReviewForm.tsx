import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import useReview from '../../hooks/useReview'
import useToggle from '../../hooks/utils/useToggle'
import ReviewCard from './ReviewCard'
import StarRating from '../StarRating'

interface Props {
  movieId: string
}

const NewReviewForm: React.FC<Props> = ({ movieId }) => {
  const { data: review, create, update, deletee } = useReview(movieId)
  const { toggle, isToggle } = useToggle()

  const form = useFormik<any>({
    initialValues: {
      reviewContent: review?.data?.reviewContent,
      rating: review?.data?.rating,
    },
    onSubmit: (values) => {
      if (!isToggle) create({ movieId, ...values })
      else update({ movieId, ...values })
    },
  })

  useEffect(() => {
    if (review && review.data) form.setValues(review.data)
  }, [review])

  if (review && review.data)
    return (
      <>
        {!isToggle && (
          <div className="flex flex-col items-center justify-center">
            <ReviewCard review={review.data} />
            <div className="space-x-3 text-white">
              <button onClick={() => deletee(movieId)}>Delete</button>
              <button onClick={toggle}>Update</button>
            </div>
          </div>
        )}

        {isToggle && (
          <div className="flex items-center justify-center">
            <form onSubmit={form.handleSubmit} className="flex-col space-y-4">
              <textarea
                name="reviewContent"
                value={form.values.reviewContent}
                onChange={form.handleChange}
                className="rounded bg-gray-400 px-2 py-1 text-white"
              />

              <StarRating formik={form} name="rating" />
              <div className="flex space-x-2 text-white">
                <button className="text-white" type="submit">
                  Update review
                </button>
                <button onClick={toggle}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </>
    )
  return (
    <div className="flex justify-center">
      <form
        onSubmit={form.handleSubmit}
        className="mt-5 flex w-80 flex-col space-y-4"
      >
        <textarea
          name="reviewContent"
          value={form.values.reviewContent}
          onChange={form.handleChange}
          className="rounded bg-gray-400 px-2 py-1 text-white"
        />

        <StarRating formik={form} name="rating" />
        <button className=" rounded bg-gray-200 px-2 py-1 text-black">
          Add review
        </button>
      </form>
    </div>
  )
}

export default NewReviewForm
