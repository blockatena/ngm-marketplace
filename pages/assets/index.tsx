import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import AuctionCarousel from '../../components/AuctionCarousel'
import AvatarCard from '../../components/AvatarCard'
import BreadCrumb from '../../components/BreadCrumb'
import Drawer from '../../components/Drawer'
import NavAccordion from '../../components/NavAccordion'
import PageHeading from '../../components/PageHeading'
import Pagination from '../../components/Pagination'
import type { AvatarType } from '../../interfaces'
import { CrumbType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { getAllNFts } from '../../react-query/queries'
import { handleAnimationDelay } from '../../utils'
import { fromLeftAnimation, opacityAnimation } from '../../utils/animations'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'
import withProtection from '../../components/withProtection'
const crumbData: CrumbType[] = [
  { name: 'home', route: '/' },
  { name: 'assets', route: '/assets' },
]

// const avatars: AvatarType[] = [
//   {
//     token_id: 1,
//     name: 'Wraith',
//     img: '/images/auction/auction_img_1.svg',
//     is_in_auction: false,
//     contract_address: '0xfd2b3561630c02b8047B911c22d3f3bfF3ad64Ce',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 2,
//     name: 'Horizon',
//     img: '/images/auction/auction_img_2.svg',
//     is_in_auction: true,
//     contract_address: '0xfd2b4561630c02b8047B911c22d3f3bfF3ad64Ce',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 3,
//     name: 'Lifeline',
//     img: '/images/auction/auction_img_3.svg',
//     is_in_auction: false,
//     contract_address: '0xfd2b3561630c02b8047B911c22d3f3bfF3ad64Ce',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 4,
//     name: 'Fuse',
//     img: '/images/auction/auction_img_4.svg',
//     is_in_auction: true,
//     contract_address: '0xfe2b3561630c02b8047B911c22d3f3bfF3ad64Ce',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 5,
//     name: 'Fortune',
//     img: '/images/auction/auction_img_5.svg',
//     is_in_auction: true,
//     contract_address: '0xfd3b3561630c02b8047B911c22d3f3bfF3ad64Ce',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 6,
//     name: 'Crypto',
//     img: '/images/auction/auction_img_6.svg',
//     is_in_auction: false,
//     contract_address: '0xfd6b3561630c02b8047B911c22d3f3bfF3ad64Ce',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 7,
//     name: 'Wraith',
//     img: '/images/auction/auction_img_1.svg',
//     is_in_auction: true,
//     contract_address: '0xfa2b3561630c02b8047B911c22d3f3bfF3ad64Ce',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 8,
//     name: 'Horizon',
//     img: '/images/auction/auction_img_2.svg',
//     is_in_auction: false,
//     contract_address: '0xfd2b3561630c02b8047B911c22d3f3bfF3ad64Ca',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 9,
//     name: 'Lifeline',
//     img: '/images/auction/auction_img_3.svg',
//     is_in_auction: true,
//     contract_address: '0xfd2b3561630c02b8047B911c22d3f3bfF3ad64Cb',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 10,
//     name: 'Fuse',
//     img: '/images/auction/auction_img_4.svg',
//     is_in_auction: false,
//     contract_address: '0xfd2b3561630c02b8047B911c22d3f3bfF3ad64Cc',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 11,
//     name: 'Fortune',
//     img: '/images/auction/auction_img_5.svg',
//     is_in_auction: true,
//     contract_address: '0xfd2b3161630c02b8047B911c22d3f3bfF3ad64Ce',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
//   {
//     token_id: 12,
//     name: 'Crypto',
//     img: '/images/auction/auction_img_6.svg',
//     is_in_auction: false,
//     contract_address: '0xfd2b3561630c02b8047B911c22d3f3bfF3ad64Ce',
//     contract_type:'',
//     createdAt:'',
//     is_in_sale:false,
//     meta_data_url:'',
//     token_owner:'',
//     updatedAt:'',
//     __v:0,
//     _id:''
//   },
// ]

const SideNav: FC<{ setIsOpen?: Dispatch<SetStateAction<boolean>> }> = ({
  setIsOpen,
}) => {
  const handleClick = () => {
    setIsOpen && setIsOpen(false)
  }

  return (
    <div className="bg-[#1A1D1F] h-[1068px] md:max-w-[244px]">
      <h3 className=" text-center py-2 md:py-4">
        <span
          className="pb-1 px-4 md:px-8 text-white 
      font-oxygen uppercase md:text-[20px]"
        >
          Filter
        </span>
        <div className="px-4 md:px-8">
          <hr className="opacity-10 " />
        </div>
      </h3>
      <NavAccordion heading="Sorted by">
        <button className="w-fit" onClick={handleClick}>
          Recently Added
        </button>
        <button className="w-fit" onClick={handleClick}>
          Latest
        </button>
        <button className="w-fit" onClick={handleClick}>
          Popular
        </button>
      </NavAccordion>
      <NavAccordion heading="NFT State">
        {/* <div className="font-oxygen">
          <input
            type="checkbox"
            id="buy_checkbox"
            className="mr-4 cursor-pointer accent-custom_yellow"
          />
          <label htmlFor="buy_checkbox" className="text-xs md:text-[15px]">
            Buy now
          </label>
        </div> */}
        <div className="font-oxygen">
          <input
            type="checkbox"
            id="auction_checkbox"
            className="mr-4 cursor-pointer accent-custom_yellow"
          />
          <label htmlFor="auction_checkbox" className="text-xs md:text-[15px]">
            On auction
          </label>
        </div>
      </NavAccordion>
      <NavAccordion heading="Price">
        <p className="text-white font-oxygen">
          <span className="mr-4">ETH</span>{' '}
          <input
            type="text"
            placeholder="min"
            className="w-[34px] h-[22px] outline-none bg-transparent border border-[#848484] 
          focus:border-custom_yellow placeholder:text-[10px] pl-1 rounded caret-custom_yellow"
          />{' '}
          to{' '}
          <input
            type="text"
            placeholder="max"
            className="w-[34px] h-[22px] outline-none bg-transparent border border-[#848484] 
          focus:border-custom_yellow placeholder:text-[10px] pl-1 rounded caret-custom_yellow"
          />
        </p>
      </NavAccordion>
      <div className="px-4 flex justify-between cursor-pointer">
        <span className="font-oxygen font-bold text-[#f6f6f6] md:text-[18px]">
          Collections
        </span>{' '}
        <button className="text-[#9D9D9D]">{'>'}</button>
      </div>
    </div>
  )
}

const AssetsPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useQuery([QUERIES.getAllNFts, currentPage], () =>
    getAllNFts(currentPage)
  )
  const { width } = useWindowDimensions()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [avatars, setAvatars] = useState<AvatarType[]>()

  const handlePaginate = (pageNumber: number) => setCurrentPage(pageNumber)

  useEffect(() => {
    if (data?.data) {
      setAvatars(data.data.nfts)
      setTotalPages(data.data?.totalpages)
      setCurrentPage(+data.data?.currentPage)
    }
  }, [data?.data])

  return (
    <main className="min-h-screen">
      <div className="px-4 py-1  md:p-4 pt-6 lg:px-16">
        <BreadCrumb crumbs={crumbData} />
        <PageHeading name="Assets" />
      </div>
      <div className="mt-4 md:mt-14">
        <AuctionCarousel />
      </div>
      <div className="mt-8 md:mt-20 lg:pr-20">
        <div className="grid grid-cols-12 md:gap-4">
          <div className="hidden md:block md:col-span-3">
            <motion.div
              variants={fromLeftAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                delay: 0.6,
                duration: 0.4,
              }}
            >
              <SideNav />
            </motion.div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="hidden md:block">
              <motion.div
                className=" bg-[#353535] flex flex-row gap-4 p-1 rounded font-poppins w-fit"
                variants={opacityAnimation}
                initial="initial"
                whileInView="final"
                viewport={{ once: true }}
                transition={{
                  ease: 'easeInOut',
                  duration: 0.6,
                  delay: 0.5,
                }}
              >
                <button className="text-white text-[14px]">Buy now</button>{' '}
                <button className="text-[#B8B8B8] text-[9px] cursor-pointer font-thin">
                  X
                </button>
              </motion.div>
            </div>
            <div
              className="heading-clip text-white font-oxygen text-[19px] md:hidden bg-[#1A1D1F] w-[172px] h-[42px]
            grid place-items-center uppercase border-b border-gray-700"
              role="button"
              onClick={() => setIsDrawerOpen((prev) => !prev)}
            >
              Filter
            </div>
            <div
              className="py-10 md:px-4 bg-transparent rounded-lg grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
          gap-20 w-full  max-w-full mx-auto px-10"
            >
              {avatars?.length &&
                avatars?.map((cardData, index) => (
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
                      delay: handleAnimationDelay(index, width),
                    }}
                  >
                    <AvatarCard {...cardData} />
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-12">
          <Pagination
            // itemsPerPage={10}
            // totalItems={18}
            totalPages={totalPages}
            paginate={handlePaginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="text-[#E5E5E5] absolute top-0 bottom-0 left-0 right-0 z-30"
            variants={fromLeftAnimation}
            initial="initial"
            animate="final"
            exit="initial"
            transition={{
              ease: 'easeInOut',
              duration: 0.25,
            }}
          >
            <Drawer setIsOpen={setIsDrawerOpen}>
              <SideNav setIsOpen={setIsDrawerOpen} />
            </Drawer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default withProtection(AssetsPage)
