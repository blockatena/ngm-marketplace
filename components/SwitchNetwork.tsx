import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Connector, useConnect } from 'wagmi'
import { fromLeftAnimation, fromRightAnimation } from '../utils/animations'
import { ethers } from 'ethers'
import Spinner from './Spinner'
const CHAINID: string = process.env.NEXT_PUBLIC_CHAIN_ID || ''

type WalletOptionType = {
  img: string
  title: WalletType
  content: string
  isInactive?: boolean
  active?: boolean
}

type WalletType = 'MetaMask'

interface CardProps {
  connector: Connector<any, any, any>
  setMessage: Dispatch<SetStateAction<string>>
  switchSet: () => void
}

const switchNetworks: WalletOptionType[] = [
  {
    img: '/images/icons/metamask.png',
    title: 'MetaMask',
    content:
      'Available as a browser extension and as a mobile app. Metamask equips you with a key vault.',
  },
]

const Card: FC<CardProps> = ({ connector, setMessage, switchSet }) => {
  //   const { connect, isLoading, pendingConnector } = useConnect()
  const { name } = connector
  const wallet = switchNetworks.find((option) => option.title === name)
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    if (name === 'MetaMask' && !window.ethereum) {
      setMessage('Please Install MetaMask')
      return
    }
    let chain = parseInt(CHAINID)
    setLoading(true)
    await window.ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(chain) }], // chainId must be in hexadecimal numbers
      })
      .then(() => {
        setLoading(false)
        switchSet()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <motion.div
      className={`shadow-inner shadow-gray-400 overflow-ellipsis cursor-pointer h-75 p-2 w-full bg-dark_mild  md:w-52 lg:w-96 rounded-lg`}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
    >
      {/* {loading &&  (
        <div className="flex gap-2 py-1 items-center">
          <p className="rounded-full border-2 border-custom_yellow border-dotted  animate-spin h-6 w-6 lg:h-6 lg:w-6"></p>
          <p className="text-white font-poppins">Connecting</p>
        </div>
      )} */}
      <div className="h-36 grid place-items-center rounded-lg bg-gradient-to-r from-custom_gray_light to-custom_gray_dark">
        <Image
          src={wallet?.img || ''}
          alt="wallet_option"
          width="131px"
          height="126px"
        />
      </div>
      <p className="capitalize font-inter font-medium text-white text-center my-4 md:text-lg lg:text-xl">
        {name}
      </p>
      <p className="font-inter font-light text-white text-center md:text-xs">
        {wallet?.content}
      </p>
      <button
        className="btn-primary w-[200px] h-[40px] lg:w-[365px] lg:h-[57px] rounded-lg font-poppins lg:text-[25px]
            grid place-items-center"
        // onClick={() => setIsSuccessModalOpen(true)}
        onClick={() => handleClick()}
        disabled={loading}
      >
        <>{!loading ? 'Switch Network' : <Spinner color="black" />}</>
      </button>
    </motion.div>
  )
}

const SwitchNetworks: FC<{ switchSet: () => void }> = ({ switchSet }) => {
  const { connectors, error } = useConnect()
  const [message, setMessage] = useState('')

  return (
    <>
      <AnimatePresence>
        {(error || message) && (
          <motion.p
            className="text-custom_yellow text-lg pt-2 pb-4 text-center font-poppins"
            variants={fromLeftAnimation}
            initial="initial"
            animate="final"
            exit={{ opacity: 0 }}
            transition={{
              ease: 'easeInOut',
              duration: 0.25,
            }}
          >
            {error?.message || message}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="flex flex-col flex-wrap pb-28 gap-4 md:justify-start md:flex-row lg:justify-center">
        {connectors?.map((connector, index) => (
          <motion.div
            key={index}
            variants={fromRightAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.4,
              delay: (index + 1) / 2,
            }}
          >
            <Card
              connector={connector}
              switchSet={switchSet}
              setMessage={setMessage}
            />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default SwitchNetworks
