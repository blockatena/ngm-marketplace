import { motion } from 'framer-motion'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { QUERIES } from '../../react-query/constants'
import { sendApiKey, createApiKey, getUser } from '../../react-query/queries'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'
import Spinner from '../Spinner'
import { useAccount } from 'wagmi'
import { ApiKeyReq } from '../../interfaces'
import { useRouter } from 'next/router'

// Accept Offer Modal : from Single NFT page
const ApiKeyRequestModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}> = ({ setIsOpen }) => {
  const queryClient = useQueryClient()
  const { address, isConnected } = useAccount()
  const [user, setUser] = useState<any>()
  const router = useRouter()

  //Api 
  const {
    mutate: CreateApiKey,
    data: createApiData,
    isLoading: createApiLoading,
    isSuccess: createApiSuccess,
  } = useMutation(createApiKey, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getUser)
    },
  })

  // 


  const {
    mutate: SendApiKey,
    data: sendApiData,
    isLoading: sendApiLoading,
    isSuccess: sendApiSuccess,
  } = useMutation(sendApiKey, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getUser)
    },
  })




  const { data: userData } = useQuery(
    [QUERIES.getUser, address],
    () => getUser(String(address)),
    {
      enabled: !!address,
    }
  )

  useEffect(() => {
    // if (userData && typeof userData?.data !== 'string') setUser(userData?.data?userData?.data:'')

    if (userData?.data?.createdAt) setUser(userData?.data)
    else setUser(null)
  }, [userData])

  const createKey = async () => {
    const data: ApiKeyReq = {
      wallet_address: address,
      email: user?.email,
    }

    await CreateApiKey(data)
  }

  const sendKey = async () => {
    const data: ApiKeyReq = {
      wallet_address: address,
      email: user?.email,
    }
    await SendApiKey(data)

  }

  const handleClick = async () => {
    await createKey()
    await sendKey()
  }

  const onConnect = async () => {
    await router.push('/connect-wallet')
  }

  useEffect(() => {
    if (createApiSuccess) {
      toast(
        createApiData?.data?.message
          ? createApiData?.data?.message
          : 'Api Key Created Successfully',
        {
          hideProgressBar: true,
          autoClose: 3000,
          type: createApiData?.data?.message ? 'error' : 'success',
          position: 'top-right',
          theme: 'dark',
        }
      )
      setIsOpen(false)
    }
    if (sendApiSuccess && sendApiData?.data) {
      toast(
        sendApiData?.data?.message
          ? sendApiData?.data?.message
          : 'Api Key Sent to Email Successfully',
        {
          hideProgressBar: true,
          autoClose: 3000,
          type: sendApiData?.data?.message ? 'error' : 'success',
          position: 'top-right',
          theme: 'dark',
        }
      )
      setIsOpen(false)
    }
  }, [
    createApiSuccess,
    createApiData?.data?.message,
    sendApiSuccess,
    sendApiData?.data,
    sendApiData?.data?.message,
    setIsOpen
  ])

  return (
    <ModalBase>
      <motion.div
        className="w-full max-w-[866px] lg:h-[382px] py-4 px-4 lg:px-10 
    rounded-lg skew-y-1 -skew-x-1 bg-gradient-to-b from-[#494A4A] via-[#222324] to-[#030507]"
        variants={fromTopAnimation}
        initial="initial"
        animate="final"
        exit="initial"
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <p className="text-white text-right font-inter font-thin lg:text-2xl mb-6">
          <span
            className="cursor-pointer"
            role="buton"
            onClick={() => setIsOpen(false)}
          >
            x
          </span>
        </p>
        <h2 className="text-white font-poppins text-[20px] lg:text-[30px] text-center my-4">
          {!isConnected
            ? 'Connect Wallet'
            : 'Are you sure you want to Get API Key?'}
        </h2>
        {createApiLoading ||
          (sendApiLoading && (
            <div className="py-4 grid place-items-center">
              <Spinner />
            </div>
          ))}

        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between gap-2 lg:gap-4 lg:pt-10">
            {isConnected && (
              <>
                <button
                  className="btn-secondary w-full md:w-1/2 h-[42px] md:h-16 text-sm lg:text-[21px]"
                  onClick={() => setIsOpen(false)}
                  disabled={createApiLoading || sendApiLoading}
                >
                  No
                </button>
                <button
                  className="w-full btn-primary md:w-1/2 rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
                  onClick={handleClick}
                  disabled={createApiLoading || sendApiLoading}
                >
                  Yes
                </button>
              </>
            )}
            {!isConnected && (
              <button
                className="w-full btn-primary md:w-full rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
                onClick={onConnect}
                disabled={createApiLoading || sendApiLoading}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default ApiKeyRequestModal
