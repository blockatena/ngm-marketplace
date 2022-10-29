import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import {
  fromLeftAnimation,
  fromRightAnimation,
  fromTopAnimation,
} from '../utils/animations'
import useWindowDimensions from '../utils/hooks/useWindowDimensions'

const ConnectButton: FC = () => {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    !isConnected && router.push('/connect-wallet')
  }
  return (
    <motion.button
      className="btn-primary cut-corners w-[120px] md:w-[158px] lg:w-[173px] h-[29px] md:h-[33px] lg:h-[39px] 
      text-[12px] md:text-[16px] lg:text-[18px] disabled:bg-gray-500"
      onClick={handleClick}
      variants={fromRightAnimation}
      initial="initial"
      animate="final"
      transition={{
        ease: 'easeIn',
        duration: 0.2,
        delay: 1.4,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isConnected}
    >
      {!isConnected && router.asPath === '/' ? (
        'Join Community'
      ) : !isConnected ? (
        'Connect Wallet'
      ) : (
        <span>
          {isHovered ? 'Disconnect' : 'Connected'}{' '}
          <span className="lg:text-xs">
            {address?.substring(0, 4)}...
            {address?.substring(address.length - 2)}
          </span>
        </span>
      )}
    </motion.button>
  )
}

const Search: FC = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [searchWidth, setSearchWidth] = useState('')

  useEffect(() => {
    if (isClicked) setSearchWidth('w-[120px]')
    else setSearchWidth('w-[33px]')
  }, [isClicked])

  return (
    <>
      {/* DESKTOP */}
      <motion.div
        className="hidden md:block relative h-9 md:w-56"
        variants={fromTopAnimation}
        initial="initial"
        animate="final"
        transition={{
          ease: 'easeInOut',
          duration: 0.4,
          delay: 1,
        }}
      >
        <span className="absolute left-1 top-2 w-fit z-20 text-primary font-bold md:top-3">
          <Image
            src="/images/icons/search.svg"
            alt="search"
            width="25px"
            height="15px"
          />
        </span>
        <input
          type="text"
          className="w-full h-full px-7 rounded caret-custom_yellow placeholder:text-custom_yellow font-light text-white 
      focus:border focus:border-custom_yellow focus:outline-none bg-custom_grey md:h-11"
        />
        <span className="absolute right-3 top-2 w-fit z-20 text-[#898989] font-light text-sm cursor-pointer md:top-3">
          X
        </span>
      </motion.div>
      {/* MOBILE */}
      <div
        className={`bg-custom_grey h-[33px] md:hidden ${
          !isClicked && 'p-1'
        } transition-all duration-500 flex 
                justify-end items-center gap-1 ${searchWidth}
                ${!isClicked ? 'rounded-full' : 'rounded-md'}`}
      >
        <Image
          src="/images/icons/search.svg"
          alt="search"
          width="25px"
          height="15px"
          onClick={() => setIsClicked((prev) => !prev)}
        />
        <input
          type="text"
          className={`${
            isClicked ? 'w-full' : 'hidden'
          } h-full pl-1 rounded caret-custom_yellow placeholder:text-custom_yellow text-[#898989] font-light
                focus:border focus:border-custom_yellow focus:outline-none bg-custom_grey md:h-11`}
        />
      </div>
    </>
  )
}

const Logo: FC = () => {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const [clientWidth, setClientWidth] = useState(0)

  useEffect(() => {
    setClientWidth(width)
  }, [width])

  return (
    <motion.div
      variants={fromLeftAnimation}
      initial="initial"
      animate="final"
      transition={{
        ease: 'easeInOut',
        duration: 0.6,
        delay: 0.4,
      }}
    >
      <Image
        src="/images/icons/logo.svg"
        alt="nftzone_logo"
        width={clientWidth > 768 ? '188px' : '100px'}
        height={clientWidth > 768 ? '64px' : '46px'}
        className="cursor-pointer"
        onClick={() => router.push('/')}
      />
    </motion.div>
  )
}

const Header: FC = () => {
  const router = useRouter()

  return (
    <header className="p-4 pt-6 lg:px-16 bg-transparent absolute top-0 left-0 right-0">
      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-3 md:col-span-6">
          <Logo />
        </div>
        <div className="col-span-9 md:col-span-6 flex justify-end gap-2 md:gap-6 lg:gap-16">
          {router.asPath !== '/' && <Search />}
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}

export default Header
