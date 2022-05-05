import axios from 'axios'
import {
  getAccessToken,
  storeAccessToken,
  getRefeshToken,
} from './TokenService'

import React from 'react'

const instance = axios.create({ baseURL: 'http://localhost:8080' })

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (config && config.headers && token) {
      config.headers['Authorization'] = 'Bearer ' + token // for Spring Boot back-end
      //   config.headers['x-access-token'] = token // for Node.js Express back-end
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config
    if (originalConfig.url !== '/auth/signin' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          const rs = await instance.post('/api/auth/token/refresh', {
            refreshToken: getRefeshToken(),
          })
          const { accessToken } = rs.data
          storeAccessToken(accessToken)
          return instance(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }
    return Promise.reject(err)
  }
)

const getServerInstance = (accessToken: string, refreshToken: string) => {
  const privateInstance = axios.create({ baseURL: 'http://localhost:8080' })

  privateInstance.interceptors.request.use(
    (config) => {
      if (config && config.headers) {
        config.headers['Authorization'] = 'Bearer ' + accessToken // for Spring Boot back-end
        //   config.headers['x-access-token'] = token // for Node.js Express back-end
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  privateInstance.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config

      if (originalConfig.url !== '/auth/signin' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          try {
            const rs = await instance.post('/api/auth/token/refresh', {
              refreshToken: refreshToken,
            })

            const { accessToken } = rs.data
            return instance(originalConfig)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }
      return Promise.reject(err)
    }
  )
  return privateInstance
}

export { getServerInstance }
export default instance
