import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from 'wagmi'
import Layout from '../components/Layout'
import '../styles/globals.css'

// import { alchemyProvider } from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  // alchemyProvider({ apiKey: 'yourAlchemyApiKey' }),
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: 'home'
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <WagmiConfig client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  )
}

export default MyApp
