import { AppProps } from 'next/dist/shared/lib/router/router'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />

      <div className="fixed inset-0 bg-white text-white">Admin page</div>
    </div>
  )
}

export default MyApp
