import Image from 'next/image'
import { FC } from 'react'

const Header: FC = () => {
  return (
    <nav className="p-4 pt-6 lg:px-16">
      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-3 md:col-span-6 ">
          <div className="md:hidden">
            <Image
              src="/img/icons/logo.svg"
              alt="nftzone_logo"
              width="100px"
              height="46px"
              className="cursor-pointer"
            />
          </div>
          <div className="hidden md:block">
            <Image
              src="/img/icons/logo.svg"
              alt="nftzone_logo"
              width="188px"
              height="64px"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="col-span-9 md:col-span-6 flex justify-evenly gap-2">
          <div className="relative h-9 md:w-56">
            <span className="absolute left-1 top-2 w-fit z-20 text-primary font-bold md:top-3">
              <Image
                src="/img/icons/search.svg"
                alt="search"
                width="25px"
                height="15px"
              />
            </span>
            <input
              type="text"
              placeholder="|"
              className="w-full h-full px-7 rounded placeholder:text-custom_yellow font-light text-white 
              focus:border focus:border-custom_yellow focus:outline-none bg-custom_grey md:h-11"
            />
            <span className="absolute right-3 top-2 w-fit z-20 text-white text-sm cursor-pointer md:top-3">
              X
            </span>
          </div>
          <button
            className="btn-clip bg-custom_yellow text-black text-xs p-1
             block font-nunito font-bold transition-all lg:text-lg md:w-36 md:h-10 md:p-0 hover:translate-y-2 
             hover:text-white hover:font-black"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
