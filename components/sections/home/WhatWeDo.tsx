import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IoChevronForwardSharp } from 'react-icons/io5'
import {
  fromBottomAnimation,
  fromLeftAnimation,
  fromRightAnimation,
  fromTopAnimation,
} from '../../../utils/animations'
import { CONTAINER_PADDING } from '../../../utils/constants'

const ImageItem: FC<{
  text: string
  img: string
  animation: 'l' | 'r' | 't' | 'b'
}> = ({ text, img, animation }) => (
  <motion.div
    className="flex flex-col items-center justify-center font-poppins text-white 
    font-medium lg:text-[1.25rem] lg:leading-[1.5625rem]"
    variants={
      animation === 'r'
        ? fromRightAnimation
        : animation === 'l'
        ? fromLeftAnimation
        : animation === 'b'
        ? fromBottomAnimation
        : fromTopAnimation
    }
    initial="initial"
    whileInView="final"
    viewport={{ once: true }}
    transition={{
      ease: 'easeInOut',
      duration: 0.5,
      delay: 0.6,
    }}
  >
    <div className="w-[6.5625rem] h-[6.375rem] relative">
      <Image src={img} alt="" layout="fill" />
    </div>
    <p className="text-white max-w-[8.4375rem] text-center"> {text}</p>
  </motion.div>
)

const ImageDisplay = () => {
  return (
    <div className="flex flex-col gap-4 lg:w-[30.6388rem] lg:h-[30.6388rem] bg-gradient-radial from-[#9B568C] via-[#0A0A0A] to-[#0A0A0A]">
      <ImageItem
        text="Free Setup Fee & Trial"
        img="/images/hero/setup.svg"
        animation="t"
      />
      <div className="flex justify-between">
        <ImageItem
          text="Rapid Deployment"
          img="/images/hero/rocket.svg"
          animation="l"
        />
        <ImageItem
          text="User Friendly Interface"
          img="/images/hero/friendly.svg"
          animation="r"
        />
      </div>
      <div className="flex justify-center">
        <ImageItem
          text="Efficient Smart Contract"
          img="/images/hero/rocket.svg"
          animation="b"
        />
      </div>
    </div>
  )
}

const nftData1 = [
  {
    name: 'Alen Iverson',
    img: '/images/auction/auction_img_1.svg',
    pgb: '0.3234',
  },
  {
    name: 'boof bonser',
    img: '/images/auction/auction_img_5.svg',
    pgb: '0.3234',
  },
]

const nftData2 = [
  { name: 'carl', img: '/images/auction/auction_img_6.svg', pgb: '0.3234' },
  {
    name: 'yogi bera',
    img: '/images/auction/auction_img_4.svg',
    pgb: '0.3234',
  },
]

const NftCard: FC<{ name: string; pgb: string; img: string }> = ({
  name,
  img,
  pgb,
}) => {
  return (
    <div>
      <div className="border border-white w-[13.9375rem] h-[16.8125rem] relative text-white">
        <div className="absolute left-8 -right-8 -top-4 bottom-[6rem] bg-[#0A0A0A]">
          <Image
            src={img}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        </div>
        <p className="absolute bottom-[3rem] left-8 font-inter font-semibold capitalize">
          {name}
        </p>
        <p className="absolute bottom-[1rem] left-8 flex items-center gap-1">
          <span className="text-[.4163rem]">pgb </span> <span>{pgb}</span>
        </p>
      </div>
    </div>
  )
}

const CardDisplay = () => {
  return (
    <div className="w-full lg:pr-10">
      <div className="flex flex-col lg:flex-row justify-between lg:h-[20rem]">
        {nftData1.map((nft, i) => {
          return (
            <motion.div
              key={i}
              className={`${i % 2 !== 0 && 'self-end'}`}
              variants={fromBottomAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.3,
                delay: 0.3 + i / 5,
              }}
            >
              <NftCard {...nft} />
            </motion.div>
          )
        })}
      </div>
      <div className="flex flex-col lg:flex-row justify-between h-[20rem]">
        {nftData2.map((nft, i) => {
          return (
            <motion.div
              key={i}
              className={`${i % 2 !== 0 && 'self-end'}`}
              variants={fromBottomAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.3,
                delay: 0.3 + i / 5,
              }}
            >
              <NftCard {...nft} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const WhatWeDo: FC = () => {
  const router = useRouter()
  return (
    <section className={`lg:pt-28 bg-[#0A0A0A]`}>
      <motion.div
        className={`${CONTAINER_PADDING}  flex flex-col lg:flex-row justify-between`}
        variants={fromBottomAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.3,
          delay: 0.2,
        }}
      >
        <div className="max-w-[30.0625rem]">
          <h2 className="font-poppins lg:text-[4.25rem] lg:leading-[6.375rem] text-white">
            What is GamesToWeb3?
          </h2>
          <p className="lg:text-lg lg:leading-[1.8rem] font-light font-poppins text-[#FFD325]">
            GamestoWeb3 is a platform that offers a marketplace for NFTs, as
            well as an API for game developers to convert their web 2.0 games
            and in-game assets to web 3.0 games and NFTs.
          </p>
        </div>
        <motion.div
          variants={fromBottomAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.3,
            delay: 0.3,
          }}
        >
          <ImageDisplay />
        </motion.div>
      </motion.div>

      <div
        className={`${CONTAINER_PADDING}  flex flex-col lg:flex-row justify-between pt-20 pb-28 bg-[#0A0A0A]`}
      >
        <div className="lg:w-[45%]">
          <CardDisplay />
        </div>
        <div className="max-w-[38rem] pt-60">
          <motion.div
            variants={fromRightAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
              delay: 0.6,
            }}
          >
            <h2 className="font-inter lg:text-[4.625rem] lg:leading-[5.5975rem] text-white">
              Web 3 NFT Marketplace
            </h2>
            <p className="text-white font-poppins lg:text-lg font-light my-8">
              GamestoWeb3 makes it easy to create your own NFT collection and
              bring your game assets to life in a whole new way. Whether you are
              a game developer, a streamer, or just a passionate gamer, you can
              create your own unique NFTs and sell them on our platform.
            </p>
            <div
              className="bg-gradient-to-r from-[#FFCC02] to-[#8F4F86] text-white w-[16.1875rem] h-[3.06rem] font-inter 
              lg:text-lg grid place-items-center rounded-full hover:from-[#501B95] hover:to-[#B10DAD] font-light"
              role="button"
              onClick={() => router.push('/collections')}
            >
              <div className="h-[2.51rem] w-[15.6875rem] bg-black hover:bg-transparent grid place-items-center rounded-full">
                <p className="flex gap-2 justify-center items-center text-white">
                  Explore Marketplace <IoChevronForwardSharp />
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo
