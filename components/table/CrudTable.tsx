import React, { useEffect, useState } from 'react'
import useToast from '../../hooks/utils/useToast'
import useToggle from '../../hooks/utils/useToggle'
import Form from '../form/Form'
import Button from '../utils/Button'
import MyDialog from '../utils/MyDialog'
import Toast from '../utils/Toast'
import Table from './Table'
import * as yup from 'yup'

interface Props {
  headers: string[]
  tableCells: { (data: any): React.ReactNode }[]
  data: any[]
  onCreate: (data: any) => Promise<string>
  onUpdate: (data: any) => Promise<string>
  onDelete: (data: any) => Promise<string>
  fields: { name: string; label: string; type: string }[]
  initialValues: any
  createValidation?: any
  updateValidation?: any
}

const CrudTable: React.FC<Props> = ({ ...props }) => {
  const createForm = useToggle()
  const updateForm = useToggle()
  const deleteForm = useToggle()
  const toast = useToast()

  const [headers, setHeader] = useState(['#', ...props.headers, 'action'])
  const [currentData, setCurrentData] = useState<any>(null)

  const [tableCells, setTableCells] = useState([
    (data: any, index: number) => {
      return <div>{index + 1}</div>
    },
    ...props.tableCells,
    (data: any) => (
      <div className="flex gap-3">
        <Button onClick={() => handleOpenUpdateForm(data)} color="warning">
          Update
        </Button>
        <Button onClick={() => handleOpenDeleteForm(data)} color="danger">
          Delete
        </Button>
      </div>
    ),
  ])

  const handleOpenUpdateForm = (data: any) => {
    setCurrentData((_) => data)
    updateForm.toggle()
  }

  const handleOpenDeleteForm = (data: any) => {
    setCurrentData((_) => data)
    deleteForm.toggle()
  }

  const onCreate = (values: any) => {
    props.onCreate(values).then((message) => {
      createForm.toggle()
      toast.openToast({ message: message, type: 'success' })
    })
  }

  const onUpdate = (values: any) => {
    props.onUpdate(values).then((message) => {
      updateForm.toggle()
      toast.openToast({ message: message, type: 'success' })
    })
  }

  const onDelete = (values: any) => {
    props
      .onDelete(values)
      .then((message) => toast.openToast({ message: message, type: 'success' }))
      .catch((message) => toast.openToast({ message: message, type: 'error' }))
      .finally(() => deleteForm.toggle())
  }

  return (
    <div>
      <Button onClick={createForm.toggle}>Create</Button>
      <Table headers={headers} tableCells={tableCells} data={props.data} />
      <MyDialog isOpen={createForm.isToggle} onClose={createForm.toggle}>
        <Form
          initialValues={props.initialValues}
          onSubmit={onCreate}
          submitButtonLabel="Create genre"
          fields={props.fields}
          validation={props.createValidation}
        />
      </MyDialog>
      <MyDialog isOpen={updateForm.isToggle} onClose={updateForm.toggle}>
        <Form
          initialValues={props.initialValues}
          onSubmit={onUpdate}
          submitButtonLabel="Update genre"
          fields={props.fields}
          data={currentData}
          validation={props.updateValidation}
        />
      </MyDialog>
      <MyDialog isOpen={deleteForm.isToggle} onClose={deleteForm.toggle}>
        <div className="flex flex-col items-center justify-center ">
          <p className="p-3 text-lg font-bold text-white">
            Are you sure you want to delete this
          </p>
          <div className="flex gap-2 self-end">
            <Button onClick={() => onDelete(currentData)}>Yes</Button>
            <Button onClick={deleteForm.toggle}>No</Button>
          </div>
        </div>
      </MyDialog>
      <Toast {...toast} />
    </div>
  )
}

export default CrudTable
