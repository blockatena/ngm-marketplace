import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import Image from 'next/image'
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaEdit, FaHamburger } from 'react-icons/fa'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import Spinner from '../../components/Spinner'
import UserActivity from '../../components/UserActivity'
import UserAssets from '../../components/UserAssets'
import UserSettings from '../../components/UserSettings'
import withProtection from '../../components/withProtection'
import { UserType } from '../../interfaces'
// import historyIcon from '../../public/images/icons/Activity.svg'
import categoryIcon from '../../public/images/icons/Category.svg'
import editIcon from '../../public/images/icons/edit.svg'
// import collectionIcon from '../../public/images/icons/Folder.svg'
// import messageIcon from '../../public/images/icons/Message.svg'
import settingsIcon from '../../public/images/icons/Setting.svg'
// import walletIcon from '../../public/images/icons/Wallet.svg'
import UserCollections from '../../components/UserCollections'
import collectionIcon from '../../public/images/icons/collection.svg'
import { QUERIES } from '../../react-query/constants'
import {
  getUser,
  getUserCollections,
  updateUser,
  uploadProfileImg,
} from '../../react-query/queries'
import { shortenString } from '../../utils'
import {
  fromLeftAnimation,
  fromRightAnimation,
  opacityAnimation,
} from '../../utils/animations'
// import heroIcon from '../../public/images/hero/product_page_hero_icon.png'

type RouteNameType =
  | 'overview'
  | 'my collections'
  // | 'messages'
  // | 'my collection'
  // | 'wallet'
  // | 'history'
  | 'settings'

type RouteType = { name: RouteNameType; route: string; icon: any }


// NavRoute: handle single routes with names , all routes receive from main page / drawer
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


