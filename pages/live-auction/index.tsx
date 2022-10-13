import { motion } from 'framer-motion'
import { NextPage } from 'next'
import { FC, ReactNode, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import AvatarCard from '../../components/AvatarCard'
import BreadCrumb from '../../components/BreadCrumb'
import PageHeading from '../../components/PageHeading'
import Pagination from '../../components/Pagination'
import AuctionCarousel from '../../components/sections/AuctionCarousel'
import { CrumbType } from '../../interfaces'
import { handleAnimationDelay } from '../../utils'
import { opacityAnimation } from '../../utils/animations'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

const crumbData: CrumbType[] = [
  { name: 'home', route: '/' },
  { name: 'live auction', route: '/live-auction' },
]

const avatars = [
  { name: 'Wraith', img: '/images/auction/auction_img_1.svg' },
  { name: 'Horizon', img: '/images/auction/auction_img_2.svg' },
  { name: 'Lifeline', img: '/images/auction/auction_img_3.svg' },
  { name: 'Fuse', img: '/images/auction/auction_img_4.svg' },
  { name: 'Fortune', img: '/images/auction/auction_img_5.svg' },
  { name: 'Crypto', img: '/images/auction/auction_img_6.svg' },
  { name: 'Wraith', img: '/images/auction/auction_img_1.svg' },
  { name: 'Horizon', img: '/images/auction/auction_img_2.svg' },
  { name: 'Lifeline', img: '/images/auction/auction_img_3.svg' },
  { name: 'Fuse', img: '/images/auction/auction_img_4.svg' },
  { name: 'Fortune', img: '/images/auction/auction_img_5.svg' },
  { name: 'Crypto', img: '/images/auction/auction_img_6.svg' },
]

const NavAccordion: FC<{ children?: ReactNode; heading: string }> = ({
  children,
  heading,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="my-2">
      <h6
        className="bg-[#141414] text-[#F6F6F6] flex justify-between border-l-2 border-custom_yellow 
  px-4 py-2 font-oxygen cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-bold md:text-lg">{heading}</span>{' '}
        <button>
          {!isOpen ? (
            <FaAngleDown className="text-[#9D9D9D]" />
          ) : (
            <FaAngleUp className="text-[#9D9D9D]" />
          )}
        </button>
      </h6>
      <div
        className={`font-oxygen text-xs md:text-[15px] text-white ${
          isOpen && 'px-4'
        } ${isOpen && 'py-3'}
     flex flex-col gap-3 ${
       !isOpen && 'h-0'
     } overflow-hidden transition-all duration-300`}
      >
        {children}
        <hr className="opacity-10" />
      </div>
    </div>
  )
}

const SideNav: FC = () => {
  return (
    <div className="bg-[#1A1D1F] h-[1068px] max-w-[244px]">
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
        <button className="w-fit">Recently Added</button>
        <button className="w-fit">Latest</button>
        <button className="w-fit">Popular</button>
      </NavAccordion>
      <NavAccordion heading="NFT State">
        <div className="font-oxygen">
          <input
            type="checkbox"
            id="buy_checkbox"
            className="mr-4 cursor-pointer accent-custom_yellow"
          />
          <label htmlFor="buy_checkbox" className="text-xs md:text-[15px]">
            Buy now
          </label>
        </div>
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

const LiveAuctionPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { width } = useWindowDimensions()

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen">
      <div className=" p-4 pt-6 lg:px-16 mb-6">
        <BreadCrumb crumbs={crumbData} />
        <PageHeading name="live auction" />
      </div>
      <div className="mt-8">
        <AuctionCarousel />
      </div>
      <div className="mt-20 pr-20">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <SideNav />
          </div>
          <div className="col-span-9">
            <div>
              <div className=" bg-[#353535] flex flex-row gap-4 p-1 rounded font-poppins w-fit">
                <button className="text-white text-[14px]">Buy now</button>{' '}
                <button className="text-[#B8B8B8] text-[9px] cursor-pointer font-thin">
                  X
                </button>
              </div>
            </div>
            <div
              className="py-10 md:px-4 bg-transparent rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
          gap-20 w-full  max-w-full mx-auto px-6"
            >
              {avatars?.map((cardData, index) => (
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
            itemsPerPage={6}
            totalItems={18}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default LiveAuctionPage
