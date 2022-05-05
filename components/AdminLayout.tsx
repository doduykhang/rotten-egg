import React from 'react'
import Sidebar from './Sidebar'

const AdminLayout: React.FC = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div>{children}</div>
    </div>
  )
}

export default AdminLayout
