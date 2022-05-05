import React, { useState } from 'react'
import useToggle from './useToggle'

type toastType = 'success' | 'error'

const useToast = () => {
  const { isToggle, setIsToggle } = useToggle()
  const [message, setMessage] = useState('')
  const [type, setType] = useState<toastType>('success')
  const openToast = ({
    message,
    type,
  }: {
    message: string
    type: toastType
  }) => {
    setIsToggle(true)
    setMessage(message)
    setType(type)
  }
  const closeToast = () => {
    setIsToggle(false)
  }
  return { isOpen: isToggle, message, type, openToast, handleClose: closeToast }
}

export default useToast
