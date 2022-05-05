import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import CrudTable from '../../../components/table/CrudTable'
import useBasicService from '../../../hooks/apis/BasicService/useBasicService'
import useCast from '../../../hooks/apis/BasicService/useBasicServiceWithId'
import useMovieDetail from '../../../hooks/useMovieDetail'
import Crew from '../../../models/Crew'
import * as yup from 'yup'

const crew = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const validation = yup.object().shape({
    personId: yup.string().required('required'),
    movieRoleId: yup.string().required('required'),
  })

  const headers = ['person', 'role']
  const tableCells = [
    (crew: Crew) => crew.person.personName,
    (crew: Crew) => crew.movieRole.movieRoleName,
  ]

  const person = useBasicService('person', '/api/person')
  const movieRole = useBasicService('movie-role', '/api/movie-role')

  const cast = useCast('crew', '/api/crew', id)
  const movie = useMovieDetail(id)

  const fields = [
    {
      name: 'personId',
      label: 'person',
      type: 'select',
      data: person.data?.data,
      getValue: (data: any) => data.id,
      getDisplayData: (data: any) => data.personName,
    },
    {
      name: 'movieRoleId',
      label: 'movieRole',
      type: 'select',
      data: movieRole.data?.data,
      getValue: (data: any) => data.id,
      getDisplayData: (data: any) => data.movieRoleName,
    },
  ]

  const onCreate = async (values: any) => {
    return cast.onCreate(values)
  }

  const onUpdate = async (values: any) => {
    return cast.onUpdate(values)
  }

  if (cast.data && person.data && movieRole.data && movie.data)
    return (
      <div>
        <div>{movie.data.data.title}</div>
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
crew.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default crew
