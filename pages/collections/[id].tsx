import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import Image from 'next/image'
import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react'
import AvatarCard from '../../components/AvatarCard'
import BreadCrumb from '../../components/BreadCrumb'
import Drawer from '../../components/Drawer'
import NavAccordion from '../../components/NavAccordion'
import PageHeading from '../../components/PageHeading'
import Pagination from '../../components/Pagination'
import type { AvatarType } from '../../interfaces'
import { CrumbType } from '../../interfaces'
import { handleAnimationDelay } from '../../utils'
import { fromLeftAnimation, opacityAnimation } from '../../utils/animations'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

const crumbData: CrumbType[] = [
  { name: 'home', route: '/' },
  { name: 'apex legend', route: '/' },
]

const avatars: AvatarType[] = [
  {
    id: 1,
    name: 'Wraith',
    img: '/images/auction/auction_img_1.svg',
    isOnAuction: false,
  },
  {
    id: 2,
    name: 'Horizon',
    img: '/images/auction/auction_img_2.svg',
    isOnAuction: true,
  },
  {
    id: 3,
    name: 'Lifeline',
    img: '/images/auction/auction_img_3.svg',
    isOnAuction: false,
  },
  {
    id: 4,
    name: 'Fuse',
    img: '/images/auction/auction_img_4.svg',
    isOnAuction: true,
  },
  {
    id: 5,
    name: 'Fortune',
    img: '/images/auction/auction_img_5.svg',
    isOnAuction: true,
  },
  {
    id: 6,
    name: 'Crypto',
    img: '/images/auction/auction_img_6.svg',
    isOnAuction: false,
  },
  {
    id: 7,
    name: 'Wraith',
    img: '/images/auction/auction_img_1.svg',
    isOnAuction: true,
  },
  {
    id: 8,
    name: 'Horizon',
    img: '/images/auction/auction_img_2.svg',
    isOnAuction: false,
  },
  {
    id: 9,
    name: 'Lifeline',
    img: '/images/auction/auction_img_3.svg',
    isOnAuction: true,
  },
  {
    id: 10,
    name: 'Fuse',
    img: '/images/auction/auction_img_4.svg',
    isOnAuction: false,
  },
  {
    id: 11,
    name: 'Fortune',
    img: '/images/auction/auction_img_5.svg',
    isOnAuction: true,
  },
  {
    id: 12,
    name: 'Crypto',
    img: '/images/auction/auction_img_6.svg',
    isOnAuction: false,
  },
]

const currencyData: string[] = ['eth', 'weth', 'ape', 'usdc']

