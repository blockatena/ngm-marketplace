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
    img: '/images/others/write.svg',
    body: 'Ethereum smart contracts transform gaming with verifiable assets, increasing transparency , reliable and driving blockchain adoption in the industry.',
  },
  {
    title: 'Polygon',
    img: '/images/others/bolt.svg',
    body: "Polygon's smart contracts enable verifiable gaming assets with faster transaction speeds and lower fees, driving blockchain adoption in gaming for more player engagement and ownership.",
  },
]


// handle single card
const Card: FC<{ title: string; img: string; body: string }> = ({
  title,
  img,
  body,
}) => (
  <div className="w-[20.3125rem] h-[22.125rem] border border-custom_yellow p-4 pt-8 text-white font-poppins rounded-lg text-left font-semibold">
    <p>
      <Image alt="icon" src={img} height={24} width={24} />
    </p>
    <h5 className="text-[1.75rem] leading-[2.375rem] capitalize py-4">
      {title}
    </h5>
    <p>{body}</p>
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
            We offer free Polygon minting for new users, including 5 contracts
            and 200 NFTs. In addition, our extensive research into new standards
            like TinyERC721 and ERC721Psi allows us to offer cheaper Ethereum
            and minting for our users and plus our ERC721 contracts are highly
            gas efficient, making it more cost-effective for game developers to
            deploy and mint NFTs.
          </p>
          <p className="pt-4">
            <button
              className="text-black bg-gradient-to-r from-[#F8D40A] to-[#F47721] py-2 px-4
            hover:from-[#F47721] hover:to-[#F8D40A] rounded-md text-[1.25rem] leading-[1.65rem]"
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
              className="uppercase font-poppins text-4xl lg:text-[3.4375rem] leading-[1.75rem] text-custom-orange font-semibold"
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
              how it works
            </motion.h2>
            <motion.p
              className="text-white text-[2.5rem] leading-[3.75rem] font-poppins font-semibold"
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
              className="font-poppins font-semibold text-[1.25rem] leading-[1.75rem] text-white max-w-[55.75rem]"
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
              Our API is designed to make the process of converting your Web2
              game to Web3 as seamless as possible. With just a few lines of
              code, you can integrate our API into your game and start taking
              advantage of all the benefits of Web3 gaming. Our API is fully
              customizable and can be tailored to the specific needs of your
              game, so you can create a unique and engaging experience for your
              players.
            </motion.p>
            <motion.div
              className="flex flex-col md:flex-row gap-4"
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
