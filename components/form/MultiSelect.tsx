import { Listbox } from '@headlessui/react'
import { useFormik } from 'formik'
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

const MultiSelect: React.FC<Props> = ({
  label,
  name,
  data,
  formik,
  getDisplayData,
  getValue,
}) => {
  const [selectedPerson, setSelectedPerson] = useState<any[]>([])
  const [selectedValue, setSelectedValue] = useState<any[]>([])

  const { isToggle, toggle } = useToggle()
  const handleSelect = (item: any) => {
    if (selectedPerson.find((el) => el === item)) {
      setSelectedPerson((old) => old.filter((el) => el !== item))
      setSelectedValue((old) => old.filter((el) => el !== getValue(item)))
    } else {
      setSelectedPerson((old) => [...old, item])
      setSelectedValue((old) => [...old, getValue(item)])
    }
  }

  useEffect(() => {
    formik.setFieldValue(name, selectedValue)
  }, [selectedValue])

  useEffect(() => {
    const value = formik.values[name]

    if (value) {
      setSelectedPerson(
        data.filter((d) => {
          return value.includes(getValue(d))
        })
      )
      setSelectedValue(value)
    }
  }, [formik.values])

  const isSelected = (item: any) => {
    return selectedPerson.find((el) => el === item) ? true : false
  }

  return (
    <div>
      <div>{label}</div>
      <Listbox as="div" value={selectedPerson} onChange={handleSelect}>
        <Listbox.Button
          onClick={toggle}
          className="flex items-center justify-center gap-2 rounded-lg bg-gray-700 p-2 text-white"
        >
          <span>
            {selectedPerson.length > 0
              ? selectedPerson.map((p) => getDisplayData(p)).join(',')
              : 'No selection'}
          </span>
          <FaAngleDown />
        </Listbox.Button>

        <Listbox.Options
          as="div"
          className="mt-2 inline-block space-y-2 rounded-lg bg-gray-700 p-2"
        >
          {data.map((person) => {
            const selected = isSelected(person)
            return (
              <Listbox.Option as="div" key={getValue(person)} value={person}>
                {({ active }) => (
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

        {formik.errors[name] && (
          <div className="text-red-500">{formik.errors[name]}</div>
        )}
      </Listbox>
    </div>
  )
}

export default MultiSelect
