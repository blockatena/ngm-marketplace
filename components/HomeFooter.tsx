import { FC, ReactNode } from 'react'
import { BsTwitter } from 'react-icons/bs'
import { FaDiscord, FaInstagram, FaTelegram } from 'react-icons/fa'
import Logo from './Logo'

const IconLink: FC<{ children: ReactNode; href: string }> = ({
  children,
  href,
}) => {
  return (
    <a
      className="w-6 h-6 lg:h-10 lg:w-10  rounded-full grid place-items-center bg-gradient-to-tr to-[#EB7202] from-[#F1CB00] hover:scale-105 transition-transform"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

const Footer: FC = () => {
  return (
    <footer className="flex justify-between items-center border-t border-custom-orange mt-10 py-4">
      <div>
        <Logo />
      </div>
      <div className="text-custom-orange text-[.625rem] lg:text-[.75rem] leading-[1.125rem]">
        All rights reserved ®GamestoWeb3 | Terms and conditions apply!{' '}
      </div>
      <div className="flex gap-2 text-black">
        <IconLink href="https://www.instagram.com/gamestoweb3">
          <FaInstagram />
        </IconLink>
        <IconLink href="https://twitter.com/gamestoweb3">
          <BsTwitter />
        </IconLink>
        <IconLink href="https://t.me/gamestoweb3">
          <FaTelegram />
        </IconLink>
        {/* <IconLink href="#">
          <FaPinterest />
        </IconLink> */}
        <IconLink href="https://discord.gg/Uy63DSnByG">
          <FaDiscord />
        </IconLink>
      </div>
    </footer>
  )
}

const HomeFooter: FC = () => {
  return (
    <section className="py-16 lg:pt-28 lg:pb-6  px-[5%] 2xl:px-[12%] text-white bg-[#0A0A0A]">
      <div className="grid place-items-center">
        <h3 className="font-poppins text-[3.5rem] leading-[5.25rem] font-semibold text-center">
          Subscribe
        </h3>
        <p className="font-poppins text-lg text-center mb-10 max-w-[55.625rem]">
          Yay! You made it to the end. Means you like what we do. Consider
          subscribing to our weekly newsletter !{' '}
        </p>
        <div className="w-[100%] h-[2.75rem] lg:w-[35rem] lg:h-[6.5rem] relative mb-10">
          <input
            type="email"
            className="w-full h-full bg-white text-black rounded-lg outline-none border-none pl-4 pr-[40%]"
            placeholder="Enter your email address"
          />
          <button
            className="absolute top-1 lg:top-4 right-4 w-[6.5rem] h-[2.25rem] lg:w-[12.5rem] lg:h-[4.5rem] text-black bg-gradient-to-tr to-[#EB7202] from-[#F1CB00]
          rounded-lg font-inter text-lg font-extrabold hover:from-[#EB7202] hover:to-[#F1CB00]"
          >
            Subscribe
          </button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </section>
  )
}

export default HomeFooter
