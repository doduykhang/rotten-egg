import React from 'react'
import { FaStar } from 'react-icons/fa'

import { useFormik } from 'formik'

interface Props {
  name: string
  formik: ReturnType<typeof useFormik>
}

const StarRating: React.FC<Props> = ({ formik, name }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1
        return (
          <label>
            <input
              className="hidden"
              type="radio"
              name={name}
              value={formik.values[name]}
              onClick={() => formik.setFieldValue(name, ratingValue)}
            />
            <FaStar
              color={ratingValue <= formik.values[name] ? 'yellow' : 'white'}
              size={25}
              className="cursor-pointer"
            />
          </label>
        )
      })}
    </div>
  )
}

export default StarRating
