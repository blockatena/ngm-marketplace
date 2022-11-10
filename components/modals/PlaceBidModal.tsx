import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction } from 'react'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'
import { useState } from 'react'
import { ethers } from 'ethers'
import {
  NGM20ABI,
  NGM20Address,
  NGMMarketAddress,
} from '../../contracts/nftabi'
const PlaceBidModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}> = ({ setIsOpen }) => {
  const [bidAmount, setBidAmount] = useState(0)
  const onBid = async () => {
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    
    const provider = new ethers.providers.Web3Provider(ethereum)
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)

    const wethcontract = new ethers.Contract(NGM20Address, NGM20ABI, signer)

    const minimumBid = 0 // need to get data from api

    if (bidAmount === minimumBid) {
      console.log(`Amount must be more than minium bid`)
    } else {
      const Offer = ethers.utils.parseUnits(bidAmount.toString(), 'ether')
      const approvedAmt = await wethcontract.allowance(
        signer._address,
        NGMMarketAddress
      )

      if (approvedAmt >= Offer) {
        // Axios data:POST ( Place Bid )
        // confirmation model
      } else {
        const approvedtokens: any = ethers.utils.formatEther(approvedAmt)
        const amt = bidAmount - approvedtokens
        const amount = ethers.utils.parseUnits(amt.toString(), 'ether')
        await wethcontract
          .approve(NGMMarketAddress, amount)
          .then((tx: any) => {
            console.log('processing')
            provider.waitForTransaction(tx.hash).then(() => {
              console.log(tx.hash)
              //Axios data:POST ( Place Bid )
              //confirmation model
            })
          })
          .catch((e: any) => {
            console.log(e.message)
          })
      }
    }
  }
  const getBidAmount = (value: any) => {
    if (value > 0) {
      setBidAmount(value)
    } else {
      setBidAmount(0)
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
        <div className="text-white flex justify-end">
          <div className="w-[66%] flex justify-between">
            <h2 className="font-poppins text-[20px] lg:text-[30px]">
              Place a Bid
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
              Bid Amount
            </label>
            <span className="text-[#AEA8A8]">Balance : 0.00WETH </span>
          </div>
          <div className="h-[47px] relative rounded-lg">
            <input
              onChange={(e) => getBidAmount(e.target.value)}
              type="text"
              id="offer_amount"
              className="outline-none w-full h-full bg-[#585858] pl-[25%] text-white rounded-lg"
            />
            <p className="text-white font-poppins font-semibold lg:text-[22px] absolute top-3 left-4">
              <Image
                src="/images/icons/eth.svg"
                width="15px"
                height="23px"
                alt="eth_logo"
              />{' '}
              <span>WETH</span>
            </p>
          </div>
          <p className="font-poppins text-xs lg:text-[17px] text-[#7C7C7C] mt-2">
            The next bid must be 5% more than the current bid
          </p>
          <div className="grid place-items-center mt-8">
            <button
              className="btn-primary w-[200px] h-[40px] lg:w-[375px] lg:h-[57px] rounded-lg font-poppins lg:text-[25px]
            "
              onClick={() => onBid()}
            >
              Place Bid
            </button>
          </div>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default PlaceBidModal
