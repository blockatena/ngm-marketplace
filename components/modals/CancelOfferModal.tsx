import { motion } from 'framer-motion'
import { Dispatch, FC, SetStateAction, useEffect,useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { QUERIES } from '../../react-query/constants'
import { cancelOffer, cancel1155Offer } from '../../react-query/queries'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'
import Spinner from '../Spinner'
import { ethers } from 'ethers'
import { useNetwork, useSwitchNetwork } from 'wagmi'


// cancel offer Modal
const CancelOfferModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  // nft: AvatarType
  contract_address: string
  token_id: string
  address: any
  caller: any
  chainID:any
  nftType:any
}> = ({ setIsOpen, contract_address, token_id, address, caller, chainID, nftType }) => {
  const queryClient = useQueryClient()
  // const { address } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [isChainCorrect, setIsChainCorrect] = useState(true)


  // api call to cancel offer ERC721 
  const {
    mutate: CancelOffer,
    data: cancelOfferData,
    isLoading: isOfferLoading,
    isSuccess: isOfferSuccess,
  } = useMutation(cancelOffer, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getSingleNft)
    },
  })

  // APi call to cancel offer ERC1155
  const {
    mutate: Cancel1155Offer,
    data: cancel1155OfferData,
    isLoading: isOffer1155Loading,
    isSuccess: is1155OfferSuccess,
  } = useMutation(cancel1155Offer, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getSingleNft)
    },
  })
  useEffect(() => {
    if (!chainID) return
    if (chain?.id === parseInt(chainID)) {
      setIsChainCorrect(true)
      return
    } else {
      setIsChainCorrect(false)
      return
    }
  }, [chain, chainID])


  // Switch network if network is not correct
  const onSwitchNetwork = async () => {
    await switchNetwork?.(parseInt(chainID))
  }
  const handleClick = async () => {
    const data = {
      contract_address: contract_address,
      token_id: token_id,
      offer_person_address: address,
      caller: caller,
      sign: '',
    }
    const data1155 = {
      contract_address: contract_address,
      token_id: parseInt(token_id),
      offer_person_address: address,
      sign: '',
    }
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    const provider = new ethers.providers.Web3Provider(ethereum, 'any')
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    let rawMsg = nftType==='NGM1155'? `{
      "offer_person_address":"${address ? address : ''}",
    "contract_address":"${contract_address}",
    "token_id":"${token_id}"
  }`:`{
      "offer_person_address":"${address ? address : ''}",
    "contract_address":"${contract_address}",
    "token_id":"${token_id}",
    "caller":"${caller}"
  }`
    let hashMessage = await ethers.utils.hashMessage(rawMsg)
    // console.log(hashMessage)
    await signer
      .signMessage(
        `Signing to Cancel Offer\n${rawMsg}\n Hash: \n${hashMessage}`
      )
      .then(async (sign) => {
        // console.log(sign)
        data1155['sign'] = sign
        data['sign'] = sign
      })
      .catch((e) => {
        console.log(e.message)
        setIsOpen(false)
        return
      })
    if (data['sign']) {
      if(nftType==='NGM1155'){
        Cancel1155Offer(data1155)
      } else {
      CancelOffer(data)
      }
    } else return
  }

  useEffect(() => {
    if (isOfferSuccess) {
      toast(
        cancelOfferData?.data?.message
          ? cancelOfferData?.data?.message
          : 'Offer Cancelled Successfully',
        {
          hideProgressBar: true,
          autoClose: 3000,
          type: cancelOfferData?.data?.message ? 'error' : 'success',
          position: 'top-right',
          theme: 'dark',
        }
      )
      setIsOpen(false)
    }
    if (is1155OfferSuccess) {
      toast(
        cancel1155OfferData?.data?.message
          ? cancel1155OfferData?.data?.message
          : 'Offer Cancelled Successfully',
        {
          hideProgressBar: true,
          autoClose: 3000,
          type: cancel1155OfferData?.data?.message ? 'error' : 'success',
          position: 'top-right',
          theme: 'dark',
        }
      )
      setIsOpen(false)
    }
  }, [
    isOfferSuccess,
    cancelOfferData?.data?.message,
    is1155OfferSuccess,
    cancel1155OfferData?.data?.message,
    setIsOpen,
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
            onClick={() =>
               setIsOpen(false)
            }
          >
            x
          </span>
        </p>
        <h2 className="text-white font-poppins text-[20px] lg:text-[30px] text-center my-4">
          {!isChainCorrect
            ? 'Wrong network detected'
            : 'Are you sure you want to cancel this offer?'}
        </h2>
        {isOfferLoading ||
          (isOffer1155Loading && (
            <div className="py-4 grid place-items-center">
              <Spinner />
            </div>
          ))}

        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between gap-2 lg:gap-4 lg:pt-10">
            {isChainCorrect && (
              <>
                <button
                  className="btn-secondary w-full md:w-1/2 h-[42px] md:h-16 text-sm lg:text-[21px]"
                  onClick={() => setIsOpen(false)}
                  disabled={isOfferLoading || isOffer1155Loading}
                >
                  No
                </button>
                <button
                  className="w-full btn-primary md:w-1/2 rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
                  onClick={handleClick}
                  disabled={isOfferLoading || isOffer1155Loading}
                >
                  Yes
                </button>
              </>
            )}
            {!isChainCorrect && (
              <button
                className="w-full btn-primary md:w-full rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
                onClick={onSwitchNetwork}
                disabled={isOfferLoading || isOffer1155Loading}
              >
                Switch Network
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default CancelOfferModal
