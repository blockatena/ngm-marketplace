import { ReactElement } from 'react'
import Image from 'next/image'

// Join Community Section for home
function JoinCommunity(): ReactElement {
  const join = () => {
    window.open('https://discord.gg/Uy63DSnByG', '_blank')
  }
  return (
    <section className="py-16 lg:py-24  px-[5%] 2xl:px-[12%] grid place-items-center text-white bg-gradient-to-tr from-[#4315A5] to-[#E26C1A]">
      <h2 className="capitalize font-bold lg:text-[3rem] text-3xl lg:leading-[3.5438rem] font-inter">
        join our <span className="text-[#FEE400]">community</span>!
      </h2>
      <p className="lg:text-[1.25rem] leading-[1.875rem] font-poppins max-w-[56.8125rem] text-center my-6">
        Join our GamestoWeb3 community to network, access exclusive content, and
        stay updated on the latest Web3 gaming news and trends.
      </p>
      {/* <button className=" inline-flex text-center bg-black hover:bg-[#4315A5] w-[22.125rem] h-[6rem] rounded-[1.875rem] font-poppins font-bold text-3xl leading-[1.2194rem]">
        <>
        <p>
          <Image
            alt="icon"
            src={'/images/others/Discord.svg'}
            height={66}
            width={72.85}
          />
        </p>
        <h5 className={` text-[2.875rem] leading-[2.375rem] capitalize py-4`}>
          Discord
        </h5>
        {/* <p>{body}</p> 
      </div>
      </button> */}

      <div
        className=" gap-8 inline-flex hover:bg-[#4315A5] w-[22.125rem] h-[6rem] text-center bg-black p-4 text-white font-poppins rounded-[1.875rem] font-semibold text-3xl leading-[1.2194rem]"
        onClick={() => join()}
      >
        <p>
          <Image
            alt="icon"
            src={'/images/others/Discord.svg'}
            height={66}
            width={72.85}
          />
        </p>
        <h5 className={` text-[2.875rem] leading-[2.375rem] capitalize py-4`}>
          Discord
        </h5>
        {/* <p>{body}</p> */}
      </div>
    </section>
  )
}

export default JoinCommunity
