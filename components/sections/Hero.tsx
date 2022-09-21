import Image from 'next/image'
import { FC } from 'react'

import HomeHeader from '../HomeHeader'

const Hero: FC = () => {
  return (
    <div
      className="min-h-screen bg-scroll bg-cover"
      style={{
        backgroundImage: "url('/img/home_hero_bg.png')",
      }}
    >
      <HomeHeader />
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="text-white flex-1 flex justify-center flex-col gap-8 pl-4 lg:pl-16">
          <p className="text-3xl lg:text-5xl font-bold uppercase font-poppins">
            THE FIRST <span className="text-custom_yellow">NFT</span> <br />
            for Transparency and Community-Driven
          </p>
          <p>
            <button
              className="bg-custom_yellow text-black font-poppins font-medium 
        hover:shadow-md hover:shadow-yellow-300 p-2 rounded lg:text-3xl"
            >
              Let&apos;s Explore
            </button>
          </p>
        </div>
        <div className="flex-1">
          <Image src="/img/home_hero.png" alt="" width="920px" height="779px" />
        </div>
      </div>
    </div>
  )
}

export default Hero
