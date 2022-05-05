import React, { useEffect } from 'react'
interface Props {
  isOpen: boolean
  handleClose: () => void
  message: string
  type: 'success' | 'error'
}
const Toast: React.FC<Props> = ({ isOpen, handleClose, type, message }) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isOpen)
      timeout = setTimeout(() => {
        handleClose()
      }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [isOpen])
  return (
    <div
      className={`${isOpen ? 'absolute' : 'hidden'} ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } bottom-5 z-50 flex h-10 w-52 items-center rounded-lg  px-5 text-base text-white`}
    >
      {message}
    </div>
  )
}

export default Toast
