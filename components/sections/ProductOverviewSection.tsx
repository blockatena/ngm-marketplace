import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
// import Image from 'next/image'
import { ethers } from 'ethers'
import { FC, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import AvatarCard from '../../components/AvatarCard'
import { NGM20ABI } from '../../contracts/nftabi'
import {
  AuctionType,
  AvatarType,
  BidType,
  NftContractType,
} from '../../interfaces'
// import ownerImg from '../../public/images/others/owner.png'
import { fromLeftAnimation, fromRightAnimation } from '../../utils/animations'
import { DEAD_ADDRESS } from '../../utils/constants'
import useIsMounted from '../../utils/hooks/useIsMounted'
import CancelAuctionModal from '../modals/CancelAuctionModal'
import CancelBidModal from '../modals/CancelBidModal'
import CancelSaleModal from '../modals/CancelSaleModal'
import MakeOfferModal from '../modals/MakeOfferModal'
import PlaceBidModal from '../modals/PlaceBidModal'
const NGM20Address = process.env.NEXT_PUBLIC_NGM20_ADDRESS || ''

const ProductOverviewSection: FC<{
  nft: AvatarType
  contractDetails: NftContractType | undefined
  bids: BidType[] | undefined
  auction: AuctionType | undefined
  endTime: string
}> = ({ nft, contractDetails, endTime, bids, auction }) => {
  const router = useRouter()
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)
  const [isCancelBidModalOpen, setIsCancelBidModalOpen] = useState(false)
  const [isUserIsBidder, setIsUserIsBidder] = useState(false)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const [isCancelSaleModalOpen, setIsCancelSaleModalOpen] = useState(false)
  const { address } = useAccount()
  const isMounted = useIsMounted()
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [D, setD] = useState(0)
  const [H, setH] = useState(0)
  const [M, setM] = useState(0)
  const [S, setS] = useState(0)
  const [accountBalance, setAccountBalance] = useState('')
  // const meta_data_url = nft?.nft.meta_data_url || ''

  const isCancellable =
    isMounted &&
    nft?.token_owner &&
    nft.token_owner === address &&
    nft?.is_in_auction

  const isSaleCancellable =
    isMounted &&
    nft?.token_owner &&
    nft.token_owner === address &&
    nft?.is_in_sale

  const isBidCancellable = isUserIsBidder && nft?.is_in_auction

  const getBalance = async (address: `0x${string}` | undefined) => {
    if (address) {
      const ethereum = (window as any).ethereum
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      const provider = new ethers.providers.JsonRpcProvider(
        'https://rpc-mumbai.maticvigil.com/'
      )
      const walletAddress = accounts[0] // first account in MetaMask
      const signer = provider.getSigner(walletAddress)
      const wethcontract = new ethers.Contract(NGM20Address, NGM20ABI, signer)
      const balance = await wethcontract.balanceOf(address)
      let balanceInEth: any = ethers.utils.formatEther(balance)
      balanceInEth = parseFloat(balanceInEth).toFixed(2)
      setAccountBalance(balanceInEth)
    }
  }

  useEffect(() => {
    if (!accountBalance) {
      getBalance(address)
    }
  }, [address, accountBalance])

  const isUserPlacedBid = () => {
    const usersbid: any = bids?.filter((e) => {
      return e.bidder_address === address
    })
    if (usersbid?.length > 0) {
      setIsUserIsBidder(true)
    } else if (usersbid?.length === 0) {
      setIsUserIsBidder(false)
    }
  }
  useEffect(() => {
    if (nft?.is_in_auction) {
      window.setTimeout(isUserPlacedBid, 5000)
    } else {
      // refetch
    }
  })

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
    if (isBidCancellable) {
      setIsCancelBidModalOpen(true)
      return
    }
    if (isCancellable) {
      setIsCancelModalOpen(true)
      return
    }
    if (isSaleCancellable) {
      setIsCancelSaleModalOpen(true)
      return
    }
    if (isMounted && nft?.token_owner === address) {
      router.push(`${router.asPath}/list`)
      return
    }

    nft?.is_in_auction && isUserIsBidder && setIsCancelBidModalOpen(true)
    nft?.is_in_auction === false && setIsOfferModalOpen(true)
    nft?.is_in_auction && !isUserIsBidder && setIsBidModalOpen(true)
  }
  if (nft?.is_in_auction === true) {
    setInterval(() => {
      if (Date.parse(endTime) > Date.now()) {
        const Difference = (Date.parse(endTime) - Date.now()) / 1000
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
        <AvatarCard variant="lg" noCta {...nft} />
        <div className="lg:hidden grid place-items-center">
          <div className=" capitalize border-l-[4px] border-custom_yellow pl-2 ">
            <p className="text-custom_yellow lg:text-[30px] font-play mb-2">
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
            {auction?.min_price && (
              <>
                <p className="text-gray-600 text-sm lg:text-base">
                  Auction Price
                </p>
                <p className="text-white font-bold text-lg lg:text-2xl">
                  {auction?.min_price} ETH
                </p>
              </>
            )}
          </div>
          <div>
            {bids?.length && bids[0].bid_amount && (
              <>
                <p className="text-gray-600 text-sm lg:text-base">
                  Highest Bid
                </p>
                <p className="text-white font-bold text-lg lg:text-2xl">
                  {bids && bids[0].bid_amount} ETH
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
              {nft?.token_owner !== DEAD_ADDRESS && (
                <>
                  <p className="text-gray-600 text-sm lg:text-base">Owner</p>
                  <p className="font-medium text-white text-sm lg:text-base">
                    {/* SalvadorDali */}
                    <a
                      href={`https://mumbai.polygonscan.com/address/${nft?.token_owner}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-sky-500"
                    >
                      {nft?.token_owner &&
                        `${nft.token_owner.substring(
                          0,
                          5
                        )}...${nft.token_owner.substring(
                          nft.token_owner.length - 3
                        )}`}
                    </a>
                  </p>
                </>
              )}
              {nft?.token_owner === DEAD_ADDRESS && (
                <p className="text-white text-sm lg:text-base">
                  This token is burned
                </p>
              )}
            </div>
          </div>
          {nft?.is_in_auction && (
            <div className="grid place-items-center">
              <div className="px-2 lg:px-6 py-2 bg-[#262729] text-[13px] lg:text-[20px] text-white rounded-lg">
                {D < 10 && <>0</>}
                {D} : {H < 10 && <>0</>}
                {H} : {M < 10 && <>0</>}
                {M} : {S < 10 && <>0</>}
                {S}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-2 lg:gap-4">
          {/* <button
            className="btn-secondary w-full md:w-1/2 h-[42px] md:h-16 text-sm lg:text-[21px]"
            onClick={() => setIsBidModalOpen(true)}
          >
            Purchase Now
          </button> */}
          {nft?.token_owner !== DEAD_ADDRESS && (
            <button
              className="w-full lg:min-w-[327px] btn-primary rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
              onClick={handleClick}
            >
              {isCancellable
                ? 'Cancel Auction'
                : isSaleCancellable
                ? 'Cancel Sale'
                : isMounted && nft?.token_owner && nft.token_owner === address
                ? 'Sell'
                : isBidCancellable
                ? 'Cancel Bid'
                : nft?.is_in_auction
                ? 'Place Bid'
                : 'Make Offer'}
            </button>
          )}
        </div>
      </motion.div>
      <AnimatePresence>
        {isBidModalOpen && (
          <PlaceBidModal
            isOpen={isBidModalOpen}
            setIsOpen={setIsBidModalOpen}
            nft={nft}
            accountBalance={accountBalance}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCancelBidModalOpen && (
          <CancelBidModal
            isOpen={isCancelBidModalOpen}
            setIsOpen={setIsCancelBidModalOpen}
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
      <AnimatePresence>
        {isCancelSaleModalOpen && (
          <CancelSaleModal
            isOpen={isCancelSaleModalOpen}
            setIsOpen={setIsCancelSaleModalOpen}
            nft={nft}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProductOverviewSection
