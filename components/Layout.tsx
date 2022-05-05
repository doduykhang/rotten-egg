import React from 'react'
import Navbar from './Navbar'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex h-screen w-screen flex-col  bg-black">
      <Navbar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}

export default Layout
