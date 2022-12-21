import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaHamburger } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'
import UserActivity from '../../../components/UserActivity'
import UserAssets from '../../../components/UserAssets'
import withProtection from '../../../components/withProtection'
import { UserType } from '../../../interfaces'
import categoryIcon from '../../../public/images/icons/Category.svg'
import { QUERIES } from '../../../react-query/constants'
import { getUser } from '../../../react-query/queries'
import { shortenString } from '../../../utils'
import {
  fromLeftAnimation,
  fromRightAnimation,
  opacityAnimation,
} from '../../../utils/animations'

type RouteNameType = 'overview'

type RouteType = { name: RouteNameType; route: string; icon: any }

const routes: RouteType[] = [
  { name: 'overview', route: '/', icon: categoryIcon },
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

const AssetsActivityTabs: FC<{
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
  address: string | undefined
}> = ({ setIsDrawerOpen, address }) => {
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
      {currentTab === 'activity' ? (
        <UserActivity address={address} />
      ) : (
        <UserAssets address={address} />
      )}
    </>
  )
}

const UserProfilePage: NextPage = () => {
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentRoute, setCurrentRoute] = useState<RouteNameType>('overview')
  const [user, setUser] = useState<UserType | null>(null)

  const address = router?.query?.walletAddress
  const { address: connectedAddress } = useAccount()

  const { data: userData } = useQuery(
    [QUERIES.getUser, address],
    () => getUser(String(address)),
    {
      enabled: !!address,
    }
  )

  useEffect(() => {
    if (userData && typeof userData?.data !== 'string') setUser(userData?.data)
    else setUser(null)
  }, [userData])

  useLayoutEffect(() => {
    if (!address && !connectedAddress) return
    if (String(address) === String(connectedAddress)) router.push('/profile')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, connectedAddress])

  return (
    <main className="p-4 pt-6 pb-0 lg:px-8 relative -bottom-8">
      <div
        className="w-full h-[351px] bg-cover rounded-t-lg relative flex justify-center mb-40 bg-custom_gray_light"
        style={
          user?.banner_image
            ? { backgroundImage: `url(${user?.banner_image})` }
            : {}
        }
      >
        <motion.div
          className="profile-pic-clip h-[126px] lg:h-[150px] absolute -bottom-[63px]"
          variants={opacityAnimation}
          initial="initial"
          animate="final"
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 0.4,
          }}
        >
          {user?.profile_image ? (
            <div className=" bg-custom_gray_dark h-[126px] lg:h-[150px] w-[150px] grid place-items-center">
              <Image
                loader={() => user.profile_image ?? ''}
                src={user.profile_image}
                alt="profile_img"
                layout="fill"
              />
            </div>
          ) : (
            <div className=" bg-custom_gray_dark h-[126px] lg:h-[150px] w-[150px] grid place-items-center">
              <BsFillPersonFill fontSize={60} />
            </div>
          )}
        </motion.div>
        <p
          className="text-white text-center font-poppins text-[21px] font-medium absolute 
          -bottom-[110px] flex"
        >
          {user
            ? user.username
            : address
            ? shortenString(String(address), 4, 4)
            : ''}
        </p>
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
            {currentRoute === 'overview' && (
              <AssetsActivityTabs
                setIsDrawerOpen={setIsDrawerOpen}
                address={address ? String(address) : undefined}
              />
            )}
          </motion.div>
        </div>
      </div>
      {/* {(isLoading) && (
        <div className="p-8  fixed left-[50%] top-[50%] z-50">
          <Spinner />
        </div>
      )} */}
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

export default withProtection(UserProfilePage)
