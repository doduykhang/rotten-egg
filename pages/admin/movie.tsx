import useBasicService from '../../hooks/apis/BasicService/useBasicService'
import * as yup from 'yup'
import CrudTable from '../../components/table/CrudTable'
import Movie from '../../models/Movie'
import useStorage from '../../hooks/firebase/useStorage'
import Button from '../../components/utils/Button'
import Link from 'next/link'
import { ReactElement } from 'react'
import AdminLayout from '../../components/AdminLayout'
import useMovieService from '../../hooks/apis/BasicService/useMovieService'

const movie = () => {
  const validation = yup.object().shape({
    title: yup.string().min(5, 'min 5').max(50, ',max 50').required('required'),
    description: yup
      .string()
      .min(5, 'min 5')
      .max(50, ',max 50')
      .required('required'),
    runtime: yup.number().required('required'),
    releaseDate: yup.date().required('required'),
    imageUrl: yup.mixed().required('required'),
    ratingId: yup.string().required('required'),
    languageId: yup.string().required('required'),
    genreIds: yup.array().min(1, 'required'),
  })

  const updateValidation = yup.object().shape({
    title: yup.string().min(5, 'min 5').max(50, ',max 50').required('required'),
    description: yup
      .string()
      .min(5, 'min 5')
      .max(50, ',max 50')
      .required('required'),
    runtime: yup.number().required('required'),
    releaseDate: yup.date().required('required'),
    ratingId: yup.string().required('required'),
    languageId: yup.string().required('required'),
    genreIds: yup.array().min(1, 'required'),
  })

  const headers = ['title', 'image', 'rating', 'genres', 'cast']
  const tableCells = [
    (movie: Movie) => movie.title,
    (movie: Movie) => <img className="w-40" src={movie.imageUrl} />,
    (movie: Movie) => movie.rating.ratingName,
    (movie: Movie) => movie.genres.map((genre) => genre.genreName).join(','),
    (movie: Movie) => (
      <>
        <Button>
          <Link href={`/admin/cast/${movie.id}`}>Cast</Link>
        </Button>
        <Button>
          <Link href={`/admin/crew/${movie.id}`}>Crew</Link>
        </Button>
      </>
    ),
  ]

  const initialValue = {
    title: '',
    imageUrl: '',
  }

  const genre = useBasicService('genre', '/api/genre')

  const rating = useBasicService('rating', '/api/rating')

  const language = useBasicService('language', '/api/language')

  const movies = useMovieService('movie', '/api/movie')

  const fields = [
    { name: 'title', label: 'Title', type: 'text' },

    { name: 'description', label: 'Description', type: 'text' },

    {
      name: 'releaseDate',
      label: 'Release date',
      type: 'text',
      type2: 'date',
    },

    { name: 'runtime', label: 'runtime', type: 'text', type2: 'number' },
    { name: 'imageUrl', label: 'image', type: 'image' },
    {
      name: 'ratingId',
      label: 'image',
      type: 'select',
      data: rating.data?.data,
      getValue: (data: any) => data.id,
      getDisplayData: (data: any) => data.ratingName,
    },
    {
      name: 'languageId',
      label: 'image',
      type: 'select',
      data: language.data?.data,
      getValue: (data: any) => data.id,
      getDisplayData: (data: any) => data.languageName,
    },
    {
      name: 'genreIds',
      label: 'image',
      type: 'multi-select',
      data: genre.data?.data,
      getValue: (data: any) => data.id,
      getDisplayData: (data: any) => data.genreName,
    },
  ]

  const { uploadFile } = useStorage()

  const onCreate = async (values: any) => {
    const imageUrl = await uploadFile(values.imageUrl)
    return movies.onCreate({ ...values, imageUrl })
  }

  const onUpdate = async (values: any) => {
    let imageUrl = values.imageUrl
    if (typeof values.imageUrl !== 'string')
      imageUrl = await uploadFile(values.imageUrl)

    return movies.onUpdate({ ...values, imageUrl })
  }

  if (movies.data && genre.data && rating.data && language.data)
    return (
      <div>
        <div>
          <button onClick={movies.previousPage}>Previous</button>
          <button onClick={movies.nextPage}>Next</button>
        </div>
        <CrudTable
          fields={fields}
          initialValues={initialValue}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={movies.onDelete}
          headers={headers}
          data={movies?.data?.data ?? []}
          tableCells={tableCells}
          createValidation={validation}
          updateValidation={updateValidation}
        />
      </div>
    )
  return <></>
}
movie.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default movie
