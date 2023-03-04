import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { FaEthereum } from 'react-icons/fa'
import { IoChevronForwardSharp } from 'react-icons/io5'
import {
  fromLeftAnimation,
  fromRightAnimation,
} from '../../../utils/animations'
import SectionContainer from '../../SectionContainer'


// card stack
const CardStack: FC = () => {
  return (
    <div className="relative  h-[34.25rem] w-[30.313rem]">
      <div className="absolute z-20 left-0 -right-32 top-12 bottom-12">
        <Image
          src="/images/hero/hero_card.svg"
          alt="hero_image"
          layout="fill"
        />
      </div>
      <div className="absolute z-30 left-0 -right-16 top-6 bottom-6">
        <Image
          src="/images/hero/hero_card.svg"
          alt="hero_image"
          layout="fill"
        />
      </div>
      <div className="absolute z-40 left-0 right-0 top-0 bottom-0">
        <Image
          src="/images/hero/hero_card.svg"
          alt="hero_image"
          layout="fill"
          className=""
        />
        <div className="text-white absolute top-[18%] left-[18%]">
          <p className="text-[1.75rem] font-bold leading-[2.275rem]">
            Robins NFT
          </p>
          <div className="flex gap-2 items-center">
            <div className="relative h-8 w-8">
              <Image
                src="/images/hero/user.svg"
                alt="user"
                layout="fill"
                className="rounded-full"
              />{' '}
            </div>

            <p className="text-[1.25rem] font-bold">Robinson </p>
          </div>
        </div>
        <div className="absolute bottom-[18%] right-[18%] left-[18%] flex justify-between text-white bg-white/20 backdrop-blur-xl p-2 rounded-lg">
          <div>
            <p className="text-[0.75rem] font-medium">Current Bid</p>
            <p className="text-base font-bold flex items-center">
              <FaEthereum /> 0.25NXT
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-[0.75rem] font-medium">Robinson</p>
          </div>
        </div>
      </div>
    </div>
  )
}


// Hero Section for home
const HeroSection: FC = () => {
  const router = useRouter()

  const letsExploreOnClick = () => {
    router.push('/collections')
  }

  return (
    // <section className="bg-hero bg-cover bg-no-repeat bg-center min-h-screen 2xl:min-h-full relative">
    <section className="min-h-screen 2xl:min-h-full relative bg-[#0A0A0A]">
      <video
        // poster="/images/hero/poster.png"
        preload="none"
        autoPlay
        muted
        loop
        className="w-full hidden xl:block opacity-40"
      >
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-28 bottom-0 right-0 left-[3rem] z-30 pt-[5%]">
        <SectionContainer>
          <div className="flex flex-col md:flex-row justify-between ">
            <div className="flex flex-col gap-4 lg:gap-12 pt-28">
              <motion.h1
                className="font-inter font-normal text-[2.5rem] leading-[3rem] lg:text-[5.313rem] lg:leading-[4.56rem]"
                variants={fromLeftAnimation}
                initial="initial"
                animate="final"
                transition={{
                  ease: 'easeInOut',
                  duration: 0.6,
                  delay: 0.8,
                }}
              >
                <span className="text-[#FCBA24]">Games</span>
                <span className="text-white">To</span>
                <span className="text-[#E435DF]">Web3</span>
              </motion.h1>
              <motion.p
                className="max-w-[54.375rem]  font-poppins font-normal font-sm text-[1.75rem] lg:font-base lg:leading-[2.6rem] text-white"
                variants={fromLeftAnimation}
                initial="initial"
                animate="final"
                transition={{
                  ease: 'easeInOut',
                  duration: 0.6,
                  delay: 1,
                }}
              >
                {`"Join the NFT gaming revolution with GamestoWeb3 - convert your
                web 2.0 games and assets to web 3.0 and list them on our
                marketplace via our API."`}
              </motion.p>
              <motion.div
                variants={fromLeftAnimation}
                initial="initial"
                animate="final"
                transition={{
                  ease: 'easeInOut',
                  duration: 0.6,
                  delay: 1.4,
                }}
                className="bg-gradient-to-r from-[#FFCC02] to-[#8F4F86] text-white w-[23.55rem] h-[5.36rem] font-inter 
              text-[1.68rem] grid place-items-center rounded-full hover:from-[#501B95] hover:to-[#B10DAD] "
                role="button"
                onClick={letsExploreOnClick}
              >
                <div className="h-[4.8rem] w-[23.1rem] bg-black hover:bg-transparent grid place-items-center rounded-full">
                  <p className="flex gap-2 justify-center items-center text-white">
                    Discover More <IoChevronForwardSharp />
                  </p>
                </div>
              </motion.div>
            </div>
            <div>
              <motion.div
                variants={fromRightAnimation}
                initial="initial"
                animate="final"
                transition={{
                  ease: 'easeInOut',
                  duration: 0.6,
                  delay: 1.6,
                }}
                className="xl:pr-8"
              >
                <CardStack />
              </motion.div>
            </div>
          </div>
        </SectionContainer>
      </div>
    </section>
  )
}

export default HeroSection
