import Cookies from 'universal-cookie'

const cookies = new Cookies()

const storeAccessToken = (token: string) => {
  cookies.set('accessToken', token, { path: '/' })
}

const storeRefreshToken = (token: string) => {
  cookies.set('refreshToken', token, { path: '/' })
}

const getAccessToken = () => {
  return cookies.get('accessToken') || ''
}

const getRefeshToken = () => {
  return cookies.get('refreshToken') || ''
}

const removeToken = () => {
  cookies.remove('accessToken', { path: '/' })
  cookies.remove('refreshToken', { path: '/' })
}

export {
  storeAccessToken,
  storeRefreshToken,
  getAccessToken,
  getRefeshToken,
  removeToken,
}
