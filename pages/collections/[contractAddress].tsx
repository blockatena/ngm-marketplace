import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Dispatch, FC, KeyboardEvent, SetStateAction, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import AvatarCard from '../../components/AvatarCard'
import BreadCrumb from '../../components/BreadCrumb'
import Drawer from '../../components/Drawer'
import NavAccordion from '../../components/NavAccordion'
import PageHeading from '../../components/PageHeading'
import Pagination from '../../components/Pagination'
import withProtection from '../../components/withProtection'
import type {
  AvatarType,
  CollectionNftsBodyType,
  NftType,
} from '../../interfaces'
import { CrumbType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import {
  getCollectionDetails,
  getCollectionNfts,
  getCollectionType,
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
  handleSort: (_value: any) => void
  handleListed: (_value: any) => void
  sort_by: string
  listed_in: string
}> = ({ setIsOpen, handleListed, handleSort, sort_by, listed_in }) => {
  // eslint-disable-next-line no-unused-vars
  const [currency, setCurrency] = useState('')
  // eslint-disable-next-line no-unused-vars
  const handleClick = () => {
    setIsOpen && setIsOpen(false)
  }

  const handleBtn = (_value: any) => {
    if (_value == 'NA' || _value == 'AUCTION' || _value == 'SALE') {
      handleListed(_value)
    }
    if (
      _value == 'NEWTOOLD' ||
      _value == 'OLDTONEW' ||
      _value == 'ATOZ' ||
      _value == 'ZTOA'
    ) {
      handleSort(_value)
    }
    handleClick()
  }

  const handleSortedBtn = () => {
    if (!sort_by || sort_by == "NA") return
    let arr = ['NEWTOOLD', 'OLDTONEW', 'ATOZ', 'ZTOA']

    const element = document.getElementById(sort_by)
    if (element) {
      element.style.color = '#FFDE00'
      element.style.fontSize = '20px'
    }
    let filtered = arr.filter((a) => a !== sort_by)
    filtered.forEach((a) => {
      const element = document.getElementById(a)
      if (element) {
        element.style.color = 'white'
        element.style.fontSize = '16px'
      }
    })
  }

  const handleListedBtn = () => {
    if (!listed_in) return;
    let arr = ['AUCTION', 'SALE', 'NA']

    const element = document.getElementById(listed_in)
    if (element) {
      element.style.color = '#FFDE00'
      element.style.fontSize = '20px'
    }
    let filtered = arr.filter((a) => a !== listed_in)
    filtered.forEach((a) => {
      const element = document.getElementById(a)
      if (element) {
        element.style.color = 'white'
        element.style.fontSize = '16px'
      }
    })
  }

  useEffect(() => {
    handleSortedBtn()
    handleListedBtn()
  })

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
        <button
          id="NEWTOOLD"
          className="w-fit"
          onClick={() => handleBtn('NEWTOOLD')}
        >
          Newest
        </button>
        <button
          id="OLDTONEW"
          className="w-fit"
          onClick={() => handleBtn('OLDTONEW')}
        >
          Oldest
        </button>
        <button id="ATOZ" className="w-fit" onClick={() => handleBtn('ATOZ')}>
          A - Z
        </button>
        <button id="ZTOA" className="w-fit" onClick={() => handleBtn('ZTOA')}>
          Z - A
        </button>
      </NavAccordion>
      <NavAccordion heading="NFT State">
        <button id="NA" className="w-fit" onClick={() => handleBtn('NA')}>
          All
        </button>
        <button
          id="AUCTION"
          className="w-fit"
          onClick={() => handleBtn('AUCTION')}
        >
          NFTs In Auction
        </button>
        <button id="SALE" className="w-fit" onClick={() => handleBtn('SALE')}>
          NFTs In Sale
        </button>
      </NavAccordion>
      {/* <NavAccordion heading="Price">
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
      </NavAccordion> */}
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

const CollectionSearchSection: FC<{ handleSearch: (_value: any) => void }> = ({
  handleSearch,
}) => {
  const { width: clientWidth } = useWindowDimensions()
  const [width, setWidth] = useState(1)
  const [_search, setSearchvalue] = useState<any>()
  const [inputText,setInputText] = useState('')

  const handleSearchBtn = (_value:string) => {
    if(_value) {
      setSearchvalue(_value)
      setInputText(_value)
    } else {
      setSearchvalue("NA")
      setInputText('')
    }
  }

  const Searchbtn = () => {
    if(_search) {
      handleSearch(_search)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      Searchbtn()
    }
  }

  const clearBtn = () => {
    setSearchvalue("NA")
    setInputText('')
    handleSearch('NA')
  }
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
            id="search_input"
            value={inputText}
            onChange={(e) => handleSearchBtn(e.target.value)}
            placeholder="Search by name"
            onKeyDown={(e) => handleKeyDown(e)}
            className="w-full h-full px-7 lg:pl-12 rounded-lg caret-custom_yellow placeholder:text-[#888888] font-light text-white 
        focus:border focus:border-custom_yellow focus:outline-none bg-[#101011] border border-[#6A6363]"
          />
          {_search && _search != 'NA' && (
            <span
              className="absolute right-3 top-2 w-fit z-20 cursor-pointer text-primary font-bold lg:top-4"
              onClick={() => clearBtn()}
            >
              <Image
                src="/images/icons/close.svg"
                alt="search"
                width="25px"
                height="15px"
              />
            </span>
          )}
        </div>
      </div>
      <div className="grid col-span-4 md:col-span-2">
        <button
          className="btn-primary w-[110px] h-[35px] lg:w-[200px] lg:h-[50px] rounded-lg font-poppins lg:text-[25px]
            grid place-items-center"
          onClick={() => Searchbtn()}
        >
          <>{'Search'}</>
        </button>
      </div>
    </motion.section>
  )
}

const ITEMS_PER_PAGE = 12

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
  // const [dataUnsorted, setDataUnsorted] = useState<AvatarType[]>([])
    const [sort_by, setSortBy] = useState<any>('NA')
    const [listed_in, setListedIn] = useState<any>('NA')
    const [search, setSearch] = useState("NA")
    // const [nftType, setNftType] = useState<NftType | undefined>()
  const contractAddress = String(router?.query?.contractAddress)

  const { mutate, data, isSuccess} = useMutation(getCollectionNfts)

  const { data: contractType } = useQuery(
    [QUERIES.getCollectionType, contractAddress],
    () => getCollectionType(contractAddress),
    { enabled: !!contractAddress }
  )

  const nftType: NftType | undefined = contractType?.data?.type

  const { data: collectionDetails } = useQuery(
    QUERIES.getCollectionDetails,
    () => getCollectionDetails(contractAddress),
    {
      enabled:
        !!contractAddress && contractAddress !== 'undefined' && !!nftType,
    }
  )
  // useEffect(()=> {
  //   setNftType(contractType?.data?.type)
  // },[contractType])
  useEffect(() => {
    let body: CollectionNftsBodyType = {
      address: contractAddress,
      address_type: 'COLLECTION',
      page_number: currentPage,
      items_per_page: ITEMS_PER_PAGE,
      sort_by: sort_by,
      listed_in: listed_in,
      search,
      nftType,
    }
    contractAddress !== 'undefined' && nftType && mutate(body)
  }, [
    mutate,
    contractAddress,
    currentPage,
    nftType,
    listed_in,
    sort_by,
    search,
  ])



  let collectionName = collectionDetails?.data?.collection?.collection_name
  let floor = collectionDetails?.data.floor_price
  let bestOffer = collectionDetails?.data.best_offer
  let totalvolume = collectionDetails?.data.collection?.trade_volume
  let owners = collectionDetails?.data.owners
  let totalNfts = collectionDetails?.data?.nfts?.total_nfts
  let totalsupply = totalNfts ? totalNfts : collectionDetails?.data.nfts.length
  let createddate = collectionDetails?.data?.collection?.createdAt
  createddate = createddate?.substring(0, 10)
  let bannerurl = '/images/collections/static.jpg'
  let description = collectionDetails?.data?.collection?.description
  let imageurl =
    collectionDetails?.data?.collection?.imageuri?.length > 0
      ? collectionDetails?.data?.collection?.imageuri[0]
      : undefined



  const handleSearch = (value: any) => {

    if(value) {
      setSearch(value)
    }
  }


  // Updated 

  const handleSort = async (_value: any) => {
    // console.log(_value)
    if (_value) {
      await setSortBy(_value)
      return;
    }
    setSortBy('NA')
  }

  const handleListed = async (_value: any) => {
    // console.log(_value)
    if (_value) {
      await setListedIn(_value)
      return;
    }
    setSortBy('NA')
  }


  useEffect(() => {
    if (nftType === 'NGM1155' && data?.data?.get_nfts) {
      setAvatars(data.data.get_nfts.nfts)
      // setDataUnsorted(data?.data.get_nfts.nfts)
      setCollectionData(data?.data.get_nfts)
      setCurrentPage(data.data.get_nfts.currentPage)
      setTotalPages(data.data.get_nfts.total_pages)
    } else if (data?.data?.nfts) {
      setAvatars(data.data.nfts)
      // setDataUnsorted(data?.data.nfts)
      setCollectionData(data?.data)
      setCurrentPage(data.data.currentPage)
      setTotalPages(data.data.total_pages)
    }
  }, [data?.data, nftType])

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
        <CollectionSearchSection handleSearch={handleSearch} />
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
              <SideNav
                // handleSearch={handleSearch}
                handleSort={handleSort}
                handleListed={handleListed}
                sort_by={sort_by}
                listed_in={listed_in}
              />
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
                handleSort={handleSort}
                handleListed={handleListed}
                sort_by={sort_by}
                listed_in={listed_in}
              />
            </Drawer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default withProtection(CollectionPage)
