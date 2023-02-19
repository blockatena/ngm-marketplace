import { motion } from 'framer-motion'
import Image from 'next/image'
import { FC, ReactElement } from 'react'
import {
  fromBottomAnimation,
  fromLeftAnimation,
  fromRightAnimation,
} from '../../utils/animations'

const cardData = [
  {
    title: 'Ethereum',
    img: '/images/others/write.svg',
    body: 'Ethereum is a decentralized, open-source blockchain platform that enables smart contracts. Developers can use the Ethereum API to build blockchain-based games that run on the Ethereum network.',
  },
  {
    title: 'Polygon',
    img: '/images/others/bolt.svg',
    body: 'Polygon API, game developers can create games that use blockchain technology for features such as in-game asset tracking, non-fungible tokens (NFTs), and secure player-to-player transactions.',
  },
]

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

const BottomRow: FC = () => (
  <div className="flex flex-col md:flex-row gap-10 bg-[#0A0A0A] py-16 lg:py-24  px-[5%] 2xl:px-[12%]">
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
      className="text-white max-w-[40.75rem] flex flex-col gap-10 text-left pt-10 font-poppins"
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
      <h3>Heading</h3>
      <p>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using Content here, content here, making it look
        like readable English.
      </p>
      <p>
        <button
          className="text-black bg-gradient-to-r from-[#F8D40A] to-[#F47721] py-2 px-4
            hover:from-[#F47721] hover:to-[#F8D40A] rounded-md text-[1.25rem] leading-[1.65rem]"
        >
          Get APi Key
        </button>
      </p>
    </motion.div>
  </div>
)

function HowItWorks(): ReactElement {
  const renderCards = cardData.map((card, i) => <Card key={i} {...card} />)
  return (
    <section>
      <div className="text-center flex flex-col gap-10 items-center py-16 lg:py-24  px-[5%] 2xl:px-[12%] bg-gradient-to-br from-[#4C068B] via-[#0A0A0A] to-[#0A0A0A]">
        <motion.h2
          className="uppercase font-poppins text-[1.25rem] leading-[1.75rem] text-custom-orange font-semibold"
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
          APi for Developers
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
          We are offering several APIs that game developers can use to enable
          blockchain capabilities in their games.
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
      <BottomRow />
    </section>
  )
}

export default HowItWorks
