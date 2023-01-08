import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useEffect, useMemo, useState } from 'react'
import { FaHamburger } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import { UserType } from '../interfaces'
import { QUERIES } from '../react-query/constants'
import { createUser } from '../react-query/queries'
import { shortenString } from '../utils'
import { opacityAnimation } from '../utils/animations'
import AccountConfirmationModal from './modals/AccountConfirmationModal'
import Spinner from './Spinner'

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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [userGoogleInfo, setUserGoogleInfo] = useState({
    username: '',
    email: '',
  })

  useEffect(() => {
    if (!isSuccess || !data) return
    if (typeof data?.data !== 'string') {
      toast.dark('User Created Successfully', {
        type: 'success',
        hideProgressBar: true,
      })
      setIsConfirmModalOpen(false)
    }

    typeof data?.data === 'string' &&
      toast.dark(data.data, {
        type: 'error',
        hideProgressBar: true,
      })
  }, [data, isSuccess])

  const handleCreateUser = (
    email: string,
    wallet_address: string,
    username: string
  ) => {
    createUserMutation({
      email,
      wallet_address,
      username,
    })
  }

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
          setUserGoogleInfo((prev) => ({
            ...prev,
            email: res?.data?.email,
            username: res.data?.name,
          }))
          setIsConfirmModalOpen(true)
          // createUserMutation({
          //   email: res.data.email,
          //   wallet_address: String(address),
          //   username: res.data?.name,
          // })
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
    <div>
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
      <AnimatePresence>
        {isConfirmModalOpen && (
          <AccountConfirmationModal
            isOpen={isConfirmModalOpen}
            setIsOpen={setIsConfirmModalOpen}
            user={userGoogleInfo}
            createUser={handleCreateUser}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserSettings
