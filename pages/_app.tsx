import { GoogleOAuthProvider } from '@react-oauth/google'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'
import Layout from '../components/Layout'
import { queryClient } from '../react-query/queryClient'
import '../styles/globals.css'

// wagmi connector configuration
const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [publicProvider()]
)

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

// Google API Key for sign in with google
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={client}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </GoogleOAuthProvider>
      </WagmiConfig>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
