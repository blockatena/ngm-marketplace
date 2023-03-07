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
import SectionContainer from '../../SectionContainer'

// Image Item Section
const ImageItem: FC<{
  text: string
  img: string
  animation: 'l' | 'r' | 't' | 'b'
}> = ({ text, img, animation }) => (
  <motion.div
    className="flex flex-col items-center justify-center font-poppins text-white lg:text-[1.20rem] lg:leading-[1.7625rem]"
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
    <div className="w-[7.5625rem] h-[7.375rem] relative">
      <Image src={img} alt="" layout="fill" />
    </div>
    <p className="text-white max-w-[8.4375rem] font-normal  text-center"> {text}</p>
  </motion.div>
)

// Image display
const ImageDisplay = () => {
  return (
    <div className="p-2  bg-transparent">
      <div className="flex flex-col gap-4 w-[23rem] h-[23rem] lg:w-[30.6388rem] lg:h-[30.6388rem] bg-gradient-radial from-[#2B1A27] via-[#0A0A0A] to-[#0A0A0A]">
        <div className="z-40">
          <ImageItem
            text="Free Setup Fee & Trial"
            img="/images/square/setup.svg"
            animation="t"
          />
          <div className="flex justify-between">
            <ImageItem
              text="Rapid Deployment"
              img="/images/square/rocket.svg"
              animation="l"
            />
            <ImageItem
              text="User Friendly Interface"
              img="/images/square/friendly.svg"
              animation="r"
            />
          </div>
          <div className="flex justify-center">
            <ImageItem
              text="Efficient Smart Contract"
              img="/images/square/smart_contract.svg"
              animation="b"
            />
          </div>
        </div>
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

// Nft Card
const NftCard: FC<{ name: string; pgb: string; img: string }> = ({
  name,
  img,
  pgb,
}) => {
  return (
    <div>
      <div className="border border-white w-[12.25rem] h-[15.375rem] relative text-white">
        <div className="absolute left-8 -right-4 lg:-right-8 -top-4 bottom-[6rem] bg-[#0A0A0A]">
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

// Card Display
const CardDisplay = () => {
  return (
    <div className="w-full lg:pr-10 lg:min-w-[15rem]">
      <div className="flex flex-col gap-14 lg:flex-row justify-between lg:h-[18.813rem]">
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
      <div className="flex flex-col lg:flex-row justify-between h-[18.813rem]">
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

// WhatWeDo section
const WhatWeDo: FC = () => {
  const router = useRouter()
  return (
    <section className={`lg:pt-28 bg-[#0A0A0A] `}>
      <SectionContainer>
        <motion.div
          className={`flex flex-col lg:flex-row  justify-between w-full pt-24 md:pt-0 lg:gap-x-20`}
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
          <div className="max-w-[22.75rem]  lg:max-w-[42.75rem] pt-20">
            <h2 className="font-poppins text-3xl pb-8 lg:text-[3.25rem] lg:leading-[3.5rem]  text-white">
              <p>
                <span className="text-white">What is </span>
              </p>
              <p>
                <span className="text-[#FEE400]">GamesToWeb3?</span>
              </p>
            </h2>
            {/* <h2 className="font-poppins text-3xl pb-2 lg:text-[3.25rem] lg:leading-[5rem] xl:text-[4.25rem] xl:leading-[6.375rem] text-white"></h2> */}
            <p className="lg:text-[1.5rem] lg:leading-[160%] font-light font-poppins text-[#FFF]">
              Your <span className="text-[#FF61FA]">one-stop-shop</span> for NFT
              adoption in gaming. Convert web 2.0 games and assets to web 3.0
              games and with our API and list in game assets on our NFT
              marketplace , while growing the NFT ecosystem. Explore our
              platform now!
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
            className="bg-transparent"
          >
            <ImageDisplay />
          </motion.div>
        </motion.div>

        <div
          className={`flex flex-col lg:flex-row justify-between gap-[10rem] pt-44 pb-28 bg-[#0A0A0A]`}
        >
          {/* <div className="lg:w-[45%]"> */}
          <div className="">
            <CardDisplay />
          </div>
          <div className="max-w-[55.375rem] pt-20  lg:pl-4 xl:pl-0">
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
              <h2 className="font-poppins text-3xl pb-2 lg:text-[3.25rem] lg:leading-[3.5rem] text-white">
                Web3 NFT{' '}
                <p>
                  <span className="text-[#05ECB4]">Marketplace</span>
                </p>
              </h2>
              {/* <h2 className="font-inter text-3xl lg:text-[3rem] lg:leading-[4rem] xl:text-[3.625rem] xl:leading-[5.5975rem] text-[#05ECB4]"></h2> */}
              <p className="text-white font-poppins lg:leading-[160%] lg:text-2xl font-light my-20 mt-8">
                {`"Game Developers can create their own NFT collection and bring
                their game assets to life with GamestoWeb3 - a platform for
                Gamers to easily trade these unique NFTs."`}
              </p>
              <div
                className="mt-6 bg-gradient-to-r from-[#FFCC02] to-[#8F4F86] text-white w-[15rem] h-[3.5rem] lg:w-[22.55rem] lg:h-[4.3rem] font-inter 
              text-[1.3rem] lg:text-[1.68rem] grid place-items-center rounded-full hover:from-[#501B95] hover:to-[#B10DAD]"
                role="button"
                onClick={() => router.push('/collections')}
              >
                <div className="w-[14.5rem] h-[3.1rem] lg:h-[3.8rem] lg:w-[22.1rem] bg-black hover:bg-transparent grid place-items-center rounded-full">
                  <p className="flex gap-2 justify-center items-center text-white">
                    Explore Marketplace <IoChevronForwardSharp />
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

export default WhatWeDo