const SideNav: FC<{ setIsOpen?: Dispatch<SetStateAction<boolean>> }> = ({
  setIsOpen,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [currency, setCurrency] = useState('')
  // eslint-disable-next-line no-unused-vars
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
        <button
          className="text-base mt-2 rounded bg-custom_yellow text-black enabled:hover:bg-custom-orange-hover
        disabled:bg-[#625B5B] disabled:text-white h-[27px] w-full font-oxygen text-[13px]"
          disabled
        >
          Apply
        </button>
      </NavAccordion>
      <NavAccordion heading="Currency">
        {/* <button className="w-fit" onClick={handleClick}>
          Recently Added
        </button>
        <button className="w-fit" onClick={handleClick}>
          Latest
        </button>
        <button className="w-fit" onClick={handleClick}>
          Popular
        </button> */}
        <div>
          {currencyData.map((currency, index) => {
            return (
              <Fragment key={index}>
                <input
                  className="mr-2 bg-[#1D2530] accent-custom_yellow"
                  type="radio"
                  id={currency}
                  name="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                <label
                  htmlFor={currency}
                  className="uppercase font-oxygen text-sm lg:text-[15px]"
                >
                  {currency}
                </label>
                <br />
              </Fragment>
            )
          })}
          {/* <input
            type="radio"
            id="html"
            name="fav_language"
            value="HTML"
            onChange={(e) => setCurrency(e.target.value)}
          />
          <label htmlFor="html">HTML</label>
          <br />
          <input
            type="radio"
            id="css"
            name="fav_language"
            value="CSS"
            onChange={(e) => setCurrency(e.target.value)}
          />
          <label htmlFor="css">CSS</label>
          <br />
          <input
            type="radio"
            id="javascript"
            name="fav_language"
            value="JavaScript"
            onChange={(e) => setCurrency(e.target.value)}
          />
          <label htmlFor="javascript">JavaScript</label> */}
        </div>
      </NavAccordion>
    </div>
  )
}

const CollectionHeroSection: FC = () => {
  return (
    <motion.section
      className="w-full h-[279px] bg-cover p-2 flex justify-between items-end lg:px-4 lg:py-2"
      style={{
        backgroundImage: "url('/images/collections/collection_hero.png')",
      }}
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
      <div className="flex justify-between w-full">
        <div className="flex gap-4">
          <div>
            <Image
              src="/images/collections/collection_avatar.png"
              width="150px"
              height="130px"
              alt="collection_img"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-end">
            <h2 className="font-poppins mb-3 text-white font-medium text-2xl lg:text-[35px]">
              Apex Legend1234#
            </h2>
            <p className="text-white font-oxygen text-sm lg:text-lg">
              <span>Items 10.0K </span> · <span>Created Aug 2022</span> ·{' '}
              <span>Creator fee 5%</span>{' '}
            </p>
          </div>
        </div>
        <div className="flex justify-end items-end gap-2">
          <Image
            src="/images/icons/like.svg"
            alt="like"
            width="20px"
            height="18px"
          />
          <Image
            src="/images/icons/share.svg"
            alt="share"
            width="20px"
            height="18px"
          />
        </div>
      </div>
    </motion.section>
  )
}

const CollectionInfoSection: FC = () => {
  return (
    <motion.section
      variants={opacityAnimation}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      transition={{
        ease: 'easeInOut',
        duration: 0.5,
        delay: 0.8,
      }}
    >
      <p className="font-oxygen text-[#A0A0A0] text-sm lg:text-lg font-bold max-w-[930px] py-5 lg:py-10">
        We believe that people with imagination can change the world for better
        and those that are crazy enough to think they can bring their wildest
        imaginations to life are the ones&apos; who actually do.{' '}
      </p>

      <div className="max-w-[600px] flex justify-between">
        <div className="grid place-items-center">
          <p className="font-oxygen text-white lg:text-[19px] font-light">15</p>
          <p className="text-[#AFAFAF] font-oxygen text-xs lg:text-[15px] font-light">
            Total Volume
          </p>
        </div>
        <div className="grid place-items-center">
          <p className="font-oxygen text-white lg:text-[19px] font-light">
            0.015
          </p>
          <p className="text-[#AFAFAF] font-oxygen text-xs lg:text-[15px] font-light">
            Floor Price
          </p>
        </div>
        <div className="grid place-items-center">
          <p className="font-oxygen text-white lg:text-[19px] font-light">
            0.017
          </p>
          <p className="text-[#AFAFAF] font-oxygen text-xs lg:text-[15px] font-light">
            Best Offer
          </p>
        </div>
        <div className="grid place-items-center">
          <p className="font-oxygen text-white lg:text-[19px] font-light">
            1,245
          </p>
          <p className="text-[#AFAFAF] font-oxygen text-xs lg:text-[15px] font-light">
            Owners
          </p>
        </div>
      </div>
    </motion.section>
  )
}

const CollectionSearchSection: FC = () => {
  const { width } = useWindowDimensions()
  return (
    <motion.section
      className="grid grid-cols-12 mt-5 lg:mt-10 gap-2 lg:gap-4"
      variants={opacityAnimation}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      transition={{
        ease: 'easeInOut',
        duration: 1,
        delay: 0.9,
      }}
    >
      <div className="grid col-span-1 md:col-span-1">
        <div className="cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-[52px] lg:h-[52px] rounded-full grid place-items-center border border-[#6A6363]">
          <Image
            src="/images/icons/align-center.svg"
            alt=""
            width={width < 500 ? '14px' : width < 1024 ? '20px' : '32px'}
            height={width < 500 ? '14px' : width < 1024 ? '20px' : '32px'}
          />
        </div>
      </div>
      <div className="grid col-span-7 md:col-span-9">
        <div className="relative h-9 lg:h-[51px] w-full">
          <span className="absolute left-1 top-2 w-fit z-20 text-primary font-bold lg:top-4">
            <Image
              src="/images/icons/search.svg"
              alt="search"
              width="25px"
              height="15px"
            />
          </span>
          <input
            type="text"
            placeholder="Search by name"
            className="w-full h-full px-7 lg:pl-12 rounded-lg caret-custom_yellow placeholder:text-[#888888] font-light text-white 
        focus:border focus:border-custom_yellow focus:outline-none bg-[#101011] border border-[#6A6363]"
          />
          {/* <span className="absolute right-3 top-2 w-fit z-20 text-[#898989] font-light text-sm cursor-pointer md:top-3">
          X
        </span> */}
        </div>
      </div>
      <div className="grid col-span-4 md:col-span-2">
        <select
          id="expiration"
          className="w-full max-w-[175px] lg:h-[51px] cursor-pointer bg-[#151515] outline-none rounded-lg
          font-inter text-white text-center text-xs lg:text-base border border-[#6A6363]"
        >
          <option value={3}>Recently Listed</option>
          <option value={2}>Option Two</option>
          <option value={1}>Option Three</option>
        </select>
      </div>
    </motion.section>
  )
}

const CollectionPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { width } = useWindowDimensions()

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <main className="min-h-screen">
      <div className="px-4 py-1  md:p-4 pt-6 lg:px-16">
        <BreadCrumb crumbs={crumbData} />
        <PageHeading name="apex legend" />
      </div>
      <div className="px-4 py-1 md:p-4 pt-6 lg:px-16 mt-4 md:mt-14">
        <CollectionHeroSection />
        <CollectionInfoSection />
        <CollectionSearchSection />
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
            <Drawer setIsOpen={setIsDrawerOpen}>
              <SideNav setIsOpen={setIsDrawerOpen} />
            </Drawer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default CollectionPage
