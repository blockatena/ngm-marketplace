import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import AuctionCarousel from '../../components/AuctionCarousel'
import AvatarCard from '../../components/AvatarCard'
import BreadCrumb from '../../components/BreadCrumb'
import PageHeading from '../../components/PageHeading'
import Pagination from '../../components/Pagination'
import { CrumbType } from '../../interfaces'
import { handleAnimationDelay } from '../../utils'
import { fromLeftAnimation, opacityAnimation } from '../../utils/animations'
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

const Drawer: FC<{
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children?: ReactNode
}> = ({ setIsOpen, children }) => {
  return (
    <div className="min-h-screen absolute top-0 right-4 left-4 p-4 bg-[#1F2021] rounded-lg">
      <div className="text-right font-light">
        <span className="cursor-pointer" onClick={() => setIsOpen(false)}>
          X
        </span>
      </div>
      {children}
    </div>
  )
}

const LiveAuctionPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { width } = useWindowDimensions()

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <main className="min-h-screen">
      <div className="px-4 py-1  md:p-4 pt-6 lg:px-16">
        <BreadCrumb crumbs={crumbData} />
        <PageHeading name="live auction" />
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
              <div className=" bg-[#353535] flex flex-row gap-4 p-1 rounded font-poppins w-fit">
                <button className="text-white text-[14px]">Buy now</button>{' '}
                <button className="text-[#B8B8B8] text-[9px] cursor-pointer font-thin">
                  X
                </button>
              </div>
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
            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
              <SideNav setIsOpen={setIsDrawerOpen} />
            </Drawer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default LiveAuctionPage
