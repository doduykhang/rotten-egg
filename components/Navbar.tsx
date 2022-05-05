import React from 'react'
import useUserContext from '../contexts/UserProvider'
import { FaAngleDown } from 'react-icons/fa'
import useToggle from '../hooks/utils/useToggle'
import Link from 'next/link'
import { removeToken } from '../TokenService'
import { useRouter } from 'next/router'
const Navbar = () => {
  const userContext = useUserContext()
  const router = useRouter()

  const { isToggle, toggle } = useToggle()

  const handleLogout = () => {
    removeToken()
    userContext?.setUser(null)
    router.push('/')
  }

  return (
    <div className="sticky mb-2 flex items-center justify-between bg-gray-800  px-4 py-3 text-white">
      <div className="flex gap-4">
        <div
          onClick={() => router.push('/')}
          className={`cursor-pointer text-xl ${
            router.pathname === '/' ? 'text-white' : 'text-gray-500'
          }`}
        >
          Home
        </div>
        <div
          onClick={() => router.push('/search')}
          className={`cursor-pointer text-xl ${
            router.pathname === '/search' ? 'text-white' : 'text-gray-500'
          }`}
        >
          Search
        </div>
        <div
          onClick={() => router.push('/user/info')}
          className={`cursor-pointer text-xl ${
            router.pathname === '/user/info' ? 'text-white' : 'text-gray-500'
          }`}
        >
          Mylist
        </div>
      </div>
      <div className="relative flex  items-center text-2xl">
        {userContext?.user ? (
          <>
            <p>{userContext.user.displayName}</p>
            <FaAngleDown className="cursor-pointer" onClick={toggle} />
            <div
              className={`${
                isToggle ? 'absolute' : 'hidden'
              } absolute top-full right-0 rounded bg-black p-2`}
            >
              <Link href={'/user/info'}>
                <p className="cursor-pointer rounded px-2 hover:bg-gray-600">
                  Info
                </p>
              </Link>
              <p
                onClick={handleLogout}
                className="cursor-pointer rounded px-2 hover:bg-gray-600"
              >
                Logout
              </p>
            </div>
          </>
        ) : (
          <div className="space-x-4">
            <button
              className="border-2 border-red-500 px-4 py-2 text-xl font-bold"
              onClick={() => router.push('/login')}
            >
              Login
            </button>
            <button
              className="border-2 border-red-500 bg-red-600 px-4 py-2 text-xl font-bold"
              onClick={() => router.push('/register')}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
