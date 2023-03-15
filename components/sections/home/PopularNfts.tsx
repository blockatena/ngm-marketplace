import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { useQuery } from 'react-query'
import { QUERIES } from '../../../react-query/constants'
import { getPopularNFTs } from '../../../react-query/queries'
import {
  fromBottomAnimation,
  fromRightAnimation,
  opacityAnimation,
} from '../../../utils/animations'
import useIsMounted from '../../../utils/hooks/useIsMounted'
import OutlinedNftCard from '../../OutlinedNftCard'
import SectionContainer from '../../SectionContainer'
// const nfts = [
//   '/images/auction/auction_img_5.svg',
//   '/images/auction/auction_img_1.svg',
//   '',
//   '/images/auction/auction_img_2.svg',
// ]

// Popular NFTs section
const PopularNfts = () => {
  const router = useRouter()
  const [nfts, setNFTs] = useState<any[]>([])
  const isMounted = useIsMounted()

  const { data } = useQuery([QUERIES.getPopularNFTs], () => getPopularNFTs(), {
    enabled: !!nfts,
    refetchIntervalInBackground: true,
  })
  useEffect(() => {
    setNFTs(data?.data !== 'Curently no nfts are in popular' ? data?.data : [])
  }, [data])

  return (
    <section
      className={` bg-[#0A0A0A] pb-40`}
      style={{
        backgroundImage: "url('/images/others/why_us_bg2.svg')",
      }}
    >
      {nfts?.length > 0 && isMounted && (
        <SectionContainer>
          <motion.h2
            className="text-center text-4xl lg:text-[55px] text-white lg:leading-[66.6496px] pt-4 lg:pt-20"
            variants={fromBottomAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
              delay: 0.6,
            }}
          >
            View Popular <span className="text-[#FEE400]">NFTs</span>
          </motion.h2>
          {nfts?.length > 0 && isMounted && (
            <motion.div
              className="flex flex-col items-center  sm:flex-row sm:justify-evenly flex-wrap gap-10 pt-20 pl-4 sm:pl-0"
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
              {nfts?.map((item: any, i: any) => (
                <motion.div
                  key={i}
                  variants={fromRightAnimation}
                  initial="initial"
                  whileInView="final"
                  viewport={{ once: true }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    delay: 0.1 + i / 5,
                  }}
                >
                  <OutlinedNftCard nft={item} />
                </motion.div>
              ))}
              {/* <OutlinedNftCard img="/images/auction/auction_img_5.svg" />
        <OutlinedNftCard img="/images/auction/auction_img_1.svg" />
        <OutlinedNftCard />
        <OutlinedNftCard img="/images/auction/auction_img_2.svg" /> */}
            </motion.div>
          )}
          <div className="flex justify-center p-12">
            <motion.button
              className="text-white flex items-center justify-center w-[16rem] md:w-[23rem] md:h-[3.888rem] gap-4 bg-gradient-to-r 
      from-[#BD00D1] via-[#000000] to-[#FFC701] rounded-full hover:to-[#BD00D1] hover:via-[#000000] hover:from-[#FFC701]
      font-poppins text-xl py-4 md:text-[1.68rem] font-normal"
              onClick={() => router.push('/assets')}
              variants={fromBottomAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.5,
                delay: 0.1,
              }}
            >
              Discover More NFTS <IoChevronForwardSharp />
            </motion.button>
          </div>
        </SectionContainer>
      )}
    </section>
  )
}

export default PopularNfts
