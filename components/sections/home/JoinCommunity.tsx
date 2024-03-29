import Image from 'next/image'
import { ReactElement } from 'react'
import SectionContainer from '../../SectionContainer'

// Join Community Section for home
function JoinCommunity(): ReactElement {
  const join = () => {
    window.open('https://discord.gg/Uy63DSnByG', '_blank')
  }
  return (
    <section className="py-16 lg:py-24 text-white bg-gradient-to-tr from-[#4315A5] to-[#E26C1A]">
      <SectionContainer>
        <div className="grid place-items-center">
          <h2 className="capitalize font-bold lg:text-[3rem] text-3xl lg:leading-[3.5438rem] font-inter">
            join our <span className="text-[#FEE400]">community!</span>
          </h2>
          <p className="lg:text-[1.45rem] leading-[1.875rem] font-poppins max-w-[56.8125rem] text-center my-6">
            Join our GamestoWeb3 community to network, access exclusive content,
            and stay updated on the latest Web3 gaming news and trends.
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
            className=" xl:pl-8 gap-3 px-4 flex items-center hover:bg-[#5865F2] xl:w-[18rem] xl:h-[5rem] text-center bg-black p-2 text-white font-poppins rounded-[1rem] font-normal text-3xl leading-[1.2194rem]"
            onClick={() => join()}
          >
            <p className="relative h-[1.875rem] w-[1.875rem] xl:h-[3.75rem] xl:w-[3.75rem]">
              <Image
                alt="icon"
                src={'/images/others/Discord.svg'}
                layout="fill"
                // height={60}
                // width={60}
              />
            </p>
            <h5
              className={`text-2xl xl:text-[2.3rem] leading-[2.375rem] capitalize py-4`}
            >
              Discord
            </h5>
            {/* <p>{body}</p> */}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

export default JoinCommunity
