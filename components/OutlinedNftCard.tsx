import Image from 'next/image'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaEthereum } from 'react-icons/fa'

//Outline for NFTs Card
const OutlinedNftCard: FC<{
  name?: string
  desc?: string
  img?: string
  stat?: string
}> = ({
  name = 'Yogi Bera',
  img = '/images/auction/auction_img_3.svg',
  desc = 'College of Art',
  stat = '0,69 ($1.089,84)',
}) => {
  return (
    <div>
      <div className="border border-white w-[250px] h-[360px] relative text-white font-poppins">
        <div className="absolute left-2 -right-8 -top-4 bottom-2 bg-[#17191C]">
          <div className="bg-black h-[48px] w-[48px] rounded-full absolute right-4 top-5 grid place-items-center cursor-pointer z-20">
            <AiOutlineHeart fontSize={24} />
          </div>
          <div className="relative h-[70%] w-full">
            <Image
              src={img}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </div>
          <div className="h-[30%] p-2">
            <p className=" bottom-[48px] left-8 font-inter font-bold capitalize">
              {name}
            </p>
            <p className=" bottom-[16px] left-8 flex items-center gap-1 text-[#C1C1C1] text-[12px]">
              {desc}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-white flex gap-1 items-center">
                <FaEthereum color="#12D8FA" /> {stat}
              </p>
              <p>
                <button
                  className="text-black bg-gradient-to-r from-[#F8D40A] to-[#F47721] capitalize h-[2.77rem] w-[6.125rem] 
                  px-4 py-[10px] rounded-full font-bold font-poppins text-sm hover:from-[#F47721] hover:to-[#F8D40A]"
                >
                  buy now
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutlinedNftCard
