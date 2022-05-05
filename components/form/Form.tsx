import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import Button from '../utils/Button'
import ImagePicker from './ImagePicker'
import MultiSelect from './MultiSelect'
import Select from './Select'
import Textfield from './Textfield'

interface Props {
  submitButtonLabel: string
  fields: {
    name: string
    label: string
    type: string
    type2: string
    getDisplayData: (data: any) => string
    getValue: (data: any) => any
    data: any[]
  }[]
  initialValues: any
  onSubmit: (values: any) => void
  data?: any
  validation?: any
}

const Form: React.FC<Props> = ({
  initialValues,
  onSubmit,
  fields,
  submitButtonLabel,
  data,
  validation,
}) => {
  const formik = useFormik<any>({
    initialValues,
    onSubmit,
    validationSchema: validation,
  })

  useEffect(() => {
    if (data) {
      formik.setValues(data)
    }
  }, [data])

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map((field, i) => {
        switch (field.type) {
          case 'text':
            return (
              <Textfield
                key={i}
                name={field.name}
                label={field.label}
                formik={formik}
                type={field.type2}
              />
            )
          case 'image':
            return (
              <ImagePicker
                key={i}
                name={field.name}
                label={field.label}
                formik={formik}
              />
            )
          case 'select':
            return <Select key={i} {...field} formik={formik} />
          case 'multi-select':
            return <MultiSelect key={i} {...field} formik={formik} />
          default:
            return <></>
        }
      })}
      <Button type="submit">{submitButtonLabel}</Button>
    </form>
  )
}

export default Form
