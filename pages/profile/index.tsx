import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { FaHamburger } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useAccount, useMutation } from 'wagmi'
import AvatarCard from '../../components/AvatarCard'
import Pagination from '../../components/Pagination'
import withProtection from '../../components/withProtection'
import { AvatarType, CollectionNftsBodyType } from '../../interfaces'
import heroIcon from '../../public/images/hero/product_page_hero_icon.png'
import historyIcon from '../../public/images/icons/Activity.svg'
import categoryIcon from '../../public/images/icons/Category.svg'
import editIcon from '../../public/images/icons/edit.svg'
import collectionIcon from '../../public/images/icons/Folder.svg'
import messageIcon from '../../public/images/icons/Message.svg'
import settingsIcon from '../../public/images/icons/Setting.svg'
import walletIcon from '../../public/images/icons/Wallet.svg'
import { getCollectionNfts } from '../../react-query/queries'
import {
  fromLeftAnimation,
  fromRightAnimation,
  opacityAnimation,
} from '../../utils/animations'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

type RouteNameType =
  | 'category'
  | 'messages'
  | 'my collection'
  | 'wallet'
  | 'history'
  | 'settings'

type RouteType = { name: RouteNameType; route: string; icon: any }

const routes: RouteType[] = [
  { name: 'category', route: '/', icon: categoryIcon },
  { name: 'messages', route: '/', icon: messageIcon },
  { name: 'my collection', route: '/', icon: collectionIcon },
  { name: 'wallet', route: '/', icon: walletIcon },
  { name: 'history', route: '/', icon: historyIcon },
  { name: 'settings', route: '/', icon: settingsIcon },
]

const NavRoute: FC<{
  icon: string
  name: RouteNameType
  route: string
  isDrawer?: boolean
  setCurrentRoute: Dispatch<SetStateAction<RouteNameType>>
  currentRoute: RouteNameType
}> = ({ icon, name, setCurrentRoute, currentRoute }) => {
  const handleClick = () => {
    // if (isDrawer) return
    setCurrentRoute(name)
  }

  return (
    <div
      className={`p-1 flex gap-8 cursor-pointer my-5 ${
        currentRoute === name && 'bg-[#41391C]'
      } hover:bg-[#41391C] text-white hover:text-[#FFC400] rounded-md`}
      onClick={handleClick}
    >
      <Image src={icon} alt="icon" className="w-2" />
      <span className=" font-poppins text-lg capitalize">{name}</span>
    </div>
  )
}

const Drawer: FC<{
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setCurrentRoute: Dispatch<SetStateAction<RouteNameType>>
  currentRoute: RouteNameType
}> = ({ setIsOpen, setCurrentRoute, currentRoute }) => {
  const handleClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:lg min-h-screen absolute top-0 right-4 left-4 p-4 bg-[#1F2021] rounded-lg">
      <div className="text-right font-light">
        <span className="cursor-pointer" onClick={() => setIsOpen(false)}>
          X
        </span>
      </div>
      {routes?.map(({ icon, name, route }) => (
        <div key={name} onClick={handleClick}>
          <NavRoute
            icon={icon}
            name={name}
            route={route}
            isDrawer={true}
            setCurrentRoute={setCurrentRoute}
            currentRoute={currentRoute}
          />
        </div>
      ))}
    </div>
  )
}

const UserActivity = () => {
  return (
    <div
      className="pb-20 md:px-4 bg-[#1F2021] rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
gap-20 w-full  max-w-full mx-auto px-6 py-9 lg:h-[928px] scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021] overflow-y-scroll"
    >
      <h2 className="font-poppins text-white text-center">User Activity</h2>
    </div>
  )
}

