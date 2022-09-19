import type { AppProps } from 'next/app'

import Header from '../components/Header'
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
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
