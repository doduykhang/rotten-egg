import axios from '../../axios.config'
import React, { ReactElement } from 'react'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import CrudTable from '../../components/table/CrudTable'
import useBasicService from '../../hooks/apis/BasicService/useBasicService'
import useStorage from '../../hooks/firebase/useStorage'
import Person from '../../models/Person'
import AdminLayout from '../../components/AdminLayout'

const person = () => {
  const validation = yup.object().shape({
    personName: yup
      .string()
      .min(5, 'min 5')
      .max(50, ',max 50')
      .required('required'),
    imageUrl: yup.mixed().required('required'),
    description: yup
      .string()
      .min(5, 'min 5')
      .max(50, ',max 50')
      .required('required'),
  })

  const updateValidation = yup.object().shape({
    personName: yup
      .string()
      .min(5, 'min 5')
      .max(50, ',max 50')
      .required('required'),
    description: yup
      .string()
      .min(5, 'min 5')
      .max(50, ',max 50')
      .required('required'),
  })
  const headers = ['name', 'image', 'description']

  const tableCells = [
    (person: Person) => person.personName,
    (person: Person) => <img src={person.imageUrl} />,
    (person: Person) => person.description,
  ]

  const initialValue = {
    personName: '',
    imageUrl: '',
    description: '',
  }

  const fields = [
    { name: 'personName', label: 'Name', type: 'text' },
    { name: 'imageUrl', label: 'Image', type: 'image' },
    { name: 'description', label: 'description', type: 'text' },
  ]

  const { uploadFile } = useStorage()

  const { data, onDelete, refetch } = useBasicService('person', '/api/person')

  const { mutate } = useMutation(['create-person'], (data: any) =>
    axios.post('/api/person', data)
  )
  const { mutate: update } = useMutation(['update-person'], (data: any) =>
    axios.put('/api/person', data)
  )

  const onCreate = (values: any): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const imageUrl = await uploadFile(values.imageUrl)
      mutate(
        { ...values, imageUrl },
        {
          onSuccess: () => {
            resolve('Success')
            refetch()
          },
        }
      )
    })
  }

  const onUpdate = (values: any): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      let imageUrl = values.imageUrl
      if (typeof values.imageUrl !== 'string')
        imageUrl = await uploadFile(values.imageUrl)

      update(
        { ...values, imageUrl },
        {
          onSuccess: () => {
            resolve('success')
            refetch()
          },
        }
      )
    })
  }

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
        updateValidation={updateValidation}
      />
    </div>
  )
}

person.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default person
