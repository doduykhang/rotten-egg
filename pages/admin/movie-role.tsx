import React, { ReactElement } from 'react'
import CrudTable from '../../components/table/CrudTable'
import useBasicService from '../../hooks/apis/BasicService/useBasicService'
import MovieRole from '../../models/MovieRole'
import * as yup from 'yup'
import AdminLayout from '../../components/AdminLayout'

const movieRole = () => {
  const validation = yup.object().shape({
    movieRoleName: yup
      .string()
      .min(5, 'min 5')
      .max(50, ',max 50')
      .required('required'),
  })
  const headers = ['Movie role name']
  const tableCells = [(genre: MovieRole) => genre.movieRoleName]

  const initialValue = {
    movieRoleName: '',
  }

  const fields = [
    { name: 'movieRoleName', label: 'Movie role name', type: 'text' },
  ]

  const { data, onCreate, onUpdate, onDelete } = useBasicService(
    'movie-role',
    '/api/movie-role'
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

movieRole.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default movieRole