const UserAssets = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [nfts, setNfts] = useState<AvatarType[]>()
  const { width } = useWindowDimensions()
  const { address } = useAccount()
  const { mutate, data } = useMutation(getCollectionNfts)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  useEffect(() => {
    let body: CollectionNftsBodyType = {
      token_owner: address,
      page_number: currentPage,
      items_per_page: ITEMS_PER_PAGE,
      alphabetical_order: ALPHABETICAL_ORDER,
      order: ORDER,
    }
    address && mutate(body)
  }, [mutate, address, currentPage])

  useEffect(() => {
    if (data?.data?.nfts) {
      setNfts(data.data.nfts)
      setCurrentPage(data.data.currentPage)
      setTotalPages(data.data.total_pages)
    }
  }, [data?.data])

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
        {nfts?.length &&
          nfts.map((cardData, index) => (
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
          ))}
        {nfts?.length === 0 && (
          <p className="text-white font-poppins p-4">
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

const AssetsActivityTabs: FC<{
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setIsDrawerOpen }) => {
  const [currentTab, setCurrentTab] = useState<'assets' | 'activity'>('assets')

  return (
    <>
      <div className="text-white font-poppins text-[20px] pl-[25%] p-6">
        <span
          className="border-b-2 border-custom_yellow cursor-pointer transition-all"
          style={currentTab !== 'assets' ? { border: 'none' } : {}}
          onClick={() => setCurrentTab('assets')}
        >
          Assets
        </span>{' '}
        <span className="text-gray-500">|</span>{' '}
        <span
          className="border-b-2 border-custom_yellow cursor-pointer transition-all"
          style={currentTab !== 'activity' ? { border: 'none' } : {}}
          onClick={() => setCurrentTab('activity')}
        >
          Activity
        </span>
      </div>
      <div
        onClick={() => setIsDrawerOpen(true)}
        className="text-white p-4 lg:hidden"
      >
        <FaHamburger className=" text-lg hover:text-custom_yellow text-[#E5E5E5]" />
      </div>
      {currentTab === 'activity' ? <UserActivity /> : <UserAssets />}
    </>
  )
}

const UserSettings = () => {
  const handleLogin = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        )
        console.log('USER', res.data)
      } catch (err) {
        console.log(err)
      }
    },
  })
  return (
    <>
      <div className="text-white font-poppins text-[20px] pl-[25%] p-6">
        <span className="border-b-2 border-custom_yellow">Settings</span>
      </div>
      <div
        // onClick={() => setIsDrawerOpen(true)}
        className="text-white p-4 lg:hidden"
      >
        <FaHamburger className=" text-lg hover:text-custom_yellow text-[#E5E5E5]" />
      </div>
      <div
        className="pb-20 md:px-4 bg-[#1F2021] rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
gap-20 w-full  max-w-full mx-auto px-6 py-9 lg:h-[928px] scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021] overflow-y-scroll"
      >
        <div>
          <button
            onClick={() => handleLogin()}
            className="btn-primary p-2 rounded-lg flex items-center gap-1"
          >
            <FcGoogle /> Sign In with Google
          </button>
        </div>
      </div>
    </>
  )
}

const ITEMS_PER_PAGE = 12
const ALPHABETICAL_ORDER = 'AtoZ'
const ORDER = 'NewToOld'

const ProfilePage: NextPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentRoute, setCurrentRoute] = useState<RouteNameType>('category')

  return (
    <main className="p-4 pt-6 pb-0 lg:px-8 relative -bottom-8">
      <div
        className="w-full h-[351px] bg-cover rounded-t-lg relative flex justify-center mb-40"
        style={{ backgroundImage: "url('/images/hero/product_page_hero.png')" }}
      >
        <div
          className="text-[#E5E5E5] font-inter lg:text-[19px] absolute bottom-4 right-6 
        bg-[#2B3137] opacity-80 p-2 cursor-pointer rounded-lg flex items-end gap-2"
        >
          <Image src={editIcon} alt="edit" /> Edit
        </div>
        <motion.div
          className="h-[126px] w-[151px] absolute -bottom-[63px]"
          variants={opacityAnimation}
          initial="initial"
          animate="final"
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 0.4,
          }}
        >
          <Image src={heroIcon} alt="" />
          <p className="text-white text-center font-poppins text-[21px] font-medium">
            Oliver Torsney
          </p>
        </motion.div>
      </div>
      <div className="grid place-items-center w-full">
        <div className="grid grid-cols-12 gap-4 w-full">
          <motion.div
            className="hidden lg:block lg:col-span-3 h-[928px] p-10 bg-[#1F2021]  rounded-lg"
            variants={fromLeftAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.4,
              delay: 0.6,
            }}
          >
            {routes?.map(({ icon, name, route }) => (
              <NavRoute
                key={name}
                icon={icon}
                name={name}
                route={route}
                setCurrentRoute={setCurrentRoute}
                currentRoute={currentRoute}
              />
            ))}
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-9"
            variants={fromRightAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.4,
              delay: 0.8,
            }}
          >
            {currentRoute === 'category' && (
              <AssetsActivityTabs setIsDrawerOpen={setIsDrawerOpen} />
            )}
            {currentRoute === 'settings' && <UserSettings />}
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="text-[#E5E5E5] absolute top-0 bottom-0 left-0 right-0"
            variants={fromLeftAnimation}
            initial="initial"
            animate="final"
            exit="initial"
            transition={{
              ease: 'easeInOut',
              duration: 0.25,
            }}
          >
            <Drawer
              isOpen={isDrawerOpen}
              setIsOpen={setIsDrawerOpen}
              setCurrentRoute={setCurrentRoute}
              currentRoute={currentRoute}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default withProtection(ProfilePage)
