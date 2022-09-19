import type { AppProps } from 'next/app'

import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-fixed bg-cover flex justify-center bg-gradient-to-r from-dark_mild to-dark_heavy">
      <div
        className="screen-container w-full bg-fixed bg-cover"
        style={{
          backgroundImage: "url('/img/background.png')",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </div>
  )
}

export default MyApp
