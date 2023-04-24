import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { FC, ReactElement, useState, useEffect } from 'react'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { fromBottomAnimation } from '../../../utils/animations'
import SectionContainer from '../../SectionContainer'
import ApiKeyRequestModal from '../../modals/ApiKeyRequest'

// what we do cards data
const cardData = [
  {
    title: 'Ethereum',
    img: '/images/others/Ethereum_logo.svg',
    // body: 'Ethereum smart contracts transform gaming with verifiable assets, increasing transparency , reliable and driving blockchain adoption in the industry.',
  },
  {
    title: 'Polygon',
    img: '/images/others/polygon_logo.svg',
    // body: "Polygon's smart contracts enable verifiable gaming assets with faster transaction speeds and lower fees, driving blockchain adoption in gaming for more player engagement and ownership.",
  },
  {
    title: 'Filecoin',
    img: '/images/others/filecoin_logo.svg',
    // body: "Polygon's smart contracts enable verifiable gaming assets with faster transaction speeds and lower fees, driving blockchain adoption in gaming for more player engagement and ownership.",
  },
]

// handle single card
const Card: FC<{ title: string; img: string }> = ({ title, img }) => (
  <div className="w-[20.25rem] lg:w-[18rem] xl:w-[20.25rem] h-[24rem] text-center border border-custom_yellow p-4 pt-16 text-white font-poppins rounded-lg font-semibold">
    <p>
      <Image alt="icon" src={img} height={161.5} width={100} />
    </p>
    <h5 className="text-[1.5rem] xl:text-[1.75rem] leading-[2.375rem] capitalize py-4">
      {title}
    </h5>
    {/* <p>{body}</p> */}
  </div>
)
const WhyItem: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex gap-2 items-center mb-2 flex-wrap">
      <div className="relative w-10 h-8 lg:w-[61px] lg:h-[33px]">
        <Image alt="" src="/images/others/tick.svg" layout="fill" />
      </div>
      <div className="font-poppins font-medium text-[#f4eeee] text-lg lg:text-2xl">
        {text}
      </div>
    </div>
  )
}
// Bottom row
const BottomRow: FC<{ setIsApiModalOpen: () => void }> = ({
  setIsApiModalOpen,
}) => (
  <div className=" bg-[#040404] py-16 lg:py-24 lg:px-8 2xl:px-10">
    <div
      // style={{ backgroundImage: "url('/images/others/why_us_bg.png')" }}
      className="pb-8"
    >
      <SectionContainer>
        <div className="grid place-items-center">
          <h2 className="capitalize text-white text-4xl lg:text-[4rem] pb-8 lg:pb-12">
            why <span className="text-custom_yellow">us</span>
          </h2>
          <div>
            <WhyItem text="Free minting 5 contracts and 500 NFTs per user" />
            <WhyItem text="Efficient NFT standards TinyERC721, ERC721Psi and ERC1155" />
            <WhyItem text="Integrated marketplace to trade these minted assets" />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-6">
            <button
              className="w-[14.625rem] h-[3rem] md:w-[17.625rem] md:h-[3.5rem] text-white font-poppins font-medium text-sm md:text-[1.25rem] bg-[#8D5DF1] 
            flex justify-center items-center gap-2 rounded hover:scale-105 transition-transform"
              onClick={() =>
                window.open('https://gamestoweb3.readme.io/', '_block')
              }
            >
              <span>View API Docs</span>
              <span>
                <IoChevronForwardSharp />
              </span>
            </button>
            <button
              className="w-[14.625rem] h-[3rem] md:w-[17.625rem] md:h-[3.5rem] text-black font-poppins font-medium text-sm md:text-[1.25rem] bg-[#27DFB3] 
            flex justify-center items-center gap-2 rounded hover:scale-105 transition-transform"
              onClick={() => setIsApiModalOpen()}
            >
              <span>Generate API Key</span>
              <span>
                {' '}
                <IoChevronForwardSharp />
              </span>
            </button>
          </div>
        </div>

        {/* <div className="flex flex-col md:flex-row justify-between gap-6 xl:gap-10">
          <motion.div
            className="relative w-[20.9375rem] lg:w-[31.625rem] flex-1"
            variants={fromLeftAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
              delay: 0.4,
            }}
          >
            <Image src="/images/others/debug.svg" alt="" layout="fill" />
          </motion.div>
          <motion.div
            className="text-white max-w-[40.75rem] pt-5 text-left font-poppins flex-1"
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
            <h3 className="text-2xl lg:text-[3rem] lg:leading-[5.1563rem] font-poppins font-normal">
              Why Us?
            </h3>
            <p className="text-lg  xl:text-[1.3575rem] leading-[1.7rem] font-poppins">
              Get <span className="text-[#02FF76]">free Polygon</span> minting
              for new users, including 5 contracts and 500 NFTs per user. Our
              research into new standards like TinyERC721 and ERC721Psi allows
              us to offer cost-effective Ethereum and Polygon minting solutions
              as compared to our competitors, while our ERC1155 contracts make
              it easier and more affordable for game developers to deploy and
              mint NFTs.
            </p>
            <p className="pt-7">
              <button
                className="text-black bg-gradient-to-r from-[#F8D40A] to-[#F47721] py-[1.1rem] px-11
            hover:from-[#F47721] hover:to-[#F8D40A] rounded-md text-[1.5rem] leading-[1.65rem]"
              >
                Get APi Key
              </button>
            </p>
          </motion.div>
        </div> */}
      </SectionContainer>
    </div>
  </div>
)

