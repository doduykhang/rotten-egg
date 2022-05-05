import { AxiosResponse } from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import Textfield from '../components/form/Textfield'
import useUserContext from '../contexts/UserProvider'
import useLogin from '../hooks/useLogin'
import { storeAccessToken, storeRefreshToken } from '../TokenService'

const login = () => {
  const userContext = useUserContext()
  const router = useRouter()
  const handleError = (err: any) => {
    console.log(err)
  }

  const handleSuccess = (data: AxiosResponse<any, any>) => {
    storeAccessToken(data.data.tokens.accessToken)
    storeRefreshToken(data.data.tokens.refreshToken)
    userContext?.setUser(data.data.info)
    router.push('/')
    form.setSubmitting(false)
  }

  const { mutate } = useLogin({
    onError: handleError,
    onSuccess: handleSuccess,
  })

  const form = useFormik<any>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      mutate(values)
    },
  })
  return (
    <div className="flex h-full items-center justify-center text-black ">
      <form className="flex flex-col space-y-3" onSubmit={form.handleSubmit}>
        <Textfield formik={form} name="email" label="Email" />

        <Textfield
          formik={form}
          name="password"
          label="Password"
          type="password"
        />
        <button className="text-white" type="submit">
          login
        </button>
        {form.isSubmitting && <div>Loading...</div>}
      </form>
    </div>
  )
}

export default login
