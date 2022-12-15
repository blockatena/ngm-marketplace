import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import Image from 'next/image'
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaEdit, FaHamburger } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useAccount, useMutation } from 'wagmi'
import AvatarCard from '../../components/AvatarCard'
import Pagination from '../../components/Pagination'
import Spinner from '../../components/Spinner'
import withProtection from '../../components/withProtection'
import {
  ActivityType,
  AvatarType,
  CollectionNftsBodyType,
  UserType,
} from '../../interfaces'
// import heroIcon from '../../public/images/hero/product_page_hero_icon.png'
import historyIcon from '../../public/images/icons/Activity.svg'
import categoryIcon from '../../public/images/icons/Category.svg'
import editIcon from '../../public/images/icons/edit.svg'
import collectionIcon from '../../public/images/icons/Folder.svg'
import messageIcon from '../../public/images/icons/Message.svg'
import settingsIcon from '../../public/images/icons/Setting.svg'
import walletIcon from '../../public/images/icons/Wallet.svg'
import { QUERIES } from '../../react-query/constants'
import {
  createUser,
  getCollectionNfts,
  getUser,
  getUserActivity,
  updateUser,
  uploadProfileImg,
} from '../../react-query/queries'
import { handleError, shortenString } from '../../utils'
import {
  fromLeftAnimation,
  fromRightAnimation,
  opacityAnimation,
} from '../../utils/animations'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

type RouteNameType =
  | 'overview'
  | 'messages'
  | 'my collection'
  | 'wallet'
  | 'history'
  | 'settings'

type RouteType = { name: RouteNameType; route: string; icon: any }

