import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import { NGM20ABI } from '../../contracts/nftabi'
import type { AvatarType, NftOfferBodyType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { makeOffer } from '../../react-query/queries'
import { fromTopAnimation } from '../../utils/animations'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'
import ModalBase from '../ModalBase'
import Spinner from '../Spinner'

const NGMMarketAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || ''
const NGM20Address = process.env.NEXT_PUBLIC_NGM20_ADDRESS || ''
const CHAINID = process.env.NEXT_PUBLIC_CHAIN_ID || ''
const MakeOfferModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  nft: AvatarType
  accountBalance: any
}> = ({ setIsOpen, nft, accountBalance }) => {
  const queryClient = useQueryClient()
  const { width } = useWindowDimensions()
  const { address } = useAccount()
  const [bidAmount, setBidAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [clientWidth, setClientWidth] = useState(1)
  // const [accountBalance, setAccountBalance] = useState('')

  const { mutate, data, isLoading, isSuccess } = useMutation(makeOffer, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getSingleNft)
    },
  })

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
    const wethcontract = new ethers.Contract(NGM20Address, NGM20ABI, signer)
    // const minimumBid = 0 // need to get data from api
    const bal = await wethcontract.balanceOf(walletAddress)
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
    let rawMsg = `{
      "offer_price":"${bidAmount}",
      "offer_person_address":"${
      address ? address : ''
    }",
    "contract_address":"${nft?.contract_address}",
    "token_id":"${
      nft?.token_id
    }"
  }`

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
            offerData['sign'] = sign
          })
          .catch((e) => {
            console.log(e.message)
            setIsOpen(false)
            return
          })
          if (offerData['sign']) {
            mutate(offerData)
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
                  offerData['sign'] = sign
                })
                .catch((e) => {
                  console.log(e.message)
                  setIsOpen(false)
                  return
                })
              if (offerData['sign']) {
                mutate(offerData)
                setLoading(false)
              } else return setLoading(false)
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

  useEffect(() => {
    setClientWidth(width)
  }, [width])

  useEffect(() => {
    if (isSuccess) {
      let msg = data?.data?.message
        ? data?.data?.message
        : 'Offer Made Successfully'
      toast(msg, {
        hideProgressBar: true,
        autoClose: 3000,
        type: data?.data?.message ? 'error' : 'success',
        position: 'top-right',
        theme: 'dark',
      })
      setIsOpen(false)
    }
  }, [isSuccess, data?.data, setIsOpen])

  return (
    <ModalBase>
      <motion.div
        className="w-full max-w-[866px] lg:h-[350px] py-4 px-4 lg:px-10 
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
            <span className="text-[#AEA8A8]">{`Balance : ${accountBalance} WETH `}</span>
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

          <div className="grid place-items-center mt-8">
            <button
              className="btn-primary w-[200px] h-[40px] lg:w-[375px] lg:h-[57px] rounded-lg font-poppins lg:text-[25px]
            grid place-items-center"
              onClick={() => onMakeOffer()}
              disabled={isLoading || loading}
            >
              {isLoading || loading ? <Spinner color="black" /> : 'Make Offer'}
            </button>
          </div>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default MakeOfferModal