// handle Routes for mobile, tab devices and send to NavRoute
const Drawer: FC<{
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setCurrentRoute: Dispatch<SetStateAction<RouteNameType>>
  currentRoute: RouteNameType
  routes: RouteType[]
}> = ({ setIsOpen, setCurrentRoute, currentRoute, routes }) => {
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


// User Assets and Activity tab Function 
const AssetsActivityTabs: FC<{
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setIsDrawerOpen }) => {
  const { address } = useAccount()
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


// User Collections Tabs function
const CollectionTab: FC<{
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
  address: string | undefined
}> = ({ setIsDrawerOpen, address }) => {
  // collection_name,
  // contract_address,
  // __v,
  // _id,
  // imageuri,
  return (
    <>
      <div className="text-white font-poppins text-[20px] pl-[25%] p-6">
        <span className="border-b-2 border-custom_yellow">My Collections</span>
      </div>
      <div
        onClick={() => setIsDrawerOpen(true)}
        className="text-white p-4 lg:hidden"
      >
        <FaHamburger className=" text-lg hover:text-custom_yellow text-[#E5E5E5]" />
      </div>
      <UserCollections address={address} />
    </>
  )
}

// User's Profile Page 
const ProfilePage: NextPage = () => {
  const queryClient = useQueryClient()
  const { address } = useAccount()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentRoute, setCurrentRoute] = useState<RouteNameType>('overview')
  const [user, setUser] = useState<UserType | null>(null)
  const uploadBtnRef = useRef<HTMLInputElement | null>(null)
  const profilePicRef = useRef<HTMLInputElement | null>(null)
  const [bgFiles, setBgFiles] = useState<FileList | null>(null)
  const [profilePicFiles, setProfilePicFiles] = useState<FileList | null>(null)
  const [isProfilePicHovered, setIsProfilePicHovered] = useState(false)
  const [isBgHovered, setIsBgHovered] = useState(false)
  const [isUsernameUpdate, setIsUsernameUpdate] = useState(false)
  const [username, setUsername] = useState('')
  const [isUsernameHovered, setIsUsernameHovered] = useState(false)
  const [HasCollections, setHasCollections] = useState(false)

  type UploadOptionType = 'banner' | 'profile'
  const connectedaAddress: any = address
  
  // Api Call to Get User's Collections 
  const collections = useQuery(
    [QUERIES.getUserCollections, connectedaAddress],
    () => getUserCollections(connectedaAddress, 1, 1),
    {
      enabled: !!address,
      refetchIntervalInBackground: true,
    }
  )
  // console.log(collections?.data?.data?.total)
  useEffect(() => {
    if (collections?.data?.data?.total === 0) {
      setHasCollections(false)
    } else {
      setHasCollections(true)
    }
  }, [collections])

  // Api Call to get User's Data
  const { data: userData } = useQuery(
    [QUERIES.getUser, address],
    () => getUser(String(address)),
    {
      enabled: !!address,
    }
  )

  // Api Call to Post User's ProfileImage 
  const {
    mutate: uploadImage,
    isSuccess: isUploadSuccess,
    isLoading,
  } = useMutation(uploadProfileImg, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getUser)
    },
  })

  // Api Post call to update username
  const {
    mutate: usernameMutation,
    isLoading: isUserMutationLoading,
    isSuccess: isUserMutationSuccess,
  } = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getUser)
    },
  })

  // handle Username input
  const handleUsernameMutation = () => {
    if (!username || !address) return
    usernameMutation({ username, wallet_address: String(address) })
  }


  // Choose File to upload Banner or Profile Picture
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

  // File Validation, check if the uploaded Image is with correct suffix and size
  const handleFileValidation = (files: FileList): boolean => {
    if (!files) return false
    const fileName = files[0]?.name
    const fileSize = files[0]?.size / 1024 / 1024 //file size in MBs
    // const allowedFileTypesRegex = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;


    const allowedFileTypesRegex = /(\.jpg|\.jpeg)$/i  // Manage Allowed suffixes

    if (!allowedFileTypesRegex.exec(fileName)) { 
      toast.dark('Please upload a jpg image', {
        type: 'error',
        hideProgressBar: true,
      })
      return false
    }

    if (fileSize > 1.5) {  // Maximum Allowed Size of upload image in MB
      toast.dark('File must be under 1.5MB', {
        type: 'error',
        hideProgressBar: true,
      })
      return false
    }

    return true
  }


  // Handle upload Banner and PFP
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
    // if (userData && typeof userData?.data !== 'string') setUser(userData?.data?userData?.data:'')

    if (userData?.data?.createdAt) setUser(userData?.data)
    else setUser(null)
  }, [userData])

  useEffect(() => {
    handleUpload()
  }, [handleUpload])

  useEffect(() => {
    if (!isUserMutationSuccess) return
    toast.dark('Username updated successfully', {
      type: 'success',
      hideProgressBar: true,
    })
    setIsUsernameUpdate(false)
  }, [isUserMutationSuccess])

  // Manage Routes
  const routes: RouteType[] = HasCollections
    ? [
        { name: 'overview', route: '/', icon: categoryIcon },
        { name: 'my collections', route: '/', icon: collectionIcon },
        { name: 'settings', route: '/', icon: settingsIcon },
      ]
    : [
        { name: 'overview', route: '/', icon: categoryIcon },
        { name: 'settings', route: '/', icon: settingsIcon },
      ]
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
        onMouseEnter={() => setIsBgHovered(true)}
        onMouseLeave={() => setIsBgHovered(false)}
        onClick={() => setIsBgHovered(true)}
      >
        {isBgHovered && (
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
        )}
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
            {user ? user.username : shortenString(String(address), 4, 4)}
            {isUsernameHovered && user?.username && <FaEdit fontSize={16} />}
          </p>
        )}
        {isUsernameUpdate && (
          <p className="font-poppins absolute -bottom-[110px]">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-1 pr-7 h-8 focus:border focus:border-custom_yellow focus:outline-none
               bg-[#f5f5f5] rounded"
            />
            <AiOutlineSend
              fontSize={16}
              className="absolute top-[25%] right-2 cursor-pointer"
              onClick={handleUsernameMutation}
            />
          </p>
        )}
      </div>
      <div className="grid place-items-center w-full">
        <div className="grid grid-cols-12 gap-4 w-full">
          <motion.div
            className="hidden lg:block lg:col-span-3 h-[928px] p-10 bg-[#1F2021]  rounded-lg mt-20"
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

            {HasCollections && currentRoute === 'my collections' && (
              <CollectionTab
                setIsDrawerOpen={setIsDrawerOpen}
                address={address ? String(address) : undefined}
              />
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
              routes={routes}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default withProtection(ProfilePage)
