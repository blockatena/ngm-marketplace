import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { AvatarType, CollectionNftsBodyType } from '../interfaces'
import { QUERIES } from '../react-query/constants'
import { getCollectionNfts, getUser1155Nfts } from '../react-query/queries'
import { opacityAnimation } from '../utils/animations'
import useWindowDimensions from '../utils/hooks/useWindowDimensions'
import AvatarCard from './AvatarCard'
import Pagination from './Pagination'
// import heroIcon from '../../public/images/hero/product_page_hero_icon.png'

const ITEMS_PER_PAGE = 12
const ALPHABETICAL_ORDER = 'AtoZ'
const ORDER = 'NewToOld'

const UserAssets: FC<{ address: string | undefined }> = ({ address }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [nftType, setNftType] = useState('NGM721PSI')
  const [nfts, setNfts] = useState<AvatarType[]>()
  const { width } = useWindowDimensions()
  const { mutate, data } = useMutation(getCollectionNfts)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const { data: nfts1155 } = useQuery(
    [QUERIES.getUser1155Nfts, address, currentPage],
    () => getUser1155Nfts(String(address || ''), currentPage),
    {
      enabled: !!address && nftType === 'NGM1155',
    }
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [nftType])

  useEffect(() => {
    let body: CollectionNftsBodyType = {
      token_owner: address,
      page_number: currentPage,
      items_per_page: ITEMS_PER_PAGE,
      alphabetical_order: ALPHABETICAL_ORDER,
      order: ORDER,
    }
    address && nftType === 'NGM721PSI' && mutate(body)
  }, [mutate, address, currentPage, nftType])

  useEffect(() => {
    if (nftType !== 'NGM1155' && data?.data?.nfts) {
      setNfts(data.data.nfts)
      setCurrentPage(data.data.currentPage)
      setTotalPages(data.data.total_pages)
    } else if (nftType === 'NGM1155' && nfts1155?.data?.nfts) {
      setNfts(nfts1155.data.nfts)
      setCurrentPage(Number(nfts1155.data.current_page))
      setTotalPages(Number(nfts1155.data.total_pages))
    }
  }, [data?.data, nftType, nfts1155?.data])

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
      <div className="text-white font-poppins text-[20px] pb-4 pt-2">
        <span
          className="border-b-2 border-custom_yellow cursor-pointer transition-all"
          style={nftType !== 'NGM721PSI' ? { border: 'none' } : {}}
          onClick={() => setNftType('NGM721PSI')}
        >
          721
        </span>{' '}
        <span className="text-gray-500">|</span>{' '}
        <span
          className="border-b-2 border-custom_yellow cursor-pointer transition-all"
          style={nftType !== 'NGM1155' ? { border: 'none' } : {}}
          onClick={() => setNftType('NGM1155')}
        >
          1155
        </span>
      </div>
      <div
        className="pb-20 md:px-4 bg-[#1F2021] rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
  gap-20 w-full  max-w-full mx-auto px-6 py-9 lg:h-[928px] scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021] overflow-y-scroll"
      >
        {nfts?.length
          ? nfts.map((cardData, index) => (
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
                <AvatarCard {...cardData} />
              </motion.div>
            ))
          : ''}
        {nfts?.length === 0 && (
          <p className="text-white font-poppins p-4 text-center">
            No NFTs owned by this user
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

export default UserAssets
