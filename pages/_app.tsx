import type { AppProps } from 'next/app'

import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-fixed bg-cover bg-gradient-to-r from-dark_mild to-dark_heavy">
      <div
        className="bg-fixed bg-cover bg-gradient-to-r from-dark_mild to-dark_heavy"
        style={{
          height: '100vh',
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
