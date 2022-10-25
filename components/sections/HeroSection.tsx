import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NFTZoneLogo from '../NFTZoneLogo'

import nft_hero_character from '../../public/images/hero/hero_image.png'
import {
  fromLeftAnimation,
  fromRightAnimation,
  fromTopAnimation,
} from '../../utils/animations'

const HeroSection: React.FC = () => {
  const router = useRouter()
  //Btn logic
  const joinCommunityOnClick = () => {
    console.log('JOIN COMMUNITY')
  }

  const letsExploreOnClick = () => {
    router.push('/collections')
  }

  return (
    <section className="bg-hero bg-cover bg-no-repeat bg-center min-h-screen">
      <div className="w-[90%] md:w-[850px] l:w-[1150px] xl:w-[1229px] mx-auto ">
        <motion.div
          variants={fromTopAnimation}
          initial="initial"
          animate="final"
          transition={{
            ease: 'easeInOut',
            duration: 0.6,
            delay: 0.4,
          }}
          className="flex flex-row pt-[15px] md:pt-[18px] lg:pt-[26px] w-full justify-between"
        >
          <NFTZoneLogo />
          <button
            className="btn-primary w-[140px] md:w-[158px] lg:w-[173px] h-[30px] md:h-[33px] lg:h-[39px] text-[14px] md:text-[16px] lg:text-[18px] cut-corners"
            onClick={joinCommunityOnClick}
          >
            Join Community
          </button>
        </motion.div>
        <div className="flex flex-col-reverse lg:flex-row pt-[40px] md:pt-[60px] lg:pt-[120px] items-center w-full">
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
      </div>
    </section>
  )
}

export default HeroSection
