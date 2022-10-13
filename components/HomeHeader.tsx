import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

const HomeHeader: FC = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/connect-wallet')
  }

  return (
    <nav className="p-4 pt-6 lg:px-16">
      <div className="flex justify-between w-full">
        <div>
          <div className="md:hidden">
            <Image
              src="/images/icons/logo.svg"
              alt="nftzone_logo"
              width="100px"
              height="46px"
              className="cursor-pointer"
              onClick={() => router.push('/')}
            />
          </div>
          <div className="hidden md:block">
            <Image
              src="/images/icons/logo.svg"
              alt="nftzone_logo"
              width="188px"
              height="64px"
              className="cursor-pointer"
              onClick={() => router.push('/')}
            />
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="btn-clip bg-custom_yellow text-black text-xs p-1
             block font-nunito font-bold transition-all lg:text-lg md:w-36 md:h-10 md:p-0 
             hover:text-white hover:font-black"
            onClick={handleClick}
          >
            Join Community
          </button>
        </div>
      </div>
    </nav>
  )
}

export default HomeHeader
