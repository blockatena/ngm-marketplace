import Image from 'next/image'
import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer
      className="p-4 pt-6 lg:px-16 bg-cover bg-gradient-to-t from-custom_yellow_dark to-dark_mild relative z-30"
      style={{ backgroundImage: "url('/images/footer/bottom_footer.svg')" }}
    >
      <div className="flex justify-between">
        <div>
          <Image
            src="/img/icons/logo.svg"
            alt="logo"
            width="178px"
            height="48px"
          />
        </div>
        <div className="flex gap-2">
          <Image
            src="/img/icons/instagram.svg"
            alt="instagram"
            width="30px"
            height="30px"
            className="cursor-pointer"
          />
          <Image
            src="/img/icons/twitter.svg"
            alt="twitter"
            width="30px"
            height="30px"
            className="cursor-pointer"
          />
          <Image
            src="/img/icons/discord.svg"
            alt="discord"
            width="30px"
            height="30px"
            className="cursor-pointer"
          />
          <Image
            src="/img/icons/linkedin.svg"
            alt="linkedin"
            width="30px"
            height="30px"
            className="cursor-pointer"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
