import { motion } from 'framer-motion'
import Image from 'next/image'
import { FC, ReactElement } from 'react'
import {
  fromBottomAnimation,
  fromLeftAnimation,
  fromRightAnimation,
} from '../../../utils/animations'
import SectionContainer from '../../SectionContainer'

// what we do cards data
const cardData = [
  {
    title: 'Ethereum',
    img: '/images/others/ethereum_logo.svg', 
    // body: 'Ethereum smart contracts transform gaming with verifiable assets, increasing transparency , reliable and driving blockchain adoption in the industry.',
  },
  {
    title: 'Polygon',
    img: '/images/others/polygon_logo.svg',
    // body: "Polygon's smart contracts enable verifiable gaming assets with faster transaction speeds and lower fees, driving blockchain adoption in gaming for more player engagement and ownership.",
  },
]


// handle single card
const Card: FC<{ title: string; img: string }> = ({
  title,
  img
}) => (
  <div className="w-[20.25rem] h-[24rem] text-center border border-custom_yellow p-4 pt-16 text-white font-poppins rounded-lg font-semibold">
    <p>
      <Image alt="icon" src={img} height={161.5} width={100} />
    </p>
    <h5 className="text-[1.75rem] leading-[2.375rem] capitalize py-4">
      {title}
    </h5>
    {/* <p>{body}</p> */}
  </div>
)


// Bottom row
const BottomRow: FC = () => (
  <div className=" bg-[#0A0A0A] py-16 lg:py-24">
    <SectionContainer>
      <div className="flex flex-col md:flex-row gap-10">
        <motion.div
          className="relative w-[20.9375rem] lg:w-[31.625rem] h-[20.9375rem]"
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
          className="text-white max-w-[40.75rem]  text-left pt-10 font-poppins"
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
          <h3 className="text-2xl lg:text-[3.4375rem] lg:leading-[5.1563rem]  font-poppins font-semibold">
            Why Us?
          </h3>
          <p className="text-[1.0575rem] leading-[1.5869rem] font-poppins">
            Get <span className="text-[#02FF76]">free Polygon</span> minting for
            new users, including 5 contracts and 500 NFTs per user. Our research
            into new standards like TinyERC721 and ERC721Psi allows us to offer
            cost-effective Ethereum and Polygon minting solutions as compared to
            our competitors, while our ERC1155 contracts make it easier and more
            affordable for game developers to deploy and mint NFTs.
          </p>
          <p className="pt-4">
            <button
              className="text-black bg-gradient-to-r from-[#F8D40A] to-[#F47721] py-5 px-11
            hover:from-[#F47721] hover:to-[#F8D40A] rounded-md text-[2rem] leading-[1.65rem]"
            >
              Get APi Key
            </button>
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  </div>
)


// How it works
function HowItWorks(): ReactElement {
  const renderCards = cardData.map((card, i) => <Card key={i} {...card} />)
  return (
    <section className=" ">
      <div className="bg-gradient-to-br from-[#4C068B] via-[#0A0A0A] to-[#0A0A0A]">
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
              className="text-[#FCBA24] text-[2.5rem] leading-[3.125rem] font-poppins font-medium"
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
              API for Developers
            </motion.p>
            <motion.p
              className="font-poppins font-semibold text-[1.875rem] leading-[1.75rem] text-white max-w-[88.5rem]"
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
              {`"Seamlessly convert your Web2 game to Web3 with our seamless API
              integration. Customize the API to create a unique and engaging
              player experience in the world of Web3 gaming."`}
            </motion.p>
            <motion.div
              className="pt-12 flex flex-col md:flex-row gap-20"
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
      <BottomRow />
    </section>
  )
}

export default HowItWorks
