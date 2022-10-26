import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useRouter } from 'next/router'

export default function useWalletConnect() {
  const router = useRouter()
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })
  const { activate, deactivate, active } = useWeb3React<Web3Provider>()

  const handleConnect = async () => {
    if (!window.ethereum) {
      console.log('Please Install Metamask')
      return
    }
    if (!active) {
      try {
        await activate(injectedConnector)
        router.push('/collections')
      } catch (e) {
        console.error(e)
      }
    } else {
      try {
        deactivate()
      } catch (e) {
        console.error(e)
      }
    }
  }

  return handleConnect
}
