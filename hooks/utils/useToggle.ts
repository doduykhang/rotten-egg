import React, { useState } from 'react'

const useToggle = () => {
  const [isToggle, setIsToggle] = useState(false)
  const toggle = () => {
    setIsToggle((old) => !old)
  }
  return { isToggle, toggle, setIsToggle }
}

export default useToggle
