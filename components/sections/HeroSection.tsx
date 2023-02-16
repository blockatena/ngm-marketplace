import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { FaEthereum } from 'react-icons/fa'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { fromLeftAnimation, fromRightAnimation } from '../../utils/animations'

const CardStack: FC = () => {
  return (
    <div className="relative  h-[27.0625rem] w-[23.9375rem]">
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

const HeroSection: FC = () => {
  const router = useRouter()
  //Btn logic
  // const joinCommunityOnClick = () => {
  //   console.log('JOIN COMMUNITY')
  // }

  const letsExploreOnClick = () => {
    router.push('/collections')
  }

  return (
    // <section className="bg-hero bg-cover bg-no-repeat bg-center min-h-screen 2xl:min-h-full relative">
    <section className="min-h-screen 2xl:min-h-full relative bg-[#0A0A0A]">
      <video
        // poster="/img/poster.PNG"
        preload="none"
        autoPlay
        muted
        loop
        className="w-full"
      >
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-col md:flex-row justify-between absolute top-28 bottom-0 right-0 left-0 z-30 px-4 lg:px-10 pt-[10%]">
        <div className="flex flex-col gap-4 lg:gap-12">
          <motion.h1
            className="font-inter text-[2.5rem] leading-[3rem] lg:text-[3.75rem] lg:leading-[4.56rem]"
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
            className="max-w-[41.25rem] font-inter font-light font-sm lg:font-base lg:leading-[1.6rem] text-white"
            variants={fromLeftAnimation}
            initial="initial"
            animate="final"
            transition={{
              ease: 'easeInOut',
              duration: 0.6,
              delay: 1,
            }}
          >
            THE FIRST NFT for Transparency and Community-Driven. Explore new
            NFTs Web3 NFTs will continue to revolutionize the way that artists
            and fans create community together as we enter the upcoming year.
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
            className="bg-gradient-to-r from-[#FFCC02] to-[#8F4F86] text-white w-[13.55rem] h-[3.06rem] font-inter 
              text-lg grid place-items-center rounded-full hover:from-[#501B95] hover:to-[#B10DAD] "
            role="button"
            onClick={letsExploreOnClick}
          >
            <div className="h-[2.51rem] w-[13rem] bg-black hover:bg-transparent grid place-items-center rounded-full">
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
            className="xl:pr-36"
          >
            <CardStack />
          </motion.div>
        </div>
      </div>

      {/* <div className={` ${CONTAINER_PADDING} w-full mx-auto`}>
        <div className="flex flex-col-reverse lg:flex-row pt-[20px] md:pt-[30px] lg:pt-[60px] items-center w-full">
          <div className="w-full lg:w-[70%] xl:w-[60%] space-y-[25px] md:space-y-[30px] lg:space-y-[40px]">
            <motion.h1
              variants={fromLeftAnimation}
              initial="initial"
              animate="final"
              transition={{
                ease: 'easeInOut',
                duration: 0.6,
                delay: 0.8,
              }}
              className="text-white text-center lg:text-left font-bold text-[30px] md:text-[34px] lg:text-[36px] xl:text-[50px] w-auto xl:w-[650px]"
            >
              THE FIRST <span className="text-[#FFD707]">NFT</span>
              <br /> FOR TRANSPARENCY AND COMMUNITY-DRIVEN
            </motion.h1>
            <motion.div
              variants={fromLeftAnimation}
              initial="initial"
              animate="final"
              transition={{
                ease: 'easeInOut',
                duration: 0.6,
                delay: 1.4,
              }}
              className="mx-auto lg:mx-0 w-fit pb-6"
            >
              <button
                className="btn-primary w-[200px] md:w-[220px] lg:w-[248px] h-[48px] md:h-[56px] lg:h-[62px] text-[20px] md:text-[24px] lg:text-[29px] rounded-xl"
                onClick={letsExploreOnClick}
              >
                Let&apos;s Explore
              </button>
            </motion.div>
          </div>
          <motion.div
            variants={fromRightAnimation}
            initial="initial"
            animate="final"
            transition={{
              ease: 'easeInOut',
              duration: 0.6,
              delay: 1.6,
            }}
          >
            <Image alt="Nft character" src={nft_hero_character} />
          </motion.div>
        </div>
      </div> */}
    </section>
  )
}

export default HeroSection
