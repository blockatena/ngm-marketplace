import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
// import Image from 'next/image'
import { FC, useState } from 'react'
import { useAccount } from 'wagmi'
import AvatarCard from '../../components/AvatarCard'
import { AvatarType, NftContractType } from '../../interfaces'
// import ownerImg from '../../public/images/others/owner.png'
import { fromLeftAnimation, fromRightAnimation } from '../../utils/animations'
import useIsMounted from '../../utils/hooks/useIsMounted'
import CancelAuctionModal from '../modals/CancelAuctionModal'
import MakeOfferModal from '../modals/MakeOfferModal'
import PlaceBidModal from '../modals/PlaceBidModal'

const ProductOverviewSection: FC<{
  nft: AvatarType
  contractDetails: NftContractType | undefined
  endTime: string
  bidAmt: string
  lastBid: string
}> = ({ nft, contractDetails, endTime, bidAmt, lastBid }) => {
  const router = useRouter()
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const { address } = useAccount()
  const isMounted = useIsMounted()
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [D, setD] = useState(0)
  const [H, setH] = useState(0)
  const [M, setM] = useState(0)
  const [S, setS] = useState(0)
  // const meta_data_url = nft?.nft.meta_data_url || ''

  const isCancellable =
    isMounted &&
    nft?.token_owner &&
    nft.token_owner === address &&
    nft?.is_in_auction

  const handleClick = () => {
    // if (isMounted && nft?.token_owner === address && nft?.is_in_auction) {
    //   toast('You have already listed this NFT!', {
    //     hideProgressBar: true,
    //     autoClose: 3000,
    //     type: 'error',
    //     position: 'top-right',
    //     theme: 'dark',
    //   })
    //   return
    // }
    if (isCancellable) {
      setIsCancelModalOpen(true)
      return
    }
    if (isMounted && nft?.token_owner === address) {
      router.push(`${router.asPath}/list`)
      return
    }
    nft?.is_in_auction === false && setIsOfferModalOpen(true)
    nft?.is_in_auction && setIsBidModalOpen(true)
  }
  if (nft?.is_in_auction === true) {
    setInterval(() => {
      if (Date.parse(endTime) > Date.now()) {
        const Difference = (Date.parse(endTime) - Date.now()) / 1000
        // console.log(Difference)
        const day = Math.floor(Difference / (24 * 60 * 60))
        const hour = Math.floor((Difference - day * 24 * 60 * 60) / (60 * 60))
        const minute = Math.floor(
          (Difference - day * 24 * 60 * 60 - hour * 60 * 60) / 60
        )
        const second = Math.floor(
          Difference - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
        )
        setD(day)
        setH(hour)
        setM(minute)
        setS(second)
      } else {
        //
      }
    }, 1000)
  } else {
    //
  }


  return (
    <section className="flex flex-col xl:flex-row gap-4 lg:gap-0 2xl:gap-32 xl:justify-between p-0">
      <motion.div
        className="flex justify-between"
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
        <AvatarCard
          // name="Wraith"
          // img="/images/auction/auction_img_1.svg"
          variant="lg"
          noCta
          {...nft}
          // contract_details={
          //   _id: '',
          //   symbol: '',
          //   owner_address: '',
          //   collection_name: '',
          //   chain: '',
          //   type: '',
          //   transactionhash: '',
          //   contract_address: '',
          //   description: '',
          //   baseuri: '',
          //   imageuri: [''],
          //   createdAt: ''}
        />
        <div className="lg:hidden grid place-items-center">
          <div className=" capitalize border-l-[4px] border-custom_yellow pl-2 ">
            <p className="text-custom_yellow lg:text-[30px] font-play mb-2">
              {/* {nft?.contract_details.collection_name} */}
              {contractDetails?.collection_name}
            </p>
            <p className="text-white text-2xl lg:text-[49px] font-josefin">
              {nft?.meta_data?.name}
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="p-4 flex flex-col justify-evenly lg:pl-12 gap-4 xl:gap-0"
        variants={fromRightAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.4,
          delay: 0.6,
        }}
      >
        <div className=" capitalize border-l-[4px] border-custom_yellow pl-2 hidden lg:block">
          <p className="text-custom_yellow lg:text-[30px] font-play mb-2">
            {contractDetails?.collection_name}
          </p>
          <p className="text-white text-2xl lg:text-[49px] font-josefin leading-[55px]">
            {nft?.meta_data?.name}
          </p>
        </div>

        <p className="text-[#D7D7D7] font-poppins text-sm lg:text-base text-center lg:text-left">
          {nft?.meta_data?.description}
        </p>

        <div className="flex justify-between font-poppins">
          <div>
            {bidAmt && (
              <>
                <p className="text-gray-600 text-sm lg:text-base">Price Bid</p>
                <p className="text-white font-bold text-lg lg:text-2xl">
                  {bidAmt} ETH
                </p>
              </>
            )}
          </div>
          <div>
            {bidAmt && (
              <>
                <p className="text-gray-600 text-sm lg:text-base">Last Bid</p>
                <p className="text-white font-bold text-lg lg:text-2xl">
                  {bidAmt} ETH
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between md:flex-row gap-2">
          <div className="flex justify-between gap-4 lg:gap-6 bg-gray-900 p-2 lg:p-4 rounded-lg">
            <div className="bg-custom_gray_light h-10 w-10 rounded">
              {/* <Image src={ownerImg} alt="" /> */}
            </div>
            <div className="font-poppins">
              <p className="text-gray-600 text-sm lg:text-base">Owner</p>
              <p className="font-medium text-white text-sm lg:text-base">
                {/* SalvadorDali */}
                {nft?.token_owner &&
                  `${nft.token_owner.substring(
                    0,
                    5
                  )}...${nft.token_owner.substring(
                    nft.token_owner.length - 3
                  )}`}
              </p>
            </div>
          </div>
          <div className="grid place-items-center">
            <div className="px-2 lg:px-6 py-2 bg-[#262729] text-[13px] lg:text-[20px] text-white rounded-lg">
              {D < 10 && <>0</>}
              {D} : {H < 10 && <>0</>}
              {H} : {M < 10 && <>0</>}
              {M} : {S < 10 && <>0</>}
              {S}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-2 lg:gap-4">
          {/* <button
            className="btn-secondary w-full md:w-1/2 h-[42px] md:h-16 text-sm lg:text-[21px]"
            onClick={() => setIsBidModalOpen(true)}
          >
            Purchase Now
          </button> */}
          <button
            className="w-full btn-primary rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
            onClick={handleClick}
          >
            {isCancellable
              ? 'Cancel Auction'
              : isMounted && nft?.token_owner && nft.token_owner === address
              ? 'Sell'
              : nft?.is_in_auction
              ? 'Place Bid'
              : 'Make Offer'}
          </button>
        </div>
      </motion.div>
      <AnimatePresence>
        {isBidModalOpen && (
          <PlaceBidModal
            isOpen={isBidModalOpen}
            setIsOpen={setIsBidModalOpen}
            nft={nft}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOfferModalOpen && (
          <MakeOfferModal
            isOpen={isOfferModalOpen}
            setIsOpen={setIsOfferModalOpen}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCancelModalOpen && (
          <CancelAuctionModal
            isOpen={isCancelModalOpen}
            setIsOpen={setIsCancelModalOpen}
            nft={nft}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProductOverviewSection
