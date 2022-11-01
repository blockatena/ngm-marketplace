import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'
import Layout from '../components/Layout'
import { queryClient } from '../react-query/queryClient'
import '../styles/globals.css'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
})

// const queryClientConfig = {
//   defaultOptions: {
//     queries: {
//       retry: 3,
//       refetchOnMount: true,
//       refetchOnWindowFocus: false,
//     },
//   },
// }

// const queryClient = new QueryClient(queryClientConfig)

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: 'home'
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
