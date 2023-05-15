import { ethers } from 'ethers'
import { FC, useEffect, useState } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import useIsMounted from '../utils/hooks/useIsMounted'
import { useRouter } from 'next/router'
//detect current network and show warning according to that
const Detector: FC = () => {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [showAlert, setShowAlert] = useState('')
  const [msg1, setMsg1] = useState('')
  const [msg2, setMsg2] = useState('')
  const [msg3, setMsg3] = useState('')
  const [msg4, setMsg4] = useState('')
  const [url, setUrl] = useState('')
  const { isConnected } = useAccount()
  const [currentChainId, setCurrentChainId] = useState('')
  const [forceHide, setForceHide] = useState(false)
  const targetNetworkId = ['80001', '137', '1', '5', '3141', '314','20']
  const [route,setRoute] = useState('')
  const isMounted = useIsMounted()
  const router = useRouter()
  useEffect(()=> {
    const route = window.location.href.split('/')[2]
    setRoute(route)
  },[route])
  // const route = window.location.href.split('/')[2]
  const CHAINID: string = route=='www.gamestoweb3.com'?'137':'80001'
  const CHAINID2: string = route=='www.gamestoweb3.com'?'1':'5'
  const CHAINID3: string = route=='www.gamestoweb3.com'?'314':'20' || '3141'

//switch network function
  const onSwitchNetwork = async () => {
    const ethereum = (window as any).ethereum
    if (isConnected) {
      await switchNetwork?.(parseInt(CHAINID))
    } else {
      const provider = new ethers.providers.Web3Provider(ethereum, 'any')
      const { chainId } = await provider.getNetwork()
      let chain = parseInt(CHAINID)
      let chain2 = parseInt(CHAINID2)
      let chain3 = parseInt(CHAINID3)
      if (chainId !== chain && chainId !== chain2 && chainId !== chain3) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ethers.utils.hexValue(chain) }], // chainId must be in hexadecimal numbers
        })
      }
    }
  }

  useEffect(() => {
    if (chain?.id === parseInt(CHAINID) || (forceHide && isMounted)) {
      setShowAlert('false')
      return
    }
  }, [chain, CHAINID, forceHide, isMounted])

//detect network function
  const detectNetwork = () => {
    if (showAlert !== '') {
      window.ethereum.on('networkChanged', function (networkId: any) {
        setForceHide(false)
        setCurrentChainId(networkId)
        return networkId
      })
    } 
    if(showAlert == '') {
    let currentChainId = window?.ethereum?.networkVersion
    setCurrentChainId(currentChainId)
    return currentChainId
    }
  }

  //listen network change event from wallet
  const listenNetwork = () => {
    if (isConnected) {
      window.ethereum.on('networkChanged',  async function (networkId: any) {
        // console.log(networkId)
        
        if (targetNetworkId.includes(networkId)) {
          setCurrentChainId(networkId)
          if(!forceHide) {
            setShowAlert('false')
          }

          
        } else {
          setCurrentChainId('_')
          setShowAlert('false')
          
        }
      })
    }
  }

  // Handle Warning Alert
  const handleAlert = async () => {
    // console.log(isConnected)
    // console.log(currentChainId)
    if (!isConnected) return
    // console.log(currentChainId)
    if (targetNetworkId.includes(currentChainId)) {
      if (
        currentChainId === CHAINID ||
        currentChainId === CHAINID2 ||
        currentChainId === CHAINID3
      ) {
        // console.log('On Correct Network')
        setShowAlert('false')
        return
      } else {
        setUrl(
          CHAINID === '80001'
            ? 'https://www.gamestoweb3.com'
            : 'https://testnets.gamestoweb3.com'
        )
        setMsg1(
          `You are on ${
            CHAINID === '80001' ? 'Mainnet' : 'Testnet'
          } Switch Network to `
        )
        setMsg2(CHAINID === '80001' ? 'Testnet' : 'Mainnet')
        setMsg3('or Visit to')
        setMsg4(CHAINID === '80001' ? 'Mainnet' : 'Testnet')
        if (!forceHide && isMounted) {
          setShowAlert('true')
        }
        return
      }
    } else if (currentChainId !== '' && !targetNetworkId.includes(currentChainId)) {
      setMsg1(`Wrong Network Detected, Switch Network to `)
      setMsg2(CHAINID === '80001' ? 'Testnet' : 'Mainnet')
      setMsg3('')
      setMsg4('')
      if (!forceHide && isMounted) {
        // setShowAlert('true')
      }
      return
    }
  }

  // handle on click visit to another network
  const clickC = () => {
    window.open(url, '_blank')
  }

  useEffect(() => {
    listenNetwork()
    detectNetwork()
    handleAlert()
  })

  return (
    <>
      {showAlert === 'true' && router.asPath !== '/' ? (
        <div
          className={`text-black text-sm text-center px-6 py-1 border-0 rounded relative mb-4 bg-yellow-400`}
        >
          <span className="text-xl inline-block mr-16 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-16">
            <b className="capitalize">{'Warning'}! </b>
            {msg1}{' '}
            <a
              className="cursor-pointer underline"
              onClick={() => onSwitchNetwork()}
            >
              {msg2}
            </a>{' '}
            {msg3 ? msg3 : ''}{' '}
            <a className="cursor-pointer underline" onClick={() => clickC()}>
              {msg4 ? msg4 : ''}
            </a>
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-0.5 mr-6 outline-none focus:outline-none"
            onClick={() => setForceHide(true)}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  )
}

export default Detector
