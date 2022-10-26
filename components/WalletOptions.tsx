import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { FC } from 'react'

import { fromLeftAnimation, fromRightAnimation } from '../utils/animations'
import useWalletConnect from '../utils/hooks/useWalletConnect'

type WalletOptionType = {
  img: string
  title: WalletType
  content: string
  isInactive?: boolean
  active?: boolean
}

type WalletType =
  | 'portis'
  | 'metamask'
  | 'coinbase wallet'
  | 'osmosis'
  | 'phantom'

interface CardProps extends WalletOptionType {
  handleConnect: (_goBack?: boolean) => Promise<void>
}

const walletOptions: WalletOptionType[] = [
  {
    img: '/images/icons/metamask.png',
    title: 'metamask',
    content:
      'Available as a browser extension and as a mobile app. Metamask equips you with a key vault.',
  },
]

const Card: FC<CardProps> = ({
  img,
  title,
  content,
  isInactive,
  handleConnect,
  active,
}) => {
  let shadow
  if (active && title === 'metamask') {
    shadow = 'shadow-lg shadow-custom_yellow'
  } else {
    shadow = 'shadow-inner shadow-gray-400'
  }
  return (
    <motion.div
      style={
        isInactive ? { backgroundColor: '#464748', cursor: 'default' } : {}
      }
      className={`${shadow} overflow-ellipsis cursor-pointer h-72 p-2 w-full bg-dark_mild  md:w-52 lg:w-96 rounded-lg`}
      onClick={() => handleConnect(true)}
      whileHover={{ scale: 1.1 }}
    >
      <div className="h-36 grid place-items-center rounded-lg bg-gradient-to-r from-custom_gray_light to-custom_gray_dark">
        <Image src={img} alt="wallet_option" width="131px" height="126px" />
      </div>
      <p className="capitalize font-inter font-medium text-white text-center my-4 md:text-lg lg:text-xl">
        {title}
      </p>
      <p className="font-inter font-light text-white text-center md:text-xs">
        {content}
      </p>
    </motion.div>
  )
}

const WalletOptions: FC = () => {
  const { active } = useWeb3React<Web3Provider>()
  const { handleConnect, message } = useWalletConnect()

  return (
    <>
      <AnimatePresence>
        {message && (
          <motion.p
            className="text-custom_yellow text-lg py-2 text-center font-poppins"
            variants={fromLeftAnimation}
            initial="initial"
            animate="final"
            exit={{ opacity: 0 }}
            transition={{
              ease: 'easeInOut',
              duration: 0.25,
            }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="flex flex-col flex-wrap pb-28 gap-4 md:justify-start md:flex-row lg:justify-center">
        {walletOptions?.map(({ content, img, title, isInactive }, index) => (
          <motion.div
            key={title}
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
              content={content}
              img={img}
              title={title}
              isInactive={isInactive}
              handleConnect={handleConnect}
              active={active}
            />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default WalletOptions
