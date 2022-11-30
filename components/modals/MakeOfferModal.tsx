import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import { NGM20ABI } from '../../contracts/nftabi'
import type { AvatarType, NftOfferBodyType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { makeOffer } from '../../react-query/queries'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'
import Spinner from '../Spinner'

const NGMMarketAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || ''
const NGM20Address = process.env.NEXT_PUBLIC_NGM20_ADDRESS || ''
const CHAINID = 80001
const MakeOfferModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  nft: AvatarType
  accountBalance: any
}> = ({ setIsOpen, nft, accountBalance }) => {

  const initialFormState = {
    end_date: ''
  }
  const queryClient = useQueryClient()
  const { address } = useAccount()
  const [bidAmount, setBidAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  // const [accountBalance, setAccountBalance] = useState('')
  const [formData, setFormData] = useState(initialFormState)

  const { mutate, data, isLoading, isSuccess } = useMutation(makeOffer, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getSingleNft)
    },
  })

  const onBid = async () => {
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
    if (chainId !== CHAINID) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(CHAINID) }], // chainId must be in hexadecimal numbers
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
    }

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
        mutate(offerData)
        setLoading(false)
      } else {
        // const approvedtokens: any = ethers.utils.formatEther(approvedAmt)
        const amt = 1000
        const amount = ethers.utils.parseUnits(amt.toString(), 'ether')
        await wethcontract
          .approve(NGMMarketAddress, amount)
          .then((tx: any) => {
            toast.dark('Processing Transaction!')
            provider.waitForTransaction(tx.hash).then(() => {
              mutate(offerData)
              setLoading(false)
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
    if (isSuccess) {
      toast.dark('Offer Made Successfully', {
        hideProgressBar: true,
        type: 'success',
      })
      setIsOpen(false)
    }
  }, [isSuccess, data?.data, setIsOpen])

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    // console.log(formData.end_date)
  }

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
              X
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
            <p className="text-white font-poppins font-semibold lg:text-[25px] absolute top-3 left-4">
              <Image
                src="/images/icons/eth.svg"
                width="14px"
                height="20px"
                alt="eth_logo"
              />{'  '}
              <span>WETH</span>
            </p>
          </div>
          <br></br>
          <div
            className="flex flex-col md:flex-row items-center gap-4 h-[47px] rounded-lg bg-[#4D4D49] text-white 
            font-poppins pl-4"
          >
            <p className="text-lg text-white"> OFFER EXPIRE : </p>
            <div>
              <input
                type="datetime-local"
                id="end_date"
                name="end_date"
                className="bg-[#4D4D49] text-white"
                onChange={handleUserInput}
              />
            </div>
          </div>

          <div className="grid place-items-center mt-8">
            <button
              className="btn-primary w-[200px] h-[40px] lg:w-[375px] lg:h-[57px] rounded-lg font-poppins lg:text-[25px]
            grid place-items-center"
              onClick={() => onBid()}
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
