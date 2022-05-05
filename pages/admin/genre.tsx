import React, { ReactElement } from 'react'
import CrudTable from '../../components/table/CrudTable'
import useBasicService from '../../hooks/apis/BasicService/useBasicService'
import Genre from '../../models/Genre'
import * as yup from 'yup'
import AdminLayout from '../../components/AdminLayout'

const genre = () => {
  const validation = yup.object().shape({
    genreName: yup
      .string()
      .min(5, 'min 5')
      .max(50, ',max 50')
      .required('required'),
  })

  const headers = ['Genre name']
  const tableCells = [(genre: Genre) => genre.genreName]

  const initialValue = {
    genreName: '',
  }

  const fields = [{ name: 'genreName', label: 'Genre', type: 'text' }]

  const { data, onCreate, onUpdate, onDelete } = useBasicService(
    'genre',
    '/api/genre'
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
        createValidation={validation}
        updateValidation={validation}
      />
    </div>
  )
}

genre.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default genre
