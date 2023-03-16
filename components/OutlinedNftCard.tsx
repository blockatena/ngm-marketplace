import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
// import { AiOutlineHeart } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { FaEthereum } from 'react-icons/fa'
import { opacityAnimation } from '../utils/animations'

//Outline for NFTs Card
const OutlinedNftCard: FC<{
  nft: any
}> = ({ nft }) => {
  const router = useRouter()
  const handleOnClick = () => {
    router.push(`/assets/${nft?.contract_address}/${nft?.token_id}`)
  }
  const [isImage, setIsImage] = useState<boolean>()
  async function isImgUrl(url: string) {
    const img = new Image()
    img.src = url
    return new Promise((resolve) => {
      img.onload = async () => {
        resolve(true)
        await setIsImage(true)
      }
      img.onerror = async () => {
        resolve(false)
        await setIsImage(false)
      }
    })
  }
  useEffect(() => {
    isImgUrl(nft?.meta_data?.image)
  }, [nft])

  return (
    <div>
      <motion.div
        className="border border-white w-[14.6875rem] h-[22.5rem] relative text-white font-poppins"
        variants={opacityAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          delay: 0.6,
        }}
      >
        <div className="absolute left-2 -right-8 -top-4 bottom-2 bg-[#17191C]">
          {/* <div className="bg-black h-[48px] w-[48px] rounded-full absolute right-4 top-5 grid place-items-center cursor-pointer z-20">
            <AiOutlineHeart fontSize={24} />
          </div> */}
          <div
            className={`relative h-[70%] w-full  bg-repeat-round`}
            style={{
              backgroundImage: `url(${
                isImage
                  ? nft?.meta_data?.image
                  : '/images/others/default_nft.jpeg'
              })`,
            }}
          >
            {/* <Image
              src={nft?.meta_data?.image}
              className="rounded-sm"
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            /> */}
          </div>
          <div className="h-[30%] p-2">
            <p className=" bottom-[48px] left-8 font-inter font-bold capitalize pb-1 xl:pb-3">
              {nft?.meta_data?.name}
            </p>
            {/* <p className=" bottom-[16px] left-8 flex items-center gap-1 text-[#C1C1C1] text-[12px]">
              {desc}
            </p> */}
            <div className="flex justify-between items-center">
              <p className="text-white flex gap-1 items-center text-sm xl:text-xl">
                <FaEthereum color="#12D8FA" /> {nft?.price}
              </p>
              <p>
                <button
                  className="text-black bg-gradient-to-r from-[#F8D40A] to-[#F47721] capitalize h-[2.77rem] w-[6.125rem] 
                  px-4 py-[10px] rounded-full font-bold font-poppins text-sm hover:from-[#F47721] hover:to-[#F8D40A]"
                  onClick={() => handleOnClick()}
                >
                  buy now
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default OutlinedNftCard
