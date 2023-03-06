import { motion } from 'framer-motion'
import { Dispatch, FC, SetStateAction, useEffect,useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { QUERIES } from '../../react-query/constants'
import { acceptOffer, accept1155Offer } from '../../react-query/queries'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'
import Spinner from '../Spinner'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { useNetwork, useSwitchNetwork } from 'wagmi'

// Accept Offer Modal : from Single NFT page
const AcceptOfferModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  // nft: AvatarType
  contract_address: string
  token_id: string
  offer_address: any
  token_owner: string
  setActiveTabIndex: () => void
  chainID: any
  nftType:any
}> = ({
  setIsOpen,
  contract_address,
  token_id,
  offer_address,
  setActiveTabIndex,
  chainID,
  nftType
}) => {
  const queryClient = useQueryClient()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [isChainCorrect, setIsChainCorrect] = useState(true)
  const [quantity, setQuantity] = useState(0)


  //Api call to accept offer ERC721 
    const {
      mutate: AcceptOffer,
      data: acceptOfferData,
      isLoading: isOfferLoading,
      isSuccess: isOfferSuccess,
    } = useMutation(acceptOffer, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES.getSingleNft)
      },
    })

    // Api call to accept offer ERC1155
    const {
      mutate: Accept1155Offer,
      data: accept1155OfferData,
      isLoading: isOffer1155Loading,
      isSuccess: is1155OfferSuccess,
    } = useMutation(accept1155Offer, {
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

  // Switch Network
  const onSwitchNetwork = async () => {
    await switchNetwork?.(parseInt(chainID))
  }

  // Handle Click
  const handleClick = async () => {
    const data = {
      contract_address: contract_address,
      token_id: token_id,
      offer_person_address: offer_address,
      token_owner: address ? address : '',
      sign: '',
    }
    const data1155 = {
      contract_address: contract_address,
      token_id: parseInt(token_id),
      offer_person_address: offer_address,
      token_owner: address ? address : '',
      number_of_tokens:quantity,
      sign: '',
    }
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    const provider = new ethers.providers.Web3Provider(ethereum, 'any')
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    let rawMsg721 = `{
      "contract_address":"${contract_address}",
      "token_id":"${token_id}",
      "offer_person_address":"${offer_address}",
      "token_owner":"${address ? address : ''}"
  }`

  let rawMsg1155 = `{
      "contract_address":"${contract_address}",
      "token_id":"${token_id}",
      "offer_person_address":"${offer_address}",
      "token_owner":"${address ? address : ''}",
      "number_of_tokens":"${quantity}"
  }`
  let rawMsg = nftType === 'NGM1155'?rawMsg1155:rawMsg721

    let hashMessage = await ethers.utils.hashMessage(rawMsg)
    // console.log(hashMessage)
    await signer
      .signMessage(
        `Signing to Accept Offer\n${rawMsg}\n Hash: \n${hashMessage}`
      )
      .then(async (sign) => {
        // console.log(sign)
        if(nftType==='NGM1155'){
          data1155['sign'] = sign
        } else {
          data['sign'] = sign
        }
      })
      .catch((e) => {
        console.log(e.message)
        setIsOpen(false)
        return
      })
    if (data['sign'] || data1155['sign']) {
      if(nftType==='NGM1155') {
        Accept1155Offer(data1155)
      } else {
        AcceptOffer(data)
      }
    } else return
  }

  useEffect(() => {
    if (isOfferSuccess) {
      toast(
        acceptOfferData?.data?.message
          ? acceptOfferData?.data?.message
          : 'Offer Accepted Successfully',
        {
          hideProgressBar: true,
          autoClose: 3000,
          type: acceptOfferData?.data?.message ? 'error' : 'success',
          position: 'top-right',
          theme: 'dark',
        }
      )
      setActiveTabIndex()
      setIsOpen(false)
    }
    if (is1155OfferSuccess) {
      toast(
        accept1155OfferData?.data?.message
          ? accept1155OfferData?.data?.message
          : 'Offer Accepted Successfully',
        {
          hideProgressBar: true,
          autoClose: 3000,
          type: accept1155OfferData?.data?.message ? 'error' : 'success',
          position: 'top-right',
          theme: 'dark',
        }
      )
      setActiveTabIndex()
      setIsOpen(false)
    }
  }, [
    isOfferSuccess,
    acceptOfferData?.data?.message,
    is1155OfferSuccess,
    accept1155OfferData?.data?.message,
    setIsOpen,
    setActiveTabIndex,
  ])

    const handleQuantity = (value: number) => {
      if (value > 0) {
        setQuantity(value)
      } else {
        setQuantity(0)
      }
    }
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
          {!isChainCorrect
            ? 'Wrong network detected'
            : 'Are you sure you want to accpet this offer?'}
        </h2>
        {isOfferLoading || isOffer1155Loading && (
          <div className="py-4 grid place-items-center">
            <Spinner />
          </div>
        )}

        <div className="mt-8">
          {nftType === 'NGM1155' && (
            <>
              <div className="font-poppins lg:text-[20px] flex justify-between mb-2 mt-3">
                <label htmlFor="quantity" className="text-white">
                  Quantity
                </label>
              </div>
              <div className="h-[47px] relative rounded-lg">
                <input
                  onChange={(e) => handleQuantity(Number(e.target.value))}
                  type="number"
                  id="quantity"
                  className="outline-none w-full h-full bg-[#585858] px-[5%] text-white rounded-lg"
                />
              </div>
            </>
          )}
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

export default AcceptOfferModal
