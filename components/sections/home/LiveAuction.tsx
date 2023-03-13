import { motion } from 'framer-motion'
import { FC } from 'react'
import {
  fromBottomAnimation,
  fromRightAnimation,
} from '../../../utils/animations'
import OutlinedNftCard from '../../OutlinedNftCard'
import SectionContainer from '../../SectionContainer'
import { getAuctionNFTs } from '../../../react-query/queries'
import { QUERIES } from '../../../react-query/constants'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import useIsMounted from '../../../utils/hooks/useIsMounted'

// Live Auction Section
const LiveAuction: FC = () => {
  const isMounted = useIsMounted()
    const [nfts, setNFTs] = useState<any[]>([])

    const { data } = useQuery(
      [QUERIES.getAuctionNFTs],
      () => getAuctionNFTs(),
      {
        enabled: !!nfts,
        refetchIntervalInBackground: true,
      }
    )
    useEffect(() => {
      setNFTs(data?.data !== 'Curently no nfts are in auction'?data?.data:[])
    }, [data])
  return (
    <>
      {nfts?.length > 0 && isMounted && (
        <section className={`text-[#fff] bg-[#0A0A0A] py-10 lg:pb-40 lg:pt-8`}>
          {nfts?.length > 0 && isMounted && (
            <SectionContainer>
              <motion.h2
                className="text-center text-4xl lg:text-[4rem] lg:leading-[66.6496px] pt-4 lg:pt-20"
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
                Live <span className="text-[#FF00F8]">Auction</span>
              </motion.h2>

              {nfts?.length > 0 && isMounted && (
                <div className="flex flex-col items-center  sm:flex-row sm:justify-evenly flex-wrap gap-10 pt-20 pl-4 sm:pl-0">
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
                </div>
              )}
            </SectionContainer>
          )}
        </section>
      )}
    </>
  )
}

export default LiveAuction
