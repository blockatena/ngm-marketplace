import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { NGM20ABI } from '../../contracts/nftabi'
import type { AvatarType, NftOfferBodyType, Make1155Offer } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { makeOffer, make1155Offer } from '../../react-query/queries'
import { fromTopAnimation } from '../../utils/animations'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'
import ModalBase from '../ModalBase'
import Spinner from '../Spinner'
import { addresses } from '../../contracts/addresses'
// const NGMMarketAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || ''
// const NGM20Address = process.env.NEXT_PUBLIC_NGM20_ADDRESS || ''
const MakeOfferModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  nft: AvatarType
  accountBalance: any
  chainID: any
  nftType:any
}> = ({ setIsOpen, nft, accountBalance, chainID,nftType }) => {
  const queryClient = useQueryClient()
  const { width } = useWindowDimensions()
  const { address } = useAccount()
  const [bidAmount, setBidAmount] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(false)
  const [clientWidth, setClientWidth] = useState(1)
  const [updateBalance, setAccountBalance] = useState('')
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [isChainCorrect, setIsChainCorrect] = useState(true)
  // const { mutate, data, isLoading, isSuccess } = useMutation(makeOffer, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(QUERIES.getSingleNft)
  //   },
  // })

    const DeployType =
      chainID == '80001' || chainID == '5'
        ? 'DEV'
        : chainID == '137' || chainID == '1'
        ? 'PROD'
        : ''
    const devMarkets = addresses.MARKETPLACE_CONTRACT.DEV
    const prodMarkets = addresses.MARKETPLACE_CONTRACT.PROD

    const NGMMarketAddress =
      DeployType == 'DEV' && chainID == '80001'
        ? devMarkets.MUMBAI
        : DeployType == 'DEV' && chainID == '5'
        ? devMarkets.GOERLI
        : DeployType == 'PROD' && chainID == '137'
        ? prodMarkets.POLYGON
        : DeployType == 'PROD' && chainID == '1'
        ? prodMarkets.ETHEREUM
        : ''
        
      const devTokens = addresses.ERC20_CONTRACT.DEV
      const prodTokens = addresses.ERC20_CONTRACT.PROD

      const NGM20Address =
        DeployType == 'DEV' && chainID == '80001'
          ? devTokens.MUMBAI
          : DeployType == 'DEV' && chainID == '5'
          ? devTokens.GOERLI
          : DeployType == 'PROD' && chainID == '137'
          ? prodTokens.POLYGON
          : DeployType == 'PROD' && chainID == '1'
          ? prodTokens.ETHEREUM
          : ''

  const { mutate: MakeOffer, data:makeOfferData, isLoading:isOfferLoading, isSuccess: isOfferSuccess } =
    useMutation(makeOffer, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getSingleNft)
    },
  })

  const { mutate: Make1155Offer,data:make1155OfferData, isLoading:isOffer1155Loading, isSuccess: is1155OfferSuccess } = useMutation(
    make1155Offer,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES.getSingleNft)
      },
    }
  )
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

  const onSwitchNetwork = async () => {
    await switchNetwork?.(parseInt(chainID))
  }
  const onMakeOffer = async () => {
    if (nft?.token_owner === address) {
      toast.dark('You own this NFT!', {
        type: 'error',
        hideProgressBar: true,
      })
      return
    }

    setLoading(true)
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    const provider = new ethers.providers.Web3Provider(ethereum, 'any')
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    const wethcontract = new ethers.Contract(NGM20Address, NGM20ABI, signer)
    // const minimumBid = 0 // need to get data from api
    const bal = await wethcontract.balanceOf(walletAddress)
    // console.log(bal.toString())
    let balanceInEth: any = ethers.utils.formatEther(bal)
    balanceInEth = parseFloat(balanceInEth).toFixed(2)
    setAccountBalance(balanceInEth)
    const inputAmt: any = await ethers.utils.parseUnits(
      bidAmount.toString(),
      'ether'
    )

    const offerData: NftOfferBodyType = {
      offer_person_address: address ? address : '',
      offer_price: String(bidAmount),
      contract_address: nft?.contract_address,
      token_id: nft?.token_id,
      sign: '',
    }
    const OfferData1155: Make1155Offer = {
      offer_person_address: address ? address : '',
      contract_address: nft?.contract_address,
      token_id: parseInt(nft?.token_id),
      number_of_tokens: quantity,
      per_unit_price: bidAmount,
      sign: '',
    }
    
    let raw721Msg = `{
      "offer_price":"${bidAmount}",
      "offer_person_address":"${address ? address : ''}",
    "contract_address":"${nft?.contract_address}",
    "token_id":"${nft?.token_id}"
  }`
    let raw1155Msg = `{
      "offer_user_address": "${address ? address : ''}",
      "contract_address": "${nft?.contract_address}",
      "token_id": "${nft?.token_id}",
      "number_of_tokens": "${quantity}",
      "per_unit_price": "${bidAmount}",
    }`

    let rawMsg = nftType === 'NGM1155'? raw1155Msg:raw721Msg
    if (parseInt(inputAmt.toString()) > parseInt(bal.toString())) {
      toast.dark(`Your offer is greater than your wallet balance`, {
        type: 'error',
        hideProgressBar: true,
      })
      setLoading(false)
      return
    } else if (parseInt(inputAmt.toString()) <= 0) {
      toast.dark(`Offer must be greater than 0`, {
        type: 'error',
        hideProgressBar: true,
      })
      setLoading(false)
      return
    } else {
      const Offer = ethers.utils.parseUnits(bidAmount.toString(), 'ether')
      const approvedAmt = await wethcontract.allowance(
        signer._address,
        NGMMarketAddress
      )

      if (parseInt(approvedAmt.toString()) > parseInt(Offer.toString())) {
        let hashMessage = await ethers.utils.hashMessage(rawMsg)
        // console.log(hashMessage)
        await signer
          .signMessage(
            `Signing to Make Offer\n${rawMsg}\n Hash: \n${hashMessage}`
          )
          .then(async (sign) => {
            // console.log(sign)
            if(nftType==='NGM1155'){
              OfferData1155['sign'] = sign
            } else {
            offerData['sign'] = sign
            }
          })
          .catch((e) => {
            console.log(e.message)
            setIsOpen(false)
            return
          })
        if (offerData['sign']) {
          MakeOffer(offerData)
          setLoading(false)
        } else if(OfferData1155['sign']) {
          Make1155Offer(OfferData1155)
          setLoading(false)
        } else return setLoading(false)
      } else {
        // const approvedtokens: any = ethers.utils.formatEther(approvedAmt)
        const amt = 1000
        const amount = ethers.utils.parseUnits(amt.toString(), 'ether')
        await wethcontract
          .approve(NGMMarketAddress, amount)
          .then((tx: any) => {
            toast.dark('Processing Transaction!')
            provider.waitForTransaction(tx.hash).then(async () => {
              let hashMessage = await ethers.utils.hashMessage(rawMsg)
              // console.log(hashMessage)
              await signer
                .signMessage(
                  `Signing to Make Offer\n${rawMsg}\n Hash: \n${hashMessage}`
                )
                .then(async (sign) => {
                  // console.log(sign)
                  if (nftType === 'NGM1155') {
                    OfferData1155['sign'] = sign
                  } else {
                    offerData['sign'] = sign
                  }
                })
                .catch((e) => {
                  console.log(e.message)
                  setIsOpen(false)
                  return
                })
              if (offerData['sign']) {
                MakeOffer(offerData)
                setLoading(false)
              } else if(OfferData1155['sign']) {
                Make1155Offer(OfferData1155)
                setLoading(false) } 
                else return setLoading(false)
            })
          })
          .catch(() => {
            toast.dark(String('User Rejected Request'), { type: 'error' })
            setLoading(false)
          })
      }
    }
  }
  const handleBidAmount = (value: number) => {
    if (value > 0) {
      setBidAmount(value)
    } else {
      setBidAmount(0)
    }
  }

  const handleQuantity = (value: number) => {
    if (value > 0) {
      setQuantity(value)
    } else {
      setQuantity(0)
    }
  }

  useEffect(() => {
    setClientWidth(width)
  }, [width])

  useEffect(() => {
    if (isOfferSuccess) {
      let msg = makeOfferData?.data?.message
        ? makeOfferData?.data?.message
        : 'Offer Made Successfully'
      toast(msg, {
        hideProgressBar: true,
        autoClose: 3000,
        type: makeOfferData?.data?.message ? 'error' : 'success',
        position: 'top-right',
        theme: 'dark',
      })
      setIsOpen(false)
    }
    if (is1155OfferSuccess) {
      let msg = make1155OfferData?.data?.message
        ? make1155OfferData?.data?.message
        : 'Offer Made Successfully'
      toast(msg, {
        hideProgressBar: true,
        autoClose: 3000,
        type: make1155OfferData?.data?.message ? 'error' : 'success',
        position: 'top-right',
        theme: 'dark',
      })
      setIsOpen(false)
    }
  }, [
    isOfferSuccess,
    makeOfferData?.data,
    is1155OfferSuccess,
    make1155OfferData?.data,
    setIsOpen,
  ])

  return (
    <ModalBase>
      <motion.div
        className="w-full max-w-[866px] lg:h-[400px] py-4 px-4 lg:px-10 
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
        <div className="text-white flex justify-end">
          <div className="w-[66%] flex justify-between">
            <h2 className="font-poppins text-[20px] lg:text-[30px]">
              Make an Offer
            </h2>{' '}
            <p
              className="text-[#B2A4A4] font-thin cursor-pointer lg:text-[25px] font-poppins"
              onClick={() => setIsOpen(false)}
            >
              <AiOutlineClose fontSize={30} />
            </p>
          </div>
        </div>
        <div className="mt-8">
          <div className="font-poppins lg:text-[20px] flex justify-between mb-2">
            <label htmlFor="offer_amount" className="text-white">
              Offer Amount
            </label>
            <span className="text-[#AEA8A8]">{`Balance : ${updateBalance?updateBalance:accountBalance} WETH `}</span>
          </div>
          <div className="h-[47px] relative rounded-lg">
            <input
              onChange={(e) => handleBidAmount(Number(e.target.value))}
              type="text"
              id="offer_amount"
              className="outline-none w-full h-full bg-[#585858] pl-[25%] text-white rounded-lg"
            />
            <p
              className="text-white font-poppins font-semibold lg:text-[25px] absolute lg:top-[0.35rem] top-3 
            left-4"
            >
              <Image
                src="/images/icons/eth.svg"
                width={clientWidth > 500 ? '14px' : '8px'}
                height={clientWidth > 500 ? '20px' : '15px'}
                alt="eth_logo"
              />
              {'  '}
              <span>WETH</span>
            </p>
          </div>
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
          <div className="grid place-items-center mt-8">
            <button
              className="btn-primary w-[200px] h-[40px] lg:w-[375px] lg:h-[57px] rounded-lg font-poppins lg:text-[25px]
            grid place-items-center"
              onClick={() =>
                isChainCorrect ? onMakeOffer() : onSwitchNetwork()
              }
              disabled={isOfferLoading || loading || isOffer1155Loading}
            >
              {isOfferLoading || loading || isOffer1155Loading ? (
                <Spinner color="black" />
              ) : !isChainCorrect ? (
                'Switch Network'
              ) : (
                'Make Offer'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default MakeOfferModal
