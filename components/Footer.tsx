import Image from 'next/image'
import { FC } from 'react'

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
          <Image
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
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
