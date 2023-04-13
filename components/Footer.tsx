import Image from 'next/image'
import { FC } from 'react'
import { ReactNode } from 'react'
import { BsInstagram, BsTwitter } from 'react-icons/bs'
import { FaDiscord, FaTelegram } from 'react-icons/fa'
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

// website Footer ,
const Footer: FC = () => {
  return (
    <footer className="bg-footer p-4 pt-6 lg:px-16 bg-cover relative z-30">
      <div className="flex justify-between">
        <div>
          <Image
            src="/images/icons/logo.svg"
            alt="logo"
            width="178px"
            height="48px"
          />
        </div>
        <div className="flex gap-2 lg:gap-4">
          {/* <Image
            src="/images/icons/instagram.svg"
            alt="instagram"
            width="30px"
            height="30px"
            className="cursor-pointer hover:-translate-y-2 transition-all"
          />
          <Image
            src="/images/icons/twitter.svg"
            alt="twitter"
            width="30px"
            height="30px"
            className="cursor-pointer hover:-translate-y-2 transition-all"
          />
          <Image
            src="/images/icons/discord.svg"
            alt="discord"
            width="30px"
            height="30px"
            className="cursor-pointer hover:-translate-y-2 transition-all"
          />
          <Image
            src="/images/icons/linkedin.svg"
            alt="linkedin"
            width="30px"
            height="30px"
            className="cursor-pointer hover:-translate-y-2 transition-all"
          /> */}
          <IconButton link="https://www.instagram.com/gamestoweb3">
            <BsInstagram />
          </IconButton>
          <IconButton link="https://twitter.com/gamestoweb3">
            <BsTwitter />
          </IconButton>
          <IconButton link="https://discord.gg/Uy63DSnByG">
            <FaDiscord />
          </IconButton>
          <IconButton link="https://t.me/gamestoweb3">
            <FaTelegram />
          </IconButton>
        </div>
      </div>
    </footer>
  )
}

export default Footer
