import { useRouter } from 'next/router'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { CONTAINER_PADDING } from '../../utils/constants'
import OutlinedNftCard from '../OutlinedNftCard'

const PopularNfts = () => {
  const router = useRouter()
  return (
    <section className={`${CONTAINER_PADDING} bg-[#0A0A0A] pb-40`}>
      <h2 className="lg:text-[5rem] lg:leading-[6.0512rem] font-inter text-white max-w-[40.5625rem] pt-8 pb-12">
        View Popular NFTS
      </h2>{' '}
      <div className="flex justify-evenly flex-wrap gap-16">
        <OutlinedNftCard img="/images/auction/auction_img_5.svg" />
        <OutlinedNftCard img="/images/auction/auction_img_1.svg" />
        <OutlinedNftCard />
        <OutlinedNftCard img="/images/auction/auction_img_2.svg" />
      </div>
      <div className="flex justify-center p-12">
        <button
          className="text-white flex items-center justify-center w-[17.25rem] h-[3.0625rem] gap-4 bg-gradient-to-r 
      from-[#BD00D1] via-[#000000] to-[#FFC701] rounded-full hover:to-[#BD00D1] hover:via-[#000000] hover:from-[#FFC701]
      font-poppins text-lg font-semibold"
          onClick={() => router.push('/assets')}
        >
          Discover More NFTS <IoChevronForwardSharp />
        </button>
      </div>
    </section>
  )
}

export default PopularNfts
