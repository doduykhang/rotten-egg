import { useFormik } from 'formik'
import React from 'react'

interface Props {
  formik: ReturnType<typeof useFormik>
  name: string
  label: string
  type?: string
}

const Textfield: React.FC<Props> = ({ formik, name, label, type = 'text' }) => {
  return (
    <div className="flex flex-col text-white">
      <label htmlFor={name}>{label}</label>
      <input
        className="rounded bg-gray-600 px-2 py-1 focus:bg-gray-400 focus:outline-none"
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
      />
      {formik.errors[name] && (
        <span className="text-red-500 ">{formik.errors[name]}</span>
      )}
    </div>
  )
}

export default Textfield
