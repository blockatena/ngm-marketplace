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

// crumbData : Shortcut routes name
const crumbData: CrumbType[] = [
  { name: 'home', route: '/' },
  { name: 'assets', route: '/assets' },
]

// Side Nav for filters and Sort
const SideNav: FC<{
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  handleSort: (_value: any) => void
  handleListed: (_value: any) => void
  sort_by: string
  listed_in: string
}> = ({ setIsOpen, handleSort, handleListed, sort_by, listed_in }) => {
  const handleClick = () => {
    setIsOpen && setIsOpen(false)
  }

  // handle filter and sorts Button 
  const handleBtn = (_value:any) => {
    if (_value == 'NA' || _value == "AUCTION" || _value == "SALE") {
      handleListed(_value)
    } 
    if (_value == 'NEWTOOLD' || _value == 'OLDTONEW' || _value == 'ATOZ' || _value == 'ZTOA') {
      handleSort(_value)
    } 
    handleClick()

  }

  // handle Sort Option Button
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

  // handle Filter NFT State Button
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
        <button
          id="SALE"
          className="w-fit"
          onClick={() => handleBtn('SALE')}
        >
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
      </NavAccordion>
      <div className="px-4 flex justify-between cursor-pointer">
        <span className="font-oxygen font-bold text-[#f6f6f6] md:text-[18px]">
          Collections
        </span>{' '}
        <button className="text-[#9D9D9D]">{'>'}</button>
      </div> */}
    </div>
  )
}


// Assets Page : Main 
const AssetsPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sort_by, setSortBy] = useState("NA")
  const [listed_in, setListedIn] = useState('NA')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [avatars, setAvatars] = useState<AvatarType[]>()


  // Api call to get all assets / NFTs
  const { data, refetch } = useQuery([QUERIES.getAllNFts, currentPage], () =>
    getAllNFts(currentPage, 12, sort_by, listed_in)
  )

  const { width } = useWindowDimensions()
  const handlePaginate = (pageNumber: number) => setCurrentPage(pageNumber)

// handle Sort and call api on change
  const handleSort = async (_value: any) => {
    if (_value) {
      await setSortBy(_value)
      return await refetch();
    }
    setSortBy('NA')
  }

  // handle Nft State and call function on change
    const handleListed = async (_value: any) => {
      if (_value) {
        await setListedIn(_value)
        return await refetch()
      }
      setSortBy('NA')
    }
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
              <SideNav
                handleSort={handleSort}
                handleListed={handleListed}
                sort_by={sort_by}
                listed_in={listed_in}
              />
            </motion.div>
          </div>
          <div className="col-span-12 md:col-span-9">
            {/* <div className="hidden md:block">
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
            </div> */}
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

export default withProtection(AssetsPage)
