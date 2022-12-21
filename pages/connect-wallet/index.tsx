import { motion } from 'framer-motion'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import WalletOptions from '../../components/WalletOptions'
import { opacityAnimation } from '../../utils/animations'
import SwitchNetworks from '../../components/SwitchNetwork'

const ConnectPage: NextPage = () => {
  const router = useRouter()
  const [isChainCorrect,setIsChainCorrect] = useState<boolean>()
  const { isConnected } = useAccount()

  useLayoutEffect(() => {
    isConnected && router.back()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected])

const targetNetworkId = ['80001' , '137','0x89', '0x13881']
const switchSet = ()=> {
  setIsChainCorrect(true)
}
const checkNetwork = async (id:string) => {
  if(isChainCorrect) return
  if(id==='')
  if (window.ethereum) {
    
    const currentChainId = id
      ? id !== ''
        ? id
        : window.ethereum.networkVersion
      : window.ethereum.networkVersion
    console.log(currentChainId)
    // return true if network id is the same
    if (
      currentChainId === targetNetworkId[0] ||
      currentChainId === targetNetworkId[1] ||
      currentChainId === targetNetworkId[2] ||
      currentChainId === targetNetworkId[3]
    ) {
      setIsChainCorrect(true)
      return true
    }
    // return false is network id is different
    setIsChainCorrect(false)
    return false;

  }  
};

useEffect(()=> {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', (chainId: any) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      // window.location.reload()
      checkNetwork(chainId)
      return
    })
    // return 
  }
  checkNetwork('')
})


  return (
    <main className="p-4 pt-6 lg:px-16 min-h-screen">
      <motion.div
        variants={opacityAnimation}
        initial="initial"
        animate="final"
        transition={{
          ease: 'easeInOut',
          duration: 0.6,
          delay: 0.4,
        }}
      >
        <h6 className="mb-4 text-sm md:text-lg font-poppins">
          <span
            className="text-gray-300 cursor-pointer hover:text-white hover:font-medium"
            onClick={() => router.push('/')}
          >
            Home
          </span>{' '}
          <span className="text-custom_yellow">|</span>{' '}
          <span className="text-white font-medium">connect wallet</span>
        </h6>
        <div className="bg-connectHero placeholder:bg-fixed bg-cover mb-8  h-80 w-full text-white flex items-center px-8 lg:mb-14">
          <div className="h-56 rounded-lg bg-custom_purple opacity-70 w-full lg:w-2/5 grid place-items-center">
            <div className="border-l-4 border-custom_yellow px-2">
              <p className="text-custom_yellow font-inter font-light md:text-2xl lg:text-4xl">
                Welcome!
              </p>
              <p className="text-white font-semibold md:text-3xl lg:text-5xl font-poppins">
                Connect Wallet
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      {isChainCorrect && <WalletOptions />}
      {!isChainCorrect && <SwitchNetworks switchSet={switchSet} />}
    </main>
  )
}

export default ConnectPage
