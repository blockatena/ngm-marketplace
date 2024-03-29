import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { AiOutlineDisconnect } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { useAccount, useDisconnect } from 'wagmi'
import { fromLeftAnimation, fromRightAnimation } from '../utils/animations'
import useIsMounted from '../utils/hooks/useIsMounted'
import useWindowDimensions from '../utils/hooks/useWindowDimensions'
import { INNER_BOX_STYLE, OUTER_BOX_STYLE } from './SectionContainer'


// Connect wallet button
const ConnectButton: FC = () => {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const isMounted = useIsMounted()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    // if (isMounted && !isConnected && router.asPath === '/') {
    //   router.push('/profile')
    //   return
    // }
    if (!isConnected) router.push('/connect-wallet')
    if (isConnected) setIsOpen((prev) => !prev)
    // isMounted && !isConnected && router.push('/connect-wallet')
  }

  const handleDisconnect = () => {
    setIsOpen(false)
    disconnect()
  }

  const handleProfile = () => {
    setIsOpen(false)
    router.push('/profile')
  }

  return (
    <div className="relative flex items-center gap-2">
      {(isMounted && isConnected) &&
        (router.asPath !== '/' && (
          <motion.div
            variants={fromRightAnimation}
            initial="initial"
            animate="final"
            transition={{
              ease: 'easeIn',
              duration: 0.2,
              delay: 1,
            }}
          >
            <CgProfile
              className="text-[#B10DAD] hover:text-[#14A4BD] text-lg lg:text-5xl cursor-pointer"
              onClick={handleProfile}
            />
          </motion.div>
        ))}
      {router.asPath !== '/' && (
        <motion.button
          //   className="btn-primary cut-corners w-[120px] md:w-[158px] lg:w-[173px] h-[29px] md:h-[33px] lg:h-[39px]
          // text-xs md:text-sm lg:text-base disabled:bg-gray-500"
          className="bg-gradient-to-r from-[#501B95] to-[#B10DAD] px-4 py-[.625rem] text-white capitalize font-poppins rounded-full 
        text-sm lg:text-[17px] font-bold lg:leading-[26px] h-12 hover:from-[#14A4BD] hover:to-[#7ABD96] transition-all"
          onClick={handleClick}
          variants={fromRightAnimation}
          initial="initial"
          animate="final"
          transition={{
            ease: 'easeIn',
            duration: 0.2,
            delay: 1.4,
          }}
          // disabled={isMounted && isConnected}
        >
          {!isMounted
            ? null
            : !isConnected && router.asPath === '/'
            ? 'join our community'
            : !isConnected
            ? 'Connect Wallet'
            : `Connected ${address?.substring(0, 4)}...${address?.substring(
                address.length - 2
              )}`}
        </motion.button>
      )}
      {isOpen && (
        <div
          className="absolute z-50 right-0 left-0 -bottom-[3rem] bg-gradient-to-b from-custom-yellow to-custom-orange
         font-nunito p-2 rounded"
        >
          {/* <p
            onClick={handleProfile}
            className="flex items-center gap-1 text-black cursor-pointer hover:scale-105 transition-transform"
          >
            <CgProfile fontSize={20} />
            <span>Profile</span>
          </p> */}
          <p
            onClick={handleDisconnect}
            className="flex items-center gap-1 text-black cursor-pointer hover:scale-105 transition-transform"
          >
            <AiOutlineDisconnect fontSize={20} />
            <span>Disconnect</span>
          </p>
        </div>
      )}
    </div>
  )
}

// const Search: FC = () => {
//   const [isClicked, setIsClicked] = useState(false)
//   const [searchWidth, setSearchWidth] = useState('')

//   useEffect(() => {
//     if (isClicked) setSearchWidth('w-[120px]')
//     else setSearchWidth('w-[33px]')
//   }, [isClicked])

//   return (
//     <>
//       {/* DESKTOP */}
//       <motion.div
//         className="hidden md:block relative h-9 md:w-56"
//         variants={fromTopAnimation}
//         initial="initial"
//         animate="final"
//         transition={{
//           ease: 'easeInOut',
//           duration: 0.4,
//           delay: 1,
//         }}
//       >
//         <span className="absolute left-1 top-2 w-fit z-20 text-primary font-bold md:top-3">
//           <Image
//             src="/images/icons/search.svg"
//             alt="search"
//             width="25px"
//             height="15px"
//           />
//         </span>
//         <input
//           type="text"
//           className="w-full h-full px-7 rounded caret-custom_yellow placeholder:text-custom_yellow font-light text-white
//       focus:border focus:border-custom_yellow focus:outline-none bg-custom_grey md:h-11"
//         />
//         <span className="absolute right-3 top-2 w-fit z-20 text-[#898989] font-light text-sm cursor-pointer md:top-3">
//           X
//         </span>
//       </motion.div>
//       {/* MOBILE */}
//       <div
//         className={`bg-custom_grey h-[33px] md:hidden ${
//           !isClicked && 'p-1'
//         } transition-all duration-500 flex
//                 justify-end items-center gap-1 ${searchWidth}
//                 ${!isClicked ? 'rounded-full' : 'rounded-md'}`}
//       >
//         <Image
//           src="/images/icons/search.svg"
//           alt="search"
//           width="25px"
//           height="15px"
//           onClick={() => setIsClicked((prev) => !prev)}
//         />
//         <input
//           type="text"
//           className={`${
//             isClicked ? 'w-full' : 'hidden'
//           } h-full pl-1 rounded caret-custom_yellow placeholder:text-custom_yellow text-[#898989] font-light
//                 focus:border focus:border-custom_yellow focus:outline-none bg-custom_grey md:h-11`}
//         />
//       </div>
//     </>
//   )
// }


// Logo
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
        width={clientWidth > 768 ? '133px' : '64px'}
        height={clientWidth > 768 ? '69px' : '32px'}
        className="cursor-pointer"
        onClick={() => router.push('/')}
      />
    </motion.div>
  )
}

//Header for all pages
const Header: FC = () => {
  const { asPath } = useRouter()
  const isHome = asPath === '/'

  return (
    <header className="relative z-20">
      <div
        className={`pt-6 ${
          !isHome && 'lg:px-16'
        } bg-transparent backdrop-blur-lg absolute left-0 right-0`}
      >
        <div className={`${isHome && OUTER_BOX_STYLE}`}>
          <div className={`${isHome && INNER_BOX_STYLE}`}>
            <div className={`${isHome && 'border-b'} border-white pb-4`}>
              <div className="grid grid-cols-12 gap-1">
                <div className="col-span-3 md:col-span-6">
                  <Logo />
                </div>
                {/* <div className="col-span-9 md:col-span-6 flex justify-end gap-2 md:gap-6 lg:gap-16"> */}
                <div className="col-span-9 md:col-span-6 flex justify-end items-center gap-2 md:gap-3 lg:gap-4 pr-4">
                  {/* {router.asPath !== '/' && <Search />} */}
                  {/* <motion.div
              variants={fromTopAnimation}
              initial="initial"
              animate="final"
              transition={{
                ease: 'easeInOut',
                duration: 0.4,
                delay: 1,
              }}
            >
              <CgProfile
                fontSize={30}
                className="text-white cursor-pointer hover:text-[#c4c4c4]"
                onClick={() => router.push('/profile')}
              />
            </motion.div> */}

                  <ConnectButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
