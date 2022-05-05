import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from 'recoil'
import { UserProvider } from '../contexts/UserProvider'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
const client = new QueryClient()

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropWithLayout) {
  const SubLayout = Component.getLayout ?? ((page) => page)
  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <UserProvider>
          <Layout>{SubLayout(<Component {...pageProps} />)}</Layout>
        </UserProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default MyApp
