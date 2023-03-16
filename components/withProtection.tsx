import { useRouter } from 'next/router'
import type { FC, ReactElement } from 'react'
import { useEffect,useState } from 'react'
import { useAccount } from 'wagmi'
import useIsMounted from '../utils/hooks/useIsMounted'
import { useConnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
type withProtectionFn = (_Component: FC) => FC

// With Protection : to Handle if user is not connected with wallets 
const withProtection: withProtectionFn = (Component) => {
  const Authenticated: FC = (props): ReactElement | null => {
    const { isConnected } = useAccount()
    const router = useRouter()
    const isMounted = useIsMounted()
    const [currentChainId, setCurrentChainId] = useState('00')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const targetNetworkId = ['80001', '137', '1', '5', '3141', '314','20']
    const { connect } = useConnect({
      connector:new MetaMaskConnector()
    })


    // detect current network
    const detectNetwork = () => {
      if (currentChainId !== '') {
        window.ethereum.on('networkChanged', function (networkId: any) {
          if (targetNetworkId.includes(networkId)) {
            setCurrentChainId(networkId)
            connect()
            return networkId
          } else {
            setCurrentChainId('0')
            return ''
          }
        })
      }
      else if (isConnected) {
        let currentChain = window.ethereum.networkVersion
        console.log(currentChain)
        if (targetNetworkId.includes(currentChain)) {
          setCurrentChainId(currentChain)
          connect()
          return currentChain
        } else {
          setCurrentChainId('0')
          return ''
        }
      }
    }
    
    useEffect(() => {
      detectNetwork()
    })


    // If not connected : redirect to connect-wallet page
    useEffect(() => {
      if (!isConnected && !targetNetworkId.includes(currentChainId) && isMounted) {
        router.push('/connect-wallet')
      }
    }, [isConnected, targetNetworkId, currentChainId, router, isMounted])


    const isRenderable = isConnected || targetNetworkId.includes(currentChainId)
    const isRedirectable =  !isConnected;

    return isMounted && isRenderable ? (
      <Component {...props} />
    ) : isMounted  && isRedirectable ? (
      <div className="min-h-screen text-white font-poppins text-center text-lg pt-8">
        Redirecting...
      </div>
    ) : null
  }
  return Authenticated
}

export default withProtection
