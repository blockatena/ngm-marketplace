import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function useWalletConnect() {
  const router = useRouter()
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })
  const { activate, deactivate, active } = useWeb3React<Web3Provider>()
  const [message, setMessage] = useState('')

  const handleConnect = async (goBack?: boolean) => {
    if (!window.ethereum) {
      setMessage('Please Install Metamask')
      return
    }
    if (!active) {
      try {
        await activate(injectedConnector)
        sessionStorage.setItem('isConnected', 'yes')
        goBack && router.back()
      } catch (e) {
        console.error(e)
      }
    } else {
      try {
        deactivate()
        sessionStorage.clearItem('isConnected')
      } catch (e) {
        console.error(e)
      }
    }
  }

  return { handleConnect, message }
}