const routes: RouteType[] = [
  { name: 'overview', route: '/', icon: categoryIcon },
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

const ActivityItem: FC<{
  activity: ActivityType
  index: number
}> = ({ activity, index }) => {
  let timePlaced = ''
  const { address } = useAccount()
  if (activity?.createdAt) {
    let d = new Date(activity.createdAt)
    timePlaced = d.toLocaleString()
  }

  const isTo = activity?.to !== '----'
  // const isTx = activity?.transaction_hash
  const isTx = undefined
  const price = activity?.price

  const activityData = [
    {
      name: 'Type',
      value: activity?.event,
    },
    {
      name: 'Price',
      value:
        activity?.event === 'Transfer'
          ? `${price} ETH`
          : `${activity?.price} ETH`,
    },
    {
      name: 'From',
      value:
        activity?.from === address
          ? 'You'
          : shortenString(activity?.from, 3, 3),
    },
    {
      name: 'To',
      value:
        activity?.to !== '----'
          ? activity?.to === address
            ? 'You'
            : shortenString(activity?.to, 3, 3)
          : '-',
    },
    { name: 'Time', value: timePlaced },
  ]

  const onClickAddress = (user: string) => {
    let url = `https://mumbai.polygonscan.com/address/${user}`
    window.open(url, '_blank')
  }

  const onClickTx = (hash: string) => {
    let url = `https://mumbai.polygonscan.com/tx/${hash}`
    window.open(url, '_blank')
  }

  return (
    <motion.tr
      className={`${
        index % 2 === 0 ? 'bg-[#070707]' : 'bg-transparent'
      } font-poppins text-[#D7D7D7] lg:text-lg py-2 h-16`}
      variants={opacityAnimation}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      transition={{
        ease: 'easeInOut',
        duration: 0.4,
        delay: index < 6 ? 0.1 * index : 0,
      }}
    >
      {activityData?.map((activityData, index) => (
        <td
          key={index}
          className={
            activityData?.name === 'From'
              ? 'cursor-pointer underline hover:text-sky-500'
              : isTo && activityData?.name === 'To'
              ? 'cursor-pointer underline hover:text-sky-500'
              : isTx && activityData?.name === 'Time'
              ? 'cursor-pointer underline hover:text-sky-500'
              : 'h-16'
          }
          onClick={() =>
            activityData?.name === 'From'
              ? onClickAddress(activity?.from)
              : isTo && activityData?.name === 'To'
              ? onClickAddress(activity?.to)
              : isTx && activityData?.name === 'Time'
              ? // ? onClickTx(activity?.transaction_hash)
                onClickTx('')
              : ''
          }
        >
          {activityData?.value}
        </td>
      ))}
    </motion.tr>
  )
}

const UserActivity = () => {
  const { address } = useAccount()
  const { data } = useQuery(
    [QUERIES.getUserActivity, address],
    () => getUserActivity(String(address)),
    {
      enabled: !!address,
    }
  )

  const activity: ActivityType[] | undefined = data?.data

  const tableHeadings = [
    { name: 'Type' },
    { name: 'Price' },
    { name: 'From' },
    { name: 'To' },
    { name: 'Time' },
  ]

  return (
    <div
      className="pb-20 md:px-4 bg-[#1F2021] rounded-lg 
gap-20 w-full  max-w-full mx-auto px-2 lg:px-6 py-9 lg:h-[928px] scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021] overflow-y-scroll"
    >
      <div
        className="w-full font-poppins text-[#D7D7D7] lg:text-lg px-0 max-h-full 
    overflow-y-scroll scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021]"
      >
        {activity?.length && (
          <table className="w-full overflow-x-auto text-center">
            <thead>
              <tr className="h-16">
                {tableHeadings.map((heading) => (
                  <th key={heading.name} className="h-16">
                    {heading.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activity?.length &&
                activity.map((activity, index) => {
                  return (
                    <ActivityItem
                      key={index}
                      activity={activity}
                      index={index}
                    />
                  )
                })}
              {activity?.length === 0 && (
                // <tr>
                <td>Activites</td>
                // </tr>
              )}
            </tbody>
          </table>
        )}
        {activity?.length === 0 && (
          // <tr>
          <p className="text-center b text-3xl p-12">- No Activities yet -</p>
          // </tr>
        )}
      </div>
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

const UserSettings: FC<{ user: UserType | null }> = ({ user }) => {
  const { address } = useAccount()
  const queryClient = useQueryClient()
  const {
    mutate: createUserMutation,
    isSuccess,
    isLoading,
    data,
  } = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getUser)
    },
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isSuccess || !data) return
    typeof data?.data !== 'string' &&
      toast.dark('User Created Successfully', {
        type: 'success',
        hideProgressBar: true,
      })

    typeof data?.data === 'string' &&
      toast.dark(data.data, {
        type: 'error',
        hideProgressBar: true,
      })
  }, [data, isSuccess])

  const handleLogin = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        setLoading(true)
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        )
        if (res?.data?.email_verified && res?.data?.email && address) {
          createUserMutation({
            email: res.data.email,
            wallet_address: String(address),
            username: res.data?.name,
          })
        } else {
          toast.dark('Email not verified', { type: 'error' })
        }
      } catch (error: unknown) {
        const title =
          error instanceof Error ? error.message : 'error connecting to server'
        toast.dark(title, { type: 'error' })
      } finally {
        setLoading(false)
      }
    },
  })

  const userInfo = useMemo(
    () => [
      { name: 'Linked Email', value: user?.email },
      {
        name: 'Wallet Address',
        value: shortenString(user?.wallet_address || '', 4, 4),
      },
      {
        name: 'Date Registered',
        value: new Date(user?.createdAt || '').toLocaleString(),
      },
    ],
    [user?.createdAt, user?.email, user?.wallet_address]
  )

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
      <div className="pb-20 md:px-4 bg-[#1F2021] rounded-lg w-full  max-w-full mx-auto px-6 py-9 lg:h-[928px] scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021] overflow-y-scroll">
        {!user && (
          <div>
            <button
              onClick={() => handleLogin()}
              className="btn-primary p-2 rounded-lg flex items-center gap-1"
              disabled={isLoading || loading}
            >
              <FcGoogle /> Sign In with Google
              {isLoading || loading ? <Spinner color="black" size="sm" /> : ''}
            </button>
          </div>
        )}
        {user && (
          <h1 className="font-poppins text-white lg:text-3xl font-medium mb-4 text-center">
            Account Details
          </h1>
        )}
        {user &&
          userInfo.map(({ name, value }, index) => (
            <motion.div
              key={index}
              className={`text-white font-poppins ${
                index % 2 === 0 ? 'bg-[#070707]' : 'bg-transparent'
              } h-16 lg:h-12 flex items-center p-1`}
              variants={opacityAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.6,
                delay: index * 0.2,
              }}
            >
              <span className="font-medium">{name}</span>: {value}
            </motion.div>
          ))}
      </div>
    </>
  )
}

