import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { FaEthereum } from 'react-icons/fa'
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
    <div className="w-[5rem] h-[5rem] xl:w-[7.5625rem] xl:h-[7.375rem] relative">
      <Image src={img} alt="" layout="fill" />
    </div>
    <p className="text-white max-w-[7rem] xl:max-w-[8.4375rem] text-sm xl:text-base  text-center">
      {' '}
      {text}
    </p>
  </motion.div>
)

// Image display
const ImageDisplay = () => {
  return (
    <div className="p-2  bg-transparent w-full">
      {/* <div className="flex flex-col gap-4 w-full bg-gradient-radial from-[#2B1A27] via-[#0A0A0A] to-[#0A0A0A]"> */}
      <div className="flex flex-col gap-4 w-full">
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
          <span className="text-[1rem]">
            <FaEthereum />
          </span>{' '}
          <span>{pgb}</span>
        </p>
      </div>
    </div>
  )
}

// Card Display
const CardDisplay = () => {
  return (
    <div className="w-full lg:pr-10 lg:min-w-[15rem] pb-14">
      <div className="flex flex-col gap-14 lg:flex-row justify-between lg:h-[18.813rem] mb-14">
        {nftData1.map((nft, i) => {
          return (
            <motion.div
              key={i}
              className={`self-center sm:self-start ${
                i % 2 !== 0 && 'sm:self-end'
              }`}
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
      <div className="flex flex-col gap-14 lg:flex-row justify-between h-[18.813rem]">
        {nftData2.map((nft, i) => {
          return (
            <motion.div
              key={i}
              className={`self-center sm:self-start  ${
                i % 2 !== 0 && 'sm:self-end'
              }`}
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
    <section className={`bg-[#0A0A0A] `}>
      <SectionContainer
        style={{
          backgroundImage: "url('/images/others/why_us_bg1.svg')",
          paddingTop: '7rem',
          paddingBottom: '2rem',
        }}
      >
        <motion.div
          className={`flex flex-col md:flex-row  flex-wrap justify-between w-full pt-24 md:pt-0 lg:gap-x-4 xl:gap-x-20 `}
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
          <div className="max-w-[22.75rem]  xl:max-w-[32.75rem] pt-20 lg:scale-90 xl:scale-100">
            <h2 className="font-poppins text-4xl pb-8 xl:text-[3.25rem] xl:leading-[3.5rem]  text-white">
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
            className="bg-transparent md:w-[20rem] lg:w-[25rem] xl:w-[29rem]"
          >
            <ImageDisplay />
          </motion.div>
        </motion.div>
      </SectionContainer>
      <SectionContainer>
        <div
          className={`flex flex-col lg:flex-row justify-between gap-[4rem] xl:gap-[10rem] pt-44 pb-28 bg-[#0A0A0A]`}
        >
          {/* <div className="lg:w-[45%]"> */}
          <div className="">
            <CardDisplay />
          </div>
          <div className="max-w-[20rem] xl:max-w-[55.375rem] pt-36 md:pt-28">
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
              <h2 className="font-poppins text-3xl pb-2 xl:text-[3.25rem] xl:leading-[3.5rem] text-white">
                Web3 NFT{' '}
                <p>
                  <span className="text-[#05ECB4]">Marketplace</span>
                </p>
              </h2>
              {/* <h2 className="font-inter text-3xl lg:text-[3rem] lg:leading-[4rem] xl:text-[3.625rem] xl:leading-[5.5975rem] text-[#05ECB4]"></h2> */}
              <p className="text-white font-poppins xl:leading-[160%] xl:text-2xl font-light my-20 mt-8">
                {`Game Developers can create their own NFT collection and bring
                their game assets to life with GamestoWeb3 - a platform for
                Gamers to easily trade these unique NFTs.`}
              </p>
              <div
                className="mt-6 bg-gradient-to-r from-[#FFCC02] to-[#8F4F86] text-white w-[15rem] h-[3.5rem] xl:w-[22.55rem] xl:h-[4.3rem] font-inter 
              text-[1.3rem] xl:text-[1.68rem] grid place-items-center rounded-full hover:from-[#501B95] hover:to-[#B10DAD]"
                role="button"
                onClick={() => router.push('/collections')}
              >
                <div className="w-[14.5rem] h-[3.1rem] xl:h-[3.8rem] xl:w-[22.1rem] bg-black hover:bg-transparent grid place-items-center rounded-full">
                  <p className="flex gap-2 justify-center items-center text-white text-sm xl:text-[1.68rem]">
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
