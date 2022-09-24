import { motion } from 'framer-motion'
import Image from 'next/image'
import { ReactNode } from 'react'
import { BiBell } from 'react-icons/bi'
import { BsInstagram, BsTwitter } from 'react-icons/bs'
import { FaDiscord, FaLinkedinIn } from 'react-icons/fa'
import bg_img from '../public/images/footer/bg_footer_final.png'
import bottom_img from '../public/images/footer/bottom_footer.svg'
import { fromRightAnimation } from '../utils/animations'
import useWindowDimensions from '../utils/hooks/useWindowDimensions'
import NFTZoneLogo from './NFTZoneLogo'

interface IconButtonProps {
  children: ReactNode
  link: string
}

const IconButton: React.FC<IconButtonProps> = ({ children, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="text-custom-yellow hover:text-custom-yellow-hover active:text-custom-yellow-active text-[30px] hover:-translate-y-2 transition-all ease-in-out duration-300"
    >
      {children}
    </a>
  )
}

const HomeFooter: React.FC = () => {
  const bellOnClick = () => {
    console.log('SUBSCRIBE')
  }

  const { width } = useWindowDimensions()

  let bellSize: number
  if (width < 768) {
    bellSize = 24
  } else if (width < 1024) {
    bellSize = 32
  } else {
    bellSize = 38
  }

  return (
    <footer className="w-full min-h-screen relative flex items-center">
      <div className="flex items-center flex-col xl:flex-row w-full space-y-10 lg:space-y-0 lg:-translate-y-14">
        <div className="max-w-[800px] xl:max-w-[800px]">
          <Image alt="Background" src={bg_img} />
        </div>
        <div className="z-10 xl:absolute xl:pt-24 xl:right-[100px] 2xl:right-[250px] w-full xl:w-fit space-y-6">
          <motion.h4
            variants={fromRightAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
              delay: 0.8,
            }}
            className="text-white font-btn font-bold text-[24px] md:text-[28px] lg:text-[35px] w-full text-center relative before:absolute before:w-[3px] before:h-[30px] before:lg:h-[36px] before:my-auto before:lg:top-2 before:top-[2px] before:bg-[#FFDC20] before:-translate-x-3"
          >
            Subscribe to Our Newsletter
          </motion.h4>
          <motion.div
            variants={fromRightAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
              delay: 1.2,
            }}
            className="flex justify-center"
          >
            <button
              onClick={bellOnClick}
              className="btn-primary w-[185px] h-[48px] md:w-[200px] md:h-[52px] lg:w-[225px] lg:h-[58px] font-btn text-[20px] md:text-[24px] lg:text-[28px] rounded-md"
            >
              <div className="w-full flex flex-row items-center justify-center">
                <p className="mr-2">Subscribe</p>
                <BiBell fontSize={bellSize} />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
      <div className="absolute -bottom-2 left-0 right-0 w-full">
        <Image src={bottom_img} alt="" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-5 lg:px-24 lg:pb-10 flex flex-row justify-between items-center">
        <NFTZoneLogo size="small" />
        <div className="flex flex-row justify-center items-center space-x-3 lg:space-x-6">
          <IconButton link="https://www.instagram.com/">
            <BsInstagram />
          </IconButton>
          <IconButton link="https://twitter.com/">
            <BsTwitter />
          </IconButton>
          <IconButton link="https://discord.com/">
            <FaDiscord />
          </IconButton>
          <IconButton link="https://www.linkedin.com/">
            <FaLinkedinIn />
          </IconButton>
        </div>
      </div>
    </footer>
  )
}

export default HomeFooter
