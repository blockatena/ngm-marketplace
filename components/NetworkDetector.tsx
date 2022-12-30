
import { FC, useEffect,useState } from 'react'
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'
import { ethers } from 'ethers'
const CHAINID: string = process.env.NEXT_PUBLIC_CHAIN_ID || ''
const Detector: FC = () => {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [showAlert, setShowAlert] = useState('');
  const [msg1,setMsg1] = useState('')
  const [msg2,setMsg2] = useState('')
  const [msg3,setMsg3] = useState('')
  const [msg4, setMsg4] = useState('')
  const [url,setUrl] = useState('')
  const { isConnected } = useAccount()
  const [currentChainId,setCurrentChainId] = useState('')
  const targetNetworkId = ['80001', '137','1','5']

    const onSwitchNetwork = async () => {
      const ethereum = (window as any).ethereum
      if(isConnected){
        await switchNetwork?.(parseInt(CHAINID))
      } else {
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        const { chainId } = await provider.getNetwork()
        let chain = parseInt(CHAINID)
        if (chainId !== chain) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ethers.utils.hexValue(chain) }], // chainId must be in hexadecimal numbers
          })
        }
      }
    }

    useEffect(() => {
      if (chain?.id === parseInt(CHAINID)) {
        setShowAlert('false')
        return
      } 
    }, [chain])

  const detectNetwork = () => {
    if(showAlert !== ''){
      window.ethereum.on('networkChanged', function (networkId: any) {
        setCurrentChainId(networkId)
        return networkId
      })
    } 
    let currentChainId = window.ethereum.networkVersion
    setCurrentChainId(currentChainId)
    return currentChainId
  }

  async function listenNetwork() {
    if(isConnected){
    window.ethereum.on('networkChanged', function (networkId: any) {
      // console.log(networkId)
      if (targetNetworkId.includes(networkId)) {
        setShowAlert('false')
      } else {
        setShowAlert('true')
      }
    })
  }
  }

  
  const handleAlert = async ()=> {
    if(!isConnected) return;
    if (targetNetworkId.includes(currentChainId)) {
      if (currentChainId === CHAINID) {
        // console.log('On Correct Network')
        setShowAlert('false')
        return
      } else {
        setUrl(
          (CHAINID === '80001' || CHAINID === '5')
            ? 'https://www.gamestoweb3.com'
            : 'https://testnets.gamestoweb3.com'
        )
        setMsg1(
          `You are on ${
            CHAINID === '80001' || CHAINID === '5' ? 'Mainnet' : 'Testnet'
          } Switch Network to `
        )
        setMsg2(CHAINID === '80001' || CHAINID === '5' ? 'Testnet' : 'Mainnet')
        setMsg3('or Visit to')
        setMsg4(CHAINID === '80001' || CHAINID === '5' ? 'Mainnet' : 'Testnet')
        setShowAlert('true')
        return
      }
    } else {
      setMsg1(`Wrong Network Detected, Switch Network to `)
      setMsg2(CHAINID === '80001' || CHAINID === '5' ? 'Testnet' : 'Mainnet')
      setMsg3('')
      setMsg4('')
      setShowAlert('true')
      return
    }
  }

    const clickC = () => {
      window.open(url, '_blank')
    }

  useEffect(()=> {
    listenNetwork()
    detectNetwork()
    handleAlert()
  })

  return (
    <>
      {showAlert === 'true' ? (
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
            onClick={() => setShowAlert('false')}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  )
}

export default Detector
