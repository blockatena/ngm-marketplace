import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import {
  fromLeftAnimation,
  fromRightAnimation,
  fromTopAnimation,
} from '../utils/animations'

const Header: FC = () => {
  const router = useRouter()
  const { active, account } = useWeb3React<Web3Provider>()
  const handleClick = () => {
    router.push('/connect-wallet')
  }

  return (
    <nav className="p-4 pt-6 lg:px-16">
      <div className="grid grid-cols-12 gap-1">
        <motion.div
          className="col-span-3 md:col-span-6 "
          variants={fromLeftAnimation}
          initial="initial"
          animate="final"
          transition={{
            ease: 'easeInOut',
            duration: 0.6,
            delay: 0.4,
          }}
        >
          <div className="md:hidden">
            <Image
              src="/img/icons/logo.svg"
              alt="nftzone_logo"
              width="100px"
              height="46px"
              className="cursor-pointer"
              onClick={() => router.push('/')}
            />
          </div>
          <div className="hidden md:block">
            <Image
              src="/img/icons/logo.svg"
              alt="nftzone_logo"
              width="188px"
              height="64px"
              className="cursor-pointer"
              onClick={() => router.push('/')}
            />
          </div>
        </motion.div>
        <div className="col-span-9 md:col-span-6 flex justify-evenly gap-2">
          <motion.div
            className="relative h-9 md:w-56"
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
                src="/img/icons/search.svg"
                alt="search"
                width="25px"
                height="15px"
              />
            </span>
            <input
              type="text"
              placeholder="|"
              className="w-full h-full px-7 rounded placeholder:text-custom_yellow font-light text-white 
              focus:border focus:border-custom_yellow focus:outline-none bg-custom_grey md:h-11"
            />
            <span className="absolute right-3 top-2 w-fit z-20 text-white text-sm cursor-pointer md:top-3">
              X
            </span>
          </motion.div>

          <motion.button
            className="btn-primary w-[150px] md:w-[158px] lg:w-[173px] h-[40px] md:h-[33px] lg:h-[39px] text-[12px] md:text-[16px] lg:text-[18px] cut-corners"
            onClick={handleClick}
            variants={fromRightAnimation}
            initial="initial"
            animate="final"
            transition={{
              ease: 'easeIn',
              duration: 0.2,
              delay: 1.4,
            }}
          >
            {!active ? (
              'Connect Wallet'
            ) : (
              <span>
                Connected{' '}
                <span className="lg:text-xs">
                  {account?.substring(0, 4)}...
                  {account?.substring(account.length - 2)}
                </span>
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

export default Header
