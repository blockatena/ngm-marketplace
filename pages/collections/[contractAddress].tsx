import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import AvatarCard from '../../components/AvatarCard'
import BreadCrumb from '../../components/BreadCrumb'
import Drawer from '../../components/Drawer'
import NavAccordion from '../../components/NavAccordion'
import PageHeading from '../../components/PageHeading'
import Pagination from '../../components/Pagination'
import type { AvatarType, CollectionNftsBodyType } from '../../interfaces'
import { CrumbType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import {
  getCollectionDetails,
  getCollectionNfts,
} from '../../react-query/queries'
import { handleAnimationDelay } from '../../utils'
import { fromLeftAnimation, opacityAnimation } from '../../utils/animations'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

interface HeroSectionProps {
  name: string
  img: any
  bannerimage: any
  contract_address: string
  contract_type: string
  createdAt: string
  __v: any
  _id: string
  totalsupply: any
  totalvolume: any
  bestOffer: any
  owners: any
  description: string
  floor: any
}

const placeholderLogo = '/images/collections/collection_avatar.png'
const SideNav: FC<{
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  handleFilter: (_isInAuction: boolean) => void
}> = ({ setIsOpen, handleFilter }) => {
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
            onChange={(e) => handleFilter(e.target.checked)}
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
      {/* <NavAccordion heading="Currency"> */}
      {/* <button className="w-fit" onClick={handleClick}>
          Recently Added
        </button>
        <button className="w-fit" onClick={handleClick}>
          Latest
        </button>
        <button className="w-fit" onClick={handleClick}>
          Popular
        </button> */}
      {/* <div>
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
        </div> */}
      {/* </NavAccordion> */}
    </div>
  )
}

