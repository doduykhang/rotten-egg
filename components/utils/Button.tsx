import React from 'react'

interface Props {
  type?: 'submit' | 'button' | 'reset' | undefined
  color?: 'success' | 'danger' | 'warning'
  onClick?: (e: any) => void
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  type = 'button',
  color = 'success',
}) => {
  const colors = {
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colors[color]} rounded-lg  p-3 font-bold text-gray-100`}
    >
      {children}
    </button>
  )
}

export default Button
