import { useFormik } from 'formik'
import React, { useState } from 'react'
interface Props {
  name: string
  label: string
  formik: ReturnType<typeof useFormik>
}
const ImagePicker: React.FC<Props> = ({ name, label, formik }) => {
  const [imageUrl, setImageUrl] = useState('')

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]))
      formik.setFieldValue(name, event.target.files[0])
    }
  }

  return (
    <label className={``}>
      <div className="">{label}</div>
      <img
        className={`${
          formik.errors[name] && 'border-2 border-red-600'
        } h-32 w-32 cursor-pointer`}
        src={
          imageUrl ? imageUrl : formik.values[name] ? formik.values[name] : ''
        }
        alt=""
      />
      <input type="file" hidden onChange={onImageChange} />
      {formik.errors[name] && (
        <div className="text-red-600">{formik.errors[name]}</div>
      )}
    </label>
  )
}

export default ImagePicker
