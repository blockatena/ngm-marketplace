import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fromLeftAnimation, opacityAnimation } from '../../utils/animations'
import { CONTAINER_PADDING } from '../../utils/constants'
import { useQuery } from 'react-query'
import type { AvatarType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { getAllNFts } from '../../react-query/queries'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'
import AvatarCard from '../AvatarCard'



const CURRENT_PAGE = 1

// Live Auction Section
const LiveAuctionSection: React.FC = () => {
  const [avatars, setAvatars] = useState<AvatarType[]>()
  const [clientWidth, setClientWidth] = useState(1)
  const { data } = useQuery([QUERIES.getAllNFts, CURRENT_PAGE], () =>
    getAllNFts(CURRENT_PAGE,12,"NEWTOOLD","NA")
  )
  const { width } = useWindowDimensions()

  useEffect(() => {
    setClientWidth(width)
  }, [width])

  useEffect(() => {
    if (data?.data) {
      setAvatars(data.data.nfts)
    }
  }, [data?.data])

  const is2xl = clientWidth >= 1536

  return (
    <section className="w-full min-h-screen 2xl:min-h-full pt-10">
      <div
        className={`${CONTAINER_PADDING} w-full flex justify-start items-center mx-auto pb-12`}
      >
        <motion.h2
          variants={fromLeftAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.4,
          }}
          className="z-10 text-white leading-none font-popins font-medium text-[32px] md:text-[38px] lg:text-[50px] relative before:absolute before:w-[4px] before:h-[30px] before:md:h-[35px] before:lg:h-[48px] before:bg-[#FFDC20] before:-translate-x-2 before:md:-translate-x-3 before:lg:-translate-x-4 pt-10"
        >
          Top Assets
        </motion.h2>
      </div>
      <motion.div
        variants={opacityAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          delay: 0.9,
        }}
        className={`${CONTAINER_PADDING} grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 lg:gap-20 w-full bg-black mx-auto py-9 rounded-xl`}
      >
        {avatars?.map((avatar, index) => {
          if (is2xl && index < 8) {
            return (
              <div className="flex justify-center" key={index}>
                <AvatarCard {...avatar} />
              </div>
            )
          }
          if (!is2xl && index < 6)
            return (
              <div className="flex justify-center" key={index}>
                <AvatarCard {...avatar} />
              </div>
            )
        })}
      </motion.div>
    </section>
  )
}

export default LiveAuctionSection
