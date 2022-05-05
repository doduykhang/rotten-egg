import React, { createContext, useContext, useEffect, useState } from 'react'
import useUserInfo from '../hooks/useUserInfo'
import User from '../models/User'

interface UserContextInterface {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isLoading: boolean
}

const UserContext = createContext<UserContextInterface | null>(null)

const useUserContext = () => {
  return useContext(UserContext)
}

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { data: userInfo } = useUserInfo()

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo?.data)
    }
    setIsLoading(false)
  }, [userInfo])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export default useUserContext
export { UserProvider }
