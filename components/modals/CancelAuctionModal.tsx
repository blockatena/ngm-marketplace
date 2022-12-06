import { motion } from 'framer-motion'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { AvatarType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { cancelAuction } from '../../react-query/queries'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'
import Spinner from '../Spinner'
import { ethers } from 'ethers'

const CHAINID: string = process.env.NEXT_PUBLIC_CHAIN_ID || ''
const CancelAuctionModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  nft: AvatarType
  setActiveTabIndex: () => void
}> = ({ setIsOpen, nft, setActiveTabIndex }) => {
  const queryClient = useQueryClient()

  const { mutate, isSuccess, data, isLoading } = useMutation(cancelAuction, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getSingleNft)
    },
  })

  const handleClick = async () => {
    const data = {
      contract_address: nft?.contract_address,
      token_id: nft?.token_id,
      sign:''
    }
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    const provider = new ethers.providers.Web3Provider(ethereum, 'any')
    const { chainId } = await provider.getNetwork()
    let chain = parseInt(CHAINID)
    if (chainId !== chain) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(chain) }], // chainId must be in hexadecimal numbers
      })
    }
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    let rawMsg = `{"contract_address":"${nft?.contract_address}","token_id":"${
      nft?.token_id
    }"}`
    let hashMessage = await ethers.utils.hashMessage(rawMsg)
    // console.log(hashMessage)
    await signer
      .signMessage(hashMessage)
      .then(async (sign) => {
        // console.log(sign)
        data['sign'] = sign
      })
      .catch((e) => {
        console.log(e.message)
        setIsOpen(false)
        return
      })
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      toast('Auction Cancelled Successfully', {
        hideProgressBar: true,
        autoClose: 3000,
        type: 'success',
        position: 'top-right',
        theme: 'dark',
      })
      setActiveTabIndex()
      setIsOpen(false)
    }
  }, [isSuccess, data?.data?.message, setIsOpen,setActiveTabIndex])

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
            onClick={() => !isLoading && setIsOpen(false)}
          >
            x
          </span>
        </p>
        <h2 className="text-white font-poppins text-[20px] lg:text-[30px] text-center my-4">
          Are you sure you want to cancel this auction?
        </h2>
        {isLoading && (
          <div className="py-4 grid place-items-center">
            <Spinner />
          </div>
        )}

        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between gap-2 lg:gap-4 lg:pt-10">
            <button
              className="btn-secondary w-full md:w-1/2 h-[42px] md:h-16 text-sm lg:text-[21px]"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              No
            </button>
            <button
              className="w-full btn-primary md:w-1/2 rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
              onClick={handleClick}
              disabled={isLoading}
            >
              Yes
            </button>
          </div>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default CancelAuctionModal
