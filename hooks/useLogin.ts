import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import axios from '../axios.config'

const login = (request: any) => {
  return axios.post('/api/user/login', request)
}

interface Props {
  onSuccess: (data: AxiosResponse<any, any>) => void
  onError: (err: any) => void
}

const useLogin = ({ onError, onSuccess }: Props) => {
  const { mutate } = useMutation((request: any) => login(request), {
    onSuccess: onSuccess,
    onError: onError,
  })
  return { mutate }
}

export default useLogin
