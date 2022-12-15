
import { FC, useEffect,useState } from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'
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
  // const [current, setCurrent] = useState()
  const targetNetworkId = ['80001', '137']
  // const [color,setColor] = useState("red")

    // useEffect(() => {
    //   if (chain?.id === parseInt(CHAINID)) {
    //     setIsChainCorrect(true)
    //     return
    //   } else {
    //     setIsChainCorrect(false)
    //     return
    //   }
    // }, [chain])

    const onSwitchNetwork = async () => {
      await switchNetwork?.(parseInt(CHAINID))
    }

    useEffect(() => {
      if (chain?.id === parseInt(CHAINID)) {
        setShowAlert('false')
        return
      } 
    }, [chain])

  const detectNetwork = () => {
    
    let currentChainId = window.ethereum.networkVersion
    return currentChainId
  }

  const check = async ()=> {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    provider.on('chainChanged', (network) => {
      console.log(network.chainId)
      if(`${network.chainId}` === targetNetworkId[0] ||
      `${network.chainId}` === targetNetworkId[1]){
        setShowAlert('false')
      } else {
        setShowAlert('true')
      }
    })
  }

    // const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    // provider.on('chainChanged', (network) => {
    //   console.log(network.chainId)
    //   if (
    //     `${network.chainId}` === targetNetworkId[0] ||
    //     `${network.chainId}` === targetNetworkId[1]
    //   ) {
    //     setShowAlert('false')
    //   } else {
    //     setShowAlert('true')
    //   }
    // })

  
  const handleAlert =async()=> {
    if(showAlert !=='') return;
    let currentChainId = await detectNetwork()
    console.log(currentChainId)
    if (
      currentChainId === targetNetworkId[0] ||
      currentChainId === targetNetworkId[1]
    ) {
      if (currentChainId === CHAINID) {
        console.log('On Correct Network')
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
          } Switch Network to`
        )
        setMsg2(CHAINID === '80001' ? 'Testnet' : 'Mainnet')
        setMsg3('or Visit to')
        setMsg4(CHAINID === '80001' ? 'Mainnet' : 'Testnet')
        setShowAlert('true')
        return;
      }
    } else {
      setMsg1(`Wrong Network Detected, Switch Network to `)
      setMsg2(CHAINID === '80001' ? 'Testnet' : 'Mainnet')
      setShowAlert('true')
      return;
    }
  }

    const clickC = () => {
      window.open(url, '_blank')
    }

  useEffect(()=> {
    check()
    detectNetwork()
    handleAlert()
  })

  return (
    <>
      {showAlert === 'true' ? (
        <div
          className={`text-white px-6 py-4 border-0 rounded relative mb-4 bg-yellow-500`}
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
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
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
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