const ITEMS_PER_PAGE = 12
const ALPHABETICAL_ORDER = 'AtoZ'
const ORDER = 'NewToOld'

const ProfilePage: NextPage = () => {
  const queryClient = useQueryClient()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentRoute, setCurrentRoute] = useState<RouteNameType>('overview')
  const [user, setUser] = useState<UserType | null>(null)
  const uploadBtnRef = useRef<HTMLInputElement | null>(null)
  const profilePicRef = useRef<HTMLInputElement | null>(null)
  const [bgFiles, setBgFiles] = useState<FileList | null>(null)
  const [profilePicFiles, setProfilePicFiles] = useState<FileList | null>(null)
  const [isProfilePicHovered, setIsProfilePicHovered] = useState(false)
  const [isUsernameUpdate, setIsUsernameUpdate] = useState(false)
  const [username, setUsername] = useState('')
  const [isUsernameHovered, setIsUsernameHovered] = useState(false)

  const { address } = useAccount()
  const { data: userData } = useQuery(
    [QUERIES.getUser, address],
    () => getUser(String(address)),
    {
      enabled: !!address,
    }
  )

  type UploadOptionType = 'banner' | 'profile'

  const {
    mutate: uploadImage,
    isSuccess: isUploadSuccess,
    isLoading,
    isError,
    error,
  } = useMutation(uploadProfileImg, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getUser)
    },
  })

  const {
    mutate: usernameMutation,
    isLoading: isUserMutationLoading,
    isSuccess: isUserMutationSuccess,
    isError: isUserMutationError,
    error: userMutationError,
  } = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getUser)
    },
  })

  const handleUsernameMutation = () => {
    if (!username || !address) return
    usernameMutation({ username, wallet_address: String(address) })
  }

  const handleChooseFile = (type: 'bgImg' | 'profilePic') => {
    if (!user) {
      toast.dark('Sign in to edit profile', {
        type: 'info',
        hideProgressBar: true,
      })
      setCurrentRoute('settings')
      return
    }
    if (uploadBtnRef.current && type === 'bgImg') {
      uploadBtnRef.current.click()
    }
    if (profilePicRef.current && type === 'profilePic') {
      profilePicRef.current.click()
    }
  }

  const handleFileValidation = (files: FileList): boolean => {
    if (!files) return false
    const fileName = files[0]?.name
    const fileSize = files[0]?.size / 1024 / 1024 //file size in MBs
    // const allowedFileTypesRegex = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
    const allowedFileTypesRegex = /(\.jpg|\.jpeg)$/i

    if (fileSize > 1.5) {
      toast.dark('File must be under 1.5MB', {
        type: 'error',
        hideProgressBar: true,
      })
      return false
    }
    if (!allowedFileTypesRegex.exec(fileName)) {
      toast.dark('Please upload a jpg image', {
        type: 'error',
        hideProgressBar: true,
      })
      return false
    }
    return true
  }

  const handleUpload = useCallback(() => {
    if ((!bgFiles && !profilePicFiles) || !address) return
    let uploadType: UploadOptionType = 'banner'
    const formData = new FormData()
    formData.append('wallet_address', String(address))

    if (bgFiles) {
      if (!handleFileValidation(bgFiles)) return
      formData.append('file', bgFiles[0])
      formData.append('type', uploadType)
    } else if (profilePicFiles) {
      if (!handleFileValidation(profilePicFiles)) return
      uploadType = 'profile'
      formData.append('file', profilePicFiles[0])
      formData.append('type', uploadType)
    }
    uploadImage(formData)
  }, [address, bgFiles, profilePicFiles, uploadImage])

  useEffect(() => {
    if (!isUploadSuccess) return
    setBgFiles(null)
    setProfilePicFiles(null)
  }, [isUploadSuccess])

  useEffect(() => {
    if (userData && typeof userData?.data !== 'string') setUser(userData?.data)
    else setUser(null)
  }, [userData])

  useEffect(() => {
    handleUpload()
  }, [handleUpload])

  useEffect(() => {
    if (!isError && !isUserMutationError) return
    handleError(error || userMutationError)
  }, [isError, error, isUserMutationError, userMutationError])

  useEffect(() => {
    if (!isUserMutationSuccess) return
    toast.dark('Username updated successfully', {
      type: 'success',
      hideProgressBar: true,
    })
    setIsUsernameUpdate(false)
  }, [isUserMutationSuccess])

  return (
    <main className="p-4 pt-6 pb-0 lg:px-8 relative -bottom-8">
      <div
        className="w-full h-[351px] bg-cover rounded-t-lg relative flex justify-center mb-40 bg-custom_gray_light"
        // style={{ backgroundImage: "url('/images/hero/product_page_hero.png')" }}
        style={
          user?.banner_image
            ? { backgroundImage: `url(${user?.banner_image})` }
            : {}
        }
      >
        <div
          className="text-[#E5E5E5] font-inter lg:text-[19px] absolute bottom-4 right-6 
        bg-[#2B3137] opacity-80 p-2 cursor-pointer rounded-lg flex items-end gap-2"
        >
          <Image
            src={editIcon}
            alt="edit"
            onClick={() => handleChooseFile('bgImg')}
          />{' '}
          <span onClick={() => handleChooseFile('bgImg')}>Edit</span>
          <input
            type="file"
            ref={uploadBtnRef}
            className="hidden"
            onChange={(e) => setBgFiles(e.target.files)}
          />
        </div>
        <motion.div
          // className="h-[126px] w-[151px] absolute -bottom-[63px]"
          className="profile-pic-clip h-[126px] lg:h-[150px] absolute -bottom-[63px]"
          variants={opacityAnimation}
          initial="initial"
          animate="final"
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 0.4,
          }}
          onMouseEnter={() => setIsProfilePicHovered(true)}
          onMouseLeave={() => setIsProfilePicHovered(false)}
          onClick={() => setIsProfilePicHovered((prev) => !prev)}
        >
          {/* <Image src={heroIcon} alt="" /> */}
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
          <div
            className="text-[#E6E6E6] font-inter lg:text-[19px] absolute bottom-4 right-[40%] 
        bg-[#2B3137] opacity-80 p-1 cursor-pointer rounded-lg flex items-end gap-2"
          >
            {isProfilePicHovered && (
              <FaEdit
                fontSize={16}
                onClick={() => handleChooseFile('profilePic')}
              />
            )}
            <input
              type="file"
              ref={profilePicRef}
              className="hidden"
              onChange={(e) => setProfilePicFiles(e.target.files)}
            />
          </div>{' '}
        </motion.div>
        {!isUsernameUpdate && (
          <p
            className="text-white text-center font-poppins text-[21px] font-medium absolute 
          -bottom-[110px] flex cursor-pointer"
            onClick={() => setIsUsernameUpdate(true)}
            onMouseEnter={() => setIsUsernameHovered(true)}
            onMouseLeave={() => setIsUsernameHovered(false)}
          >
            {user ? user.username : ''}
            {isUsernameHovered && user?.username && <FaEdit fontSize={16} />}
          </p>
        )}
        {isUsernameUpdate && (
          <p className="font-poppins absolute -bottom-[110px]">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-1 pr-7 focus:border focus:border-custom_yellow focus:outline-none
               bg-custom_grey rounded"
            />
            <AiOutlineSend
              fontSize={16}
              className="absolute top-[15%] right-2 cursor-pointer"
              onClick={handleUsernameMutation}
            />
          </p>
        )}
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
              <AssetsActivityTabs setIsDrawerOpen={setIsDrawerOpen} />
            )}
            {currentRoute === 'settings' && <UserSettings user={user} />}
          </motion.div>
        </div>
      </div>
      {(isLoading || isUserMutationLoading) && (
        <div className="p-8  fixed left-[50%] top-[50%] z-50">
          <Spinner />
        </div>
      )}
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
