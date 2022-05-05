import React, { Children, useState } from 'react'
import { Dialog } from '@headlessui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const MyDialog: React.FC<Props> = ({ children, isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 overflow-y-auto p-1 pt-[25vh]"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500/50" />
      <div className="relative mx-auto max-w-xl bg-gray-800 p-3 text-white">
        {children}
      </div>
    </Dialog>
  )
}

export default MyDialog
