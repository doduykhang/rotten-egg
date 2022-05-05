import React, { ReactElement } from 'react'
import CrudTable from '../../components/table/CrudTable'
import useBasicService from '../../hooks/apis/BasicService/useBasicService'
import Rating from '../../models/Rating'
import * as yup from 'yup'
import AdminLayout from '../../components/AdminLayout'

const rating = () => {
  const validation = yup.object().shape({
    ratingName: yup
      .string()
      .min(1, 'min 1')
      .max(5, ',max 5')
      .required('required'),
  })
  const headers = ['Rating name']
  const tableCells = [(genre: Rating) => genre.ratingName]

  const initialValue = {
    ratingName: '',
  }

  const fields = [{ name: 'ratingName', label: 'Rating', type: 'text' }]

  const { data, onCreate, onUpdate, onDelete } = useBasicService(
    'rating',
    '/api/rating'
  )

  return (
    <div>
      <CrudTable
        fields={fields}
        initialValues={initialValue}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
        headers={headers}
        data={data?.data}
        tableCells={tableCells}
        updateValidation={validation}
        createValidation={validation}
      />
    </div>
  )
}
rating.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default rating
