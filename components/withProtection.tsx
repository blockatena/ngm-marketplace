import { useRouter } from 'next/router'
import type { FC, ReactElement } from 'react'
import { useEffect,useState } from 'react'
import { useAccount } from 'wagmi'
import useIsMounted from '../utils/hooks/useIsMounted'
import { useConnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
type withProtectionFn = (_Component: FC) => FC

const withProtection: withProtectionFn = (Component) => {
  const Authenticated: FC = (props): ReactElement | null => {
    const { isConnected } = useAccount()
    const router = useRouter()
    const isMounted = useIsMounted()
    const [currentChainId, setCurrentChainId] = useState('')
    const targetNetworkId = ['80001', '137', '1', '5']
    const { connect } = useConnect({
      connector:new MetaMaskConnector()
    })

    const detectNetwork = () => {
      if (currentChainId !== '') {
        window.ethereum.on('networkChanged', function (networkId: any) {
          if (targetNetworkId.includes(networkId)) {
            setCurrentChainId(networkId)
            return networkId
          } else {
            setCurrentChainId('0')
            return ''
          }
        })
      }
      if (isConnected) {
        let currentChain = window.ethereum.networkVersion
        if (targetNetworkId.includes(currentChain)) {
          setCurrentChainId(currentChain)
          return currentChain
        } else {
          setCurrentChainId('0')
          return ''
        }
      }
    }
    const reConnect = () => {
      if (currentChainId !== '' && !isConnected) {
        connect()
      }
    }

    useEffect(() => {
      detectNetwork()
      reConnect()
    })

    useEffect(() => {
      if (!isConnected && !currentChainId) router.push('/connect-wallet')

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected])
    // console.log('ismount: ', isMounted)
    // console.log('isconnected: ', isConnected)
    // console.log('currentChain: ', currentChainId)

    return isConnected &&  isMounted ? (
      <Component {...props} />
    ) : isMounted && !currentChainId && !isConnected ? (
      <div className="min-h-screen text-white font-poppins text-center text-lg pt-8">
        Redirecting...
      </div>
    ) : null
  }
  return Authenticated
}

export default withProtection
