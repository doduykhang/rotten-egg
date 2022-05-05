import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import MovieDetail from '../../../components/movie/MovieDetail'
import CrudTable from '../../../components/table/CrudTable'
import useBasicService from '../../../hooks/apis/BasicService/useBasicService'
import useCast from '../../../hooks/apis/BasicService/useBasicServiceWithId'
import useMovieDetail from '../../../hooks/useMovieDetail'
import Cast from '../../../models/Cast'
import * as yup from 'yup'

const cast = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const validation = yup.object().shape({
    personId: yup.string().required('required'),
    roleName: yup.string().required('required'),
  })

  const movie = useMovieDetail(id)

  const headers = ['person', 'roleName']
  const tableCells = [
    (cast: Cast) => cast.person.personName,
    (cast: Cast) => cast.roleName,
  ]

  const person = useBasicService('person', '/api/person')

  const cast = useCast('cast', '/api/cast', id)

  const fields = [
    { name: 'roleName', label: 'Role name', type: 'text' },
    {
      name: 'personId',
      label: 'person',
      type: 'select',
      data: person.data?.data,
      getValue: (data: any) => data.id,
      getDisplayData: (data: any) => data.personName,
    },
  ]

  const onCreate = async (values: any) => {
    return cast.onCreate(values)
  }

  const onUpdate = async (values: any) => {
    return cast.onUpdate(values)
  }

  if (cast.data && person.data && movie.data)
    return (
      <div>
        <div>Cast of movie {movie.data.data.title}</div>
        <CrudTable
          fields={fields}
          initialValues={{}}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={cast.onDelete}
          headers={headers}
          data={cast?.data?.data ?? []}
          tableCells={tableCells}
          createValidation={validation}
          updateValidation={validation}
        />
      </div>
    )
  return <></>
}
cast.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default cast
