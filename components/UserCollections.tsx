import { motion } from 'framer-motion'
import {  FC, useEffect, useState } from 'react'
import { opacityAnimation } from '../utils/animations'
import useWindowDimensions from '../utils/hooks/useWindowDimensions'
import Pagination from './Pagination'
import { QUERIES } from '../react-query/constants'
import { getUserCollections } from '../react-query/queries'
import { CollectionCardType } from '../interfaces'
import CollectionCard from './CollectionCard'
// import heroIcon from '../../public/images/hero/product_page_hero_icon.png'
import { useQuery } from 'react-query'

const ITEMS_PER_PAGE = 6


// User collections for /profile & /profile/userAddress Route
const UserCollections: FC<{
  address: any
}> = ({ address}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [collections, setCollections] = useState<CollectionCardType[]>()
  const { width } = useWindowDimensions()
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // get User's All collections 
  const { data } = useQuery(
    [QUERIES.getUserCollections, address, currentPage, ITEMS_PER_PAGE],
    () => getUserCollections(address, currentPage, ITEMS_PER_PAGE),
    {
      enabled: !!address,
      refetchIntervalInBackground: true,
    }
  )

  useEffect(() => {
    setTotalPages(data?.data?.total / ITEMS_PER_PAGE)
    setCollections(data?.data?.collections)
  }, [data])

  // handle Delay 
  const handleDelay = (index: number): number => {
    if (width >= 1536) {
      if (index < 8) return 1.2 + index * 0.2
      else return index * 0.2
    } else if (width >= 1280) {
      if (index < 3) return 1.2 + index * 0.2
      else return index * 0.2
    } else if (width >= 768) {
      if (index < 4) return 1.2 + index * 0.2
      else return index * 0.2
    } else {
      if (index < 1) return 1.2 + index * 0.2
      else return index * 0.2
    }
  }

  return (
    <>
      <div
        className="pb-20 md:px-4 bg-[#1F2021] rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
  gap-20 w-full  max-w-full mx-auto px-6 py-9 lg:h-[928px] scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021] overflow-y-scroll"
      >
        {collections?.length
          ? collections.map((collection, index) => (
              <motion.div
                className="flex justify-center"
                key={index}
                variants={opacityAnimation}
                initial="initial"
                whileInView="final"
                viewport={{ once: true }}
                transition={{
                  ease: 'easeInOut',
                  duration: 0.6,
                  delay: handleDelay(index),
                }}
              >
                <CollectionCard {...collection} />
              </motion.div>
            ))
          : ''}
        {collections?.length === 0 && (
          <p className="text-white font-poppins p-4 text-center">
            No Collections owned by this user
          </p>
        )}
      </div>
      <div className="flex justify-end p-4 pb-10">
        <Pagination
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}

export default UserCollections
