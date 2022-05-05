import { Listbox } from '@headlessui/react'
import { useFormik } from 'formik'
import { loadDefaultErrorComponents } from 'next/dist/server/load-components'
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaCheckCircle } from 'react-icons/fa'
import useToggle from '../../hooks/utils/useToggle'

interface Props {
  label: string
  name: string
  data: any[]
  getValue: (data: any) => any
  getDisplayData: (data: any) => string
  formik: ReturnType<typeof useFormik>
}

const Select: React.FC<Props> = ({
  label,
  name,
  data,
  formik,
  getDisplayData,
  getValue,
}) => {
  const [selectedPerson, setSelectedPerson] = useState<any>(null)
  const [selectedValue, setSelectedValue] = useState<any>(null)

  const { isToggle, toggle } = useToggle()
  const handleSelect = (item: any) => {
    setSelectedValue(getValue(item))
    setSelectedPerson(item)
  }

  useEffect(() => {
    formik.setFieldValue(name, selectedValue)
  }, [selectedValue])

  useEffect(() => {
    const value = formik.values[name]

    if (value) {
      setSelectedPerson(data.find((d) => getValue(d) === value))
      setSelectedValue(value)
    }
  }, [formik.values])

  return (
    <div>
      <div>{label}</div>
      <Listbox as="div" value={selectedPerson} onChange={handleSelect}>
        <Listbox.Button
          onClick={toggle}
          className="flex items-center justify-center gap-2 rounded-lg bg-gray-700 p-2 text-white"
        >
          <span>
            {selectedPerson ? getDisplayData(selectedPerson) : 'No selection'}
          </span>
          <FaAngleDown />
        </Listbox.Button>
        <Listbox.Options
          as="div"
          className="mt-2 inline-block space-y-2 rounded-lg bg-gray-700 p-2"
        >
          {data.map((person) => {
            return (
              <Listbox.Option as="div" key={getValue(person)} value={person}>
                {({ active, selected }) => (
                  <div
                    className={`${
                      active && 'bg-gray-600'
                    } flex items-center gap-2 rounded-lg p-2`}
                  >
                    <span
                      className={`${
                        selected ? 'text-green-400' : 'text-white'
                      } cursor-pointer`}
                    >
                      {getDisplayData(person)}
                    </span>
                    {selected && (
                      <FaCheckCircle
                        className={`${selected && 'text-green-400'}`}
                      />
                    )}
                  </div>
                )}
              </Listbox.Option>
            )
          })}
        </Listbox.Options>
      </Listbox>
      {formik.errors[name] && (
        <div className="text-red-500">{formik.errors[name]}</div>
      )}
    </div>
  )
}

export default Select