const CollectionHeroSection: FC<HeroSectionProps> = ({
  name,
  img,
  bannerimage,
  totalsupply,
  createdAt,
}) => {
  let banner = `url("${
    bannerimage ? bannerimage : '/images/collections/collection_hero.png'
  }")`
  return (
    <motion.section
      className="w-full h-[279px] bg-cover p-2 flex justify-between items-end lg:px-4 lg:py-2"
      style={{
        backgroundImage: banner,
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
            {/* <Image
              src="/images/collections/collection_avatar.png"
              width="150px"
              height="130px"
              alt="collection_img"
              className="rounded-lg"
            /> */}
            {img ? (
              <Image
                loader={() => img}
                src={img}
                className="rounded-lg"
                width="150px"
                height="130px"
                alt="collection_img"
                // layout="fill"
              />
            ) : (
              <Image
                src={placeholderLogo}
                className="rounded-lg"
                width="150px"
                height="130px"
                alt="collection_img"
              />
            )}
          </div>
          <div className="flex flex-col justify-end">
            <h2 className="font-poppins mb-3 text-white font-medium text-2xl lg:text-[35px]">
              {name ? name : 'Collection'}
            </h2>
            <p className="text-white font-oxygen text-sm lg:text-lg">
              <span>
                Items {totalsupply || totalsupply === 0 ? totalsupply : 'NA'}{' '}
              </span>{' '}
              · <span>Created {createdAt ? createdAt : 'yyyy-mm-dd'}</span> ·{' '}
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

const CollectionInfoSection: FC<HeroSectionProps> = ({
  totalvolume,
  bestOffer,
  floor,
  owners,
  description,
}) => {
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
        {description}{' '}
      </p>

      <div className="max-w-[600px] flex justify-between">
        <div className="grid place-items-center">
          <p className="font-oxygen text-white lg:text-[19px] font-light">
            {totalvolume || totalvolume === 0 ? totalvolume : 'NA'}
          </p>
          <p className="text-[#AFAFAF] font-oxygen text-xs lg:text-[15px] font-light">
            Total Volume
          </p>
        </div>
        <div className="grid place-items-center">
          <p className="font-oxygen text-white lg:text-[19px] font-light">
            {floor || floor === 0 ? floor : 'NA'}
          </p>
          <p className="text-[#AFAFAF] font-oxygen text-xs lg:text-[15px] font-light">
            Floor Price
          </p>
        </div>
        <div className="grid place-items-center">
          <p className="font-oxygen text-white lg:text-[19px] font-light">
            {bestOffer || bestOffer === 0 ? bestOffer : 'NA'}
          </p>
          <p className="text-[#AFAFAF] font-oxygen text-xs lg:text-[15px] font-light">
            Best Offer
          </p>
        </div>
        <div className="grid place-items-center">
          <p className="font-oxygen text-white lg:text-[19px] font-light">
            {owners || owners === 0 ? owners : 'NA'}
          </p>
          <p className="text-[#AFAFAF] font-oxygen text-xs lg:text-[15px] font-light">
            Owners
          </p>
        </div>
      </div>
    </motion.section>
  )
}

const CollectionSearchSection: FC<{ handleFilter: (_value: any) => void }> = ({
  handleFilter,
}) => {
  const { width: clientWidth } = useWindowDimensions()
  const [width, setWidth] = useState(1)

  useEffect(() => {
    setWidth(clientWidth)
  }, [clientWidth])

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
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value={1}>Recently Created</option>
          <option value={2}>Old to New</option>
        </select>
      </div>
    </motion.section>
  )
}

const ITEMS_PER_PAGE = 12
const ALPHABETICAL_ORDER = 'AtoZ'
const ORDER = 'NewToOld'

const CollectionPage: NextPage = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { width } = useWindowDimensions()
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const [collectionData, setCollectionData] = useState<HeroSectionProps[]>()
  const [avatars, setAvatars] = useState<AvatarType[]>([])
  // const [collection, setCollection] = useState<CollectionCardTypes[]>([])
  // const [filteredData, setFiltered] = useState<CollectionCardTypes[]>([])
  const [dataUnsorted, setDataUnsorted] = useState<AvatarType[]>([])

  const contractAddress = String(router?.query?.contractAddress)

  const { mutate, data, isSuccess } = useMutation(getCollectionNfts)

  const { data: collectionDetails } = useQuery(
    QUERIES.getCollectionDetails,
    () => getCollectionDetails(contractAddress),
    { enabled: !!contractAddress && contractAddress !== 'undefined' }
  )

  useEffect(() => {
    let body: CollectionNftsBodyType = {
      contract_address: contractAddress,
      page_number: currentPage,
      items_per_page: ITEMS_PER_PAGE,
      alphabetical_order: ALPHABETICAL_ORDER,
      order: ORDER,
    }
    contractAddress !== 'undefined' && mutate(body)
  }, [mutate, contractAddress, currentPage])

  // const { data, refetch, isSuccess } = useQuery(
  //   QUERIES.getCollectionNFTs,
  //   () => getCollectionNFTs(router?.query?.contractAddress),
  //   {
  //     refetchOnWindowFocus: true,
  //   }
  // )

  // useEffect(() => {
  //   if (data?.data.nfts.length) {
  //     let unsortedData = data?.data.nfts
  //     const newArr = [...unsortedData]
  //     const newArr2 = [...unsortedData]
  //     const newArr3 = [...unsortedData]
  //     setDataUnsorted(unsortedData)
  //     // const is_On_Auction = isOnAuction(unsortedData)
  //     // setDataOnAuction(is_On_Auction?is_On_Auction:[])
  //     setDataRecent(newArr3.reverse())
  //   }
  // }, [data?.data])

  let collectionName = collectionDetails?.data?.collection?.collection_name
  let floor = collectionDetails?.data.floor_price
  let bestOffer = collectionDetails?.data.best_offer
  let totalvolume = collectionDetails?.data.collection?.trade_volume
  let owners = collectionDetails?.data.owners
  let totalsupply = collectionDetails?.data.nfts.length
  let createddate = collectionDetails?.data?.collection?.createdAt
  createddate = createddate?.substring(0, 10)
  let bannerurl = '/images/collections/static.jpg'
  let description = collectionDetails?.data?.collection?.description
  let imageurl =
    collectionDetails?.data?.collection?.imageuri?.length > 0
      ? collectionDetails?.data?.collection?.imageuri[0]
      : undefined

  // console.log(data?.data)

  // eslint-disable-next-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (router?.query?.contractAddress === undefined) {
  //     window.setTimeout(refetch, 1500)
  //   } else {
  //     // refetch
  //   }
  // }, [router.query.contractAddress, refetch])

  // const Avatar = data?.data.nfts

  const handleFilter = (isInAuction: boolean) => {
    if (isInAuction) {
      let filteredAvatars = dataUnsorted.filter(
        (data) => data.is_in_auction === true
      )
      setAvatars(filteredAvatars)
      return
    }
    setAvatars(dataUnsorted)
  }

  // const oldtoNew = () => {
  //   if (dataUnsorted.length > 0) {
  //     const sortedBydate = dataUnsorted.sort(function (a: any, b: any) {
  //       // console.log(new Date(a.createdAt).getTime())
  //       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //         ? -1
  //         : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //         ? 1
  //         : 0
  //     })

  //     setAvatars(sortedBydate)
  //     return
  //   }
  // }

  // const recently = () => {
  //   if (dataUnsorted.length > 0) {
  //     const sortedBydate = dataUnsorted.sort(function (a, b) {
  //       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //         ? 1
  //         : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //         ? -1
  //         : 0
  //     })
  //     setAvatars(sortedBydate)
  //     return
  //   }
  // }

  const handleFilters = (value: any) => {
    // console.log('value is ',value)

    if (value === '1') {
      const sortedBydate = dataUnsorted.sort(function (a, b) {
        return new Date(b.createdAt).getTime() / 1000 -
          new Date(a.createdAt).getTime() / 1000
          ? 1
          : new Date(a.createdAt).getTime() / 1000 -
            new Date(b.createdAt).getTime() / 1000
          ? -1
          : 0
      })
      setAvatars(sortedBydate)

      return
    }

    if (value === '2') {
      const sortedBydate = dataUnsorted.sort(function (a: any, b: any) {
        // console.log(new Date(a.createdAt).getTime())
        return new Date(b.createdAt).getTime() / 1000 -
          new Date(a.createdAt).getTime() / 1000
          ? -1
          : new Date(a.createdAt).getTime() / 1000 -
            new Date(b.createdAt).getTime() / 1000
          ? 1
          : 0
      })

      setAvatars(sortedBydate)
      return
    }
  }

  console.log(avatars)

  // useEffect(() => {
  //   setAvatars(data?.data.nfts)
  //   setDataUnsorted(data?.data.nfts)
  //   setCollectionData(data?.data)
  // }, [data?.data.nfts, data?.data])

  useEffect(() => {
    if (data?.data?.nfts) {
      setAvatars(data.data.nfts)
      setDataUnsorted(data?.data.nfts)
      setCollectionData(data?.data)
      setCurrentPage(data.data.currentPage)
      setTotalPages(data.data.total_pages)
    }
  }, [data?.data])

  const crumbData: CrumbType[] = [
    { name: 'home', route: '/' },
    { name: 'collections', route: '/collections' },
    { name: collectionName ? collectionName : 'Collection', route: '/' },
  ]

  return (
    <main className="min-h-screen">
      <div className="px-4 py-1  md:p-4 pt-6 lg:px-16">
        <BreadCrumb crumbs={crumbData} />
        {<PageHeading name={collectionName ? collectionName : 'Collection'} />}
      </div>
      <div className="px-4 py-1 md:p-4 pt-6 lg:px-16 mt-4 md:mt-14">
        {collectionData ? (
          <CollectionHeroSection
            name={collectionName}
            img={imageurl}
            bannerimage={bannerurl}
            contract_address={''}
            contract_type={''}
            owners={owners}
            totalsupply={totalsupply}
            createdAt={createddate}
            __v={undefined}
            description={description}
            _id={''}
            totalvolume={totalvolume}
            bestOffer={bestOffer}
            floor={floor}
          />
        ) : (
          ''
        )}

        {collectionData ? (
          <CollectionInfoSection
            name={collectionName}
            img={imageurl}
            bannerimage={bannerurl}
            contract_address={''}
            contract_type={''}
            owners={owners}
            totalsupply={totalsupply}
            createdAt={createddate}
            description={description}
            __v={undefined}
            _id={''}
            totalvolume={totalvolume}
            bestOffer={bestOffer}
            floor={floor}
          />
        ) : (
          ''
        )}
        {/* <CollectionInfoSection /> */}
        <CollectionSearchSection handleFilter={handleFilters} />
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
              <SideNav handleFilter={handleFilter} />
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
              {isSuccess &&
                avatars?.length === 0 &&
                router?.query?.contractAddress !== undefined && (
                  <p className="font-inter text-white text-lg text-center p-10">
                    No Items found
                  </p>
                )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-12">
          <Pagination
            totalPages={totalPages}
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
              <SideNav
                setIsOpen={setIsDrawerOpen}
                handleFilter={handleFilter}
              />
            </Drawer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default CollectionPage
