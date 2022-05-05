import React from 'react'

const Carosel: React.FC = ({ children }) => {
  return (
    <ul className="flex w-full space-x-5 overflow-x-scroll ">{children}</ul>
  )
}

export default Carosel
