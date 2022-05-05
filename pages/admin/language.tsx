import React, { ReactElement } from 'react'
import CrudTable from '../../components/table/CrudTable'
import useBasicService from '../../hooks/apis/BasicService/useBasicService'
import Language from '../../models/Language'
import * as yup from 'yup'
import AdminLayout from '../../components/AdminLayout'

const language = () => {
  const validation = yup.object().shape({
    languageName: yup
      .string()
      .min(5, 'min 5')
      .max(50, ',max 50')
      .required('required'),
  })
  const headers = ['Language name']
  const tableCells = [(genre: Language) => genre.languageName]

  const initialValue = {
    languageName: '',
  }

  const fields = [
    { name: 'languageName', label: 'Language name', type: 'text' },
  ]

  const { data, onCreate, onUpdate, onDelete } = useBasicService(
    'language',
    '/api/language'
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

language.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default language