// How it works
function HowItWorks(): ReactElement {
  const renderCards = cardData.map((card, i) => <Card key={i} {...card} />)
  const [isApiModalOpen, setIsApiModalOpen] = useState(false)
  const [route, setRoute] = useState('')
  useEffect(() => {
    const route = window.location.href.split('/')[2]
    setRoute(route)
  }, [route])

  const openApiModal = () => {
    if (route == 'www.gamestoweb3.com') {
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLSdR99eqS5rkauecBWhiGzvHnn2Yhkx0jvGSF4hiHsMdx0IIog/viewform?usp=sf_link',
        '_block'
      )
    } else setIsApiModalOpen(!isApiModalOpen)
  }
  
  return (
    <section className="bg-[#0A0A0A]">
      {/* <div className="bg-gradient-to-br from-[#4C068B] via-[#0A0A0A] to-[#0A0A0A]"> */}
      <div
        style={{
          backgroundImage: "url('/images/others/why_us_bg3.svg')",
        }}
      >
        <SectionContainer>
          <div className="text-center flex flex-col gap-10 items-center py-16 lg:py-24 ">
            <motion.h2
              className="uppercase font-poppins text-4xl lg:text-[3.4375rem] leading-[1.75rem] text-white font-medium"
              variants={fromBottomAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.5,
                delay: 0.4,
              }}
            >
              how it <span className="text-[#FF00F8]">works</span>
            </motion.h2>

            <motion.p
              className="font-poppins font-normal text-lg xl:text-[1.68rem] xl:leading-[2.7rem] text-white max-w-[88.5rem]"
              variants={fromBottomAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.5,
                delay: 0.6,
              }}
            >
              Seamlessly convert your Web2 game to Web3 with our seamless API
              integration. Customize the API to create a unique and engaging
              player experience in the world of Web3 gaming
            </motion.p>

            <motion.p
              className="text-[#76CEFF] text-3xl  xl:text-[2.5rem] xl:leading-[3.125rem] font-poppins font-medium"
              variants={fromBottomAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.5,
                delay: 0.5,
              }}
            >
              Our APIs are live on these Blockchains{' '}
            </motion.p>
            <motion.div
              className="pt-12 flex flex-col lg:flex-row gap-4  xl:gap-20"
              variants={fromBottomAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.5,
                delay: 0.7,
              }}
            >
              {renderCards}
            </motion.div>
          </div>
        </SectionContainer>
      </div>
      <BottomRow setIsApiModalOpen={openApiModal} />
      <AnimatePresence>
        {isApiModalOpen && (
          <ApiKeyRequestModal
            isOpen={isApiModalOpen}
            setIsOpen={setIsApiModalOpen}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default HowItWorks
