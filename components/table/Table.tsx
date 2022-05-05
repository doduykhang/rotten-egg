import React from 'react'

interface Props<T> {
  headers: string[]
  tableCells: { (data: T, index: number): React.ReactNode }[]
  data: T[]
}

const Table: React.FC<Props<any>> = ({ headers, data, tableCells }) => {
  return (
    <table className=" rounded-lg bg-gray-700 ">
      <thead>
        <tr className=" bg-gray-600 text-white">
          {headers.map((header, i) => (
            <th className="p-3 font-bold" key={i}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((data, i) => {
            return (
              <tr className=" text-white" key={i}>
                {tableCells.map((cell, j) => {
                  return (
                    <td className="p-3 text-center" key={j}>
                      {cell(data, i)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default Table
