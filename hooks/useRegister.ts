import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import axios from '../axios.config'

const register = (request: any) => {
  return axios.post('/api/user/register', request)
}

interface Props {
  onSuccess: (data: AxiosResponse<any, any>) => void
  onError: (err: any) => void
}

const useRegister = ({ onError, onSuccess }: Props) => {
  const { mutate } = useMutation((request: any) => register(request), {
    onSuccess: onSuccess,
    onError: onError,
  })
  return { mutate }
}

export default useRegister
