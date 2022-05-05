import axios from '../axios.config'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import userState from '../atoms/UserAtom'

const fetchUserInfo = () => {
  return axios.get('/api/user/info')
}

const useUserInfo = () => {
  const [user, setUser] = useRecoilState(userState)
  const { data } = useQuery('user-info', fetchUserInfo, {
    onSuccess: (data) => setUser(data.data),
  })

  return { data }
}

export default useUserInfo
