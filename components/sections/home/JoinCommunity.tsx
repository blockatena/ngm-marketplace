import { ReactElement } from 'react'


// Join Community Section for home
function JoinCommunity(): ReactElement {
  return (
    <section className="py-16 lg:py-24  px-[5%] 2xl:px-[12%] grid place-items-center text-white bg-gradient-to-tr from-[#4315A5] to-[#E26C1A]">
      <h2 className="capitalize font-bold lg:text-[3rem] text-3xl lg:leading-[3.5438rem] font-inter">
        join our community!
      </h2>
      <p className="lg:text-[1.25rem] leading-[1.875rem] font-poppins max-w-[56.8125rem] text-center my-6">
        Join Our GamestoWeb3 community and connect with like-minded individuals,
        access exclusive content, and stay up to date with the latest news and
        trends in Web3 gaming. We at GamesToWeb3 have our own discord group
        consisting of 150+ members. Be a part of it.
      </p>
      <button className="uppercase bg-black hover:bg-[#4315A5] w-[9.3419rem] h-[3.125rem] rounded font-poppins font-bold text-[.7506rem] leading-[1.2194rem]">
        get started
      </button>
    </section>
  )
}

export default JoinCommunity
