import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout'
import '../styles/globals.css'

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
    </Web3ReactProvider>
  )
}

export default MyApp
