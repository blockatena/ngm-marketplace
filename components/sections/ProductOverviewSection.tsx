import { ethers } from 'ethers'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import AvatarCard from '../../components/AvatarCard'
import { NGM20ABI } from '../../contracts/nftabi'
import {
  AuctionType,
  AvatarType,
  BidType,
  FavouritePostType,
  NftContractType,
  NftType,
  OfferType,
  Sale1155Type,
  SaleType,
  UserType,
} from '../../interfaces'
import { fromLeftAnimation, fromRightAnimation } from '../../utils/animations'
import { DEAD_ADDRESS } from '../../utils/constants'
import useIsMounted from '../../utils/hooks/useIsMounted'
import CancelAuctionModal from '../modals/CancelAuctionModal'
import CancelBidModal from '../modals/CancelBidModal'
import CancelOfferModal from '../modals/CancelOfferModal'
import CancelSaleModal from '../modals/CancelSaleModal'
import MakeOfferModal from '../modals/MakeOfferModal'
import PlaceBidModal from '../modals/PlaceBidModal'
import ViewOwnersModal from '../modals/ViewOwnersModal'
// import ownerImg from '../../public/images/others/owner.png'
import Image from 'next/image'
import { useMutation, useQuery } from 'react-query'
import { addresses } from '../../contracts/addresses'
import { RPC } from '../../contracts/rpc'
import { CheckIfFavoriteType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { checkIfFavorite, getIsUserExist, handleFavourite } from '../../react-query/queries'
import ImageViewModal from '../modals/ImageViewModal'
// product Overview for single nft page
const ProductOverviewSection: FC<{
  nft: AvatarType
  contractDetails: NftContractType | undefined
  bids: BidType[] | undefined
  auction: AuctionType | undefined
  endTime: string
  sale: SaleType | undefined
  offers: OfferType[] | undefined
  setActiveTabIndex: () => void
  owner: UserType | undefined
  nftType?: NftType
  owners?: any[]
  sales?: Sale1155Type[] | undefined
  tokensOwned: number | null
}> = ({
  nft,
  contractDetails,
  endTime,
  bids,
  auction,
  offers,
  setActiveTabIndex,
  owner: tokenOwner,
  nftType,
  owners,
  sales,
  tokensOwned,
}) => {
  const router = useRouter()
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)
  const [isCancelBidModalOpen, setIsCancelBidModalOpen] = useState(false)
  const [isUserIsBidder, setIsUserIsBidder] = useState(false)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const [isCancelSaleModalOpen, setIsCancelSaleModalOpen] = useState(false)
  const [isCancelOfferModalOpen, setIsCancelOfferModalOpen] = useState(false)
  const [isViewOwnersModalOpen, setIsViewOwnersModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { address } = useAccount()
  const isMounted = useIsMounted()
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [D, setD] = useState(0)
  const [H, setH] = useState(0)
  const [M, setM] = useState(0)
  const [S, setS] = useState(0)
  const [accountBalance, setAccountBalance] = useState('')
  const [chainID, setChainID] = useState('')
  const [imageView, setImageView] = useState({ isOpen: false, img: '' })
  const [like, setLikes] = useState(0)

  // const meta_data_url = nft?.nft.meta_data_url || ''

  // check user sales for ERC1155
  const userSales = () => {
    if (nftType !== 'NGM1155') return false
    const fi = sales?.find((a) => {
      if (nftType === 'NGM1155') {
        return a.token_owner === address && a.status == 'started'
      } else return false
    })
    return fi
  }
  const DeployType =
    chainID == '80001' || chainID == '5'
      ? 'DEV'
      : chainID == '137' || chainID == '1'
      ? 'PROD'
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

// condition for cancallable 
  const isCancellable =
    isMounted &&
    nft?.token_owner &&
    nft.token_owner === address &&
    nft?.is_in_auction

    //check if sale cancellable
  const isSaleCancellable =
    nftType === 'NGM1155'
      ? isMounted &&
        // nft?.token_owner &&
        (nft?.token_owner === address ||
          owners?.some((owner) => owner.token_owner === address)) &&
        nft?.is_in_sale &&
        userSales()
      : isMounted &&
        // nft?.token_owner &&
        nft?.token_owner === address &&
        nft?.is_in_sale

  // const isBidCancellable = isUserIsBidder && nft?.is_in_auction

  // filter Sales if any sales by the current user
  const filterSales = () => {
    const fi = sales?.find((a) => {
      return a.token_owner !== address
    })
    if (fi) {
      return true
    } else return false
  }
  const isSecondBtn =
    nftType === 'NGM1155' &&
    sales &&
    owners?.some((owner) => owner.token_owner === address) &&
    filterSales()
  const isShowable =
    (nft?.token_owner !== DEAD_ADDRESS && nft?.is_in_sale) ||
    nft?.is_in_auction ||
    nft?.token_owner === address ||
    owners?.some((owner) => owner.token_owner === address)

  const isSellable =
    isMounted &&
    ((nft?.token_owner && nft.token_owner === address) ||
      owners?.some((owner) => owner.token_owner === address))

  // get user balance
  const getBalance = async (address: `0x${string}` | undefined) => {
    if (!address || !NGM20Address) return
    ;(await address) && NGM20Address
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    const provider = new ethers.providers.JsonRpcProvider(
      chainID == '80001'
        ? RPC.mumbai
        : chainID == '5'
        ? RPC.goerli
        : chainID == '137'
        ? RPC.polygon
        : chainID == '1'
        ? RPC.ethereum
        : ''
    )
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    const wethcontract = new ethers.Contract(NGM20Address, NGM20ABI, signer)
    const balance = await wethcontract.balanceOf(address)
    let balanceInEth: any = ethers.utils.formatEther(balance)
    balanceInEth = parseFloat(balanceInEth).toFixed(7)
    setAccountBalance(balanceInEth)
  }
  useEffect(() => {
    setChainID(contractDetails?.chain?.id)
  }, [contractDetails])
  const filters = () => {
    const fi = offers?.find((a) => {
      if (nftType === 'NGM1155') {
        return a.offer_person_address === address && a.status == 'started'
      } else {
        return a.offer_person_address === address && a.offer_status == 'started'
      }
    })
    return fi
  }
  // for ERC1155 , cancel button
  const isSecondCancellable = isSecondBtn && filters()
  const filterAuction = () => {
    const fi = bids?.find((a) => {
      return a.bidder_address === address && a.status == 'started'
    })
    return fi
  }

  useEffect(() => {
    if (!accountBalance) {
      getBalance(address)
    }
  })

  //  Check fs User Placed Bid
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
      //
    }
  })

  // handle cancel button
  const isCancelBtn = () => {
    if (filters() || filterAuction()) return true
    return false
  }
  let displayTime = nft?.is_in_auction || nft?.is_in_sale
  const handleClick = (event: string) => {
    // secondOk - event : for Second Btn is Available for offer { ERC1155 }

    // secondCancel - event : for second btn is active for cancal { ERC1155 }

    // cancel - event : for second button is actice for cancel

    if (isSecondBtn && event === 'secondOk') {
      return setIsOfferModalOpen(true)
    }

    if (isSecondBtn && event === 'secondCancel') {
      return setIsCancelOfferModalOpen(true)
    }
    if (isCancellable) {
      setIsCancelModalOpen(true)
      return
    }
    if (isSaleCancellable) {
      setIsCancelSaleModalOpen(true)
      return
    }
    if (isSellable) {
      router.push(`${router.asPath}/list`)
      return
    }

    if (filters() && event === 'cancel') {
      setIsCancelOfferModalOpen(true)
      return
    }

    if (filterAuction() && event === 'cancel') {
      setIsCancelBidModalOpen(true)
      return
    }
    nft?.is_in_auction && filterAuction() && setIsBidModalOpen(true)
    // nft?.is_in_auction && isUserIsBidder && setIsCancelBidModalOpen(true)
    nft?.is_in_auction === false && setIsOfferModalOpen(true)
    nft?.is_in_auction && !isUserIsBidder && setIsBidModalOpen(true)
  }
  if (nft?.is_in_auction || nft?.is_in_sale) {
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
  // const explorer =
  //   CHAINID === '80001' ? 'mumbai.polygonscan.com' : 'polygonscan.com'

  // On click address
  const onClickAddress = (owner: string) => {
    let profile = owner === address ? `/profile` : `/profile/${owner}`
    router.push(profile)
  }

    const [userExist, setUserExist] = useState(false)

    const { data, isSuccess } = useQuery(
      [QUERIES.getIsUserExist, address],
      () => getIsUserExist(address)
    )

    useEffect(() => {
      address && isSuccess && setUserExist(data?.data)
      setLikes(nft?.nft_popularity?.likes>0?nft?.nft_popularity?.likes:0)
    }, [data, address, isSuccess, nft])

  const {
    mutate: checkIfFav,
    data: checkIfFavData,
    isSuccess: checkIfFavSuccess,
  } = useMutation(checkIfFavorite)

  useEffect(() => {
    checkIfFavSuccess && setIsLiked(checkIfFavData?.data?.isFavourite?true:false)
  }, [checkIfFavData, checkIfFavSuccess])


  useEffect(() => {
    let body: CheckIfFavoriteType = {
      contract_address: nft?.contract_address,
      token_id: parseInt(nft?.token_id),
      nft_type: nftType == 'NGM1155' ? 'NGM1155' : 'NGM721',
      favourite_kind: 'NFTS',
      wallet_address: address,
    }
    nft && address && checkIfFav(body)
  }, [checkIfFav, address, nft, nftType])
      
  // Favourite

        const { mutate: handleFav } = useMutation(handleFavourite)
      const handleLike = async () => {
        await setIsLiked(!isLiked)
        await setLikes((prev: number) => (!isLiked ? prev + 1 :prev==0?0: prev - 1))
        let data: FavouritePostType = {
          contract_address: nft?.contract_address,
          token_id: parseInt(nft?.token_id),
          nft_type: nftType == 'NGM1155' ? 'NGM1155' : 'NGM721',
          favourite_kind: 'NFTS',
          wallet_address: address,
          action: isLiked ? 'REMOVE' : 'ADD',
        }
        nft?.contract_address && address && handleFav(data)
      }




  return (
    <section className="flex flex-col xl:flex-row gap-4 lg:gap-4 2xl:gap-32 xl:justify-between p-0">
      <motion.div
        className="flex justify-between lg:pl-4"
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
        <AvatarCard variant="lg" noCta {...nft} setImageView={setImageView} />
        <div className="lg:hidden grid place-items-center pl-4">
          <div className=" capitalize border-l-[4px] border-custom_yellow pl-2 ">
            <p className="text-custom_yellow lg:text-[30px] font-play mb-2">
              {contractDetails?.collection_name}
            </p>
            <p className="text-white text-2xl lg:text-[49px] font-josefin">
              {nft?.meta_data?.name}{' '}
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="p-4 flex flex-col justify-evenly lg:pl-4 2xl:pl-12 gap-4 xl:gap-0 lg:min-w-[500px]"
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
          <div className="flex justify-between">
            <p className="text-custom_yellow lg:text-[30px] font-play mb-2">
              {contractDetails?.collection_name}
            </p>
            {tokensOwned && (
              <p className="text-white">
                You Own:{' '}
                <span className="text-custom_yellow">{tokensOwned}</span>
              </p>
            )}
          </div>

          <p className="text-white text-2xl lg:text-[49px] font-josefin leading-[55px]">
            {nft?.meta_data?.name}{' '}
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
                  {nftType === 'NGM721PSI' && (
                    <p className="text-gray-600 text-sm lg:text-base">Owner</p>
                  )}
                  {nftType === 'NGM1155' && (
                    <p className="text-gray-600 text-sm lg:text-base">
                      <span
                        onClick={() => setIsViewOwnersModalOpen(true)}
                        className="cursor-pointer hover:text-custom_yellow"
                      >
                        {`${owners?.length} Owner(s)`}
                      </span>
                    </p>
                  )}
                  <p className="font-medium text-white text-sm lg:text-base">
                    {/* SalvadorDali */}
                    <a
                      // href={`https://mumbai.polygonscan.com/address/${nft?.token_owner}`}
                      onClick={() => onClickAddress(nft?.token_owner ?? '')}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-sky-500 cursor-pointer"
                    >
                      {nft?.token_owner && nft?.token_owner === address
                        ? 'You'
                        : tokenOwner?.username
                        ? tokenOwner.username
                        : nft?.token_owner
                        ? `${nft.token_owner.substring(
                            0,
                            5
                          )}...${nft.token_owner.substring(
                            nft.token_owner.length - 3
                          )}`
                        : ''}
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
          <div className="h-10 p-2 lg:p-4 mt-2">
            <div className="flex gap-2">
              {checkIfFavSuccess && userExist && (
                <Image
                  src={
                    isLiked
                      ? '/images/icons/liked.svg'
                      : '/images/icons/like.svg'
                  }
                  alt="like"
                  width="20px"
                  height="18px"
                  onClick={() => handleLike()}
                  className="cursor-pointer justify-end"
                />
              )}
              <p className="text-white text-xl">{`${like ? like : 0} Likes`}</p>
            </div>
          </div>
          {displayTime && (
            <div className="relative hidden sm:grid place-items-center">
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
        <div>
          {displayTime && (
            <div className="justify-start sm:hidden grid place-items-center">
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
          {isShowable && (
            <button
              className="w-full lg:min-w-[327px] btn-primary rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
              onClick={() => handleClick('ok')}
            >
              {isCancellable
                ? 'Cancel Auction'
                : isSaleCancellable
                ? 'Cancel Sale'
                : isSellable
                ? 'Sell'
                : filters()
                ? 'Update Offer'
                : filterAuction()
                ? 'Update Bid'
                : nft?.is_in_auction
                ? 'Place Bid'
                : nft?.is_in_sale
                ? 'Make Offer'
                : ''}
            </button>
          )}
          {(isCancelBtn() || isSecondBtn) && (
            <>
              <button
                className="w-full lg:min-w-[327px] btn-secondary rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
                onClick={() =>
                  isSecondCancellable
                    ? handleClick('secondCancel')
                    : isSecondBtn
                    ? handleClick('secondOk')
                    : handleClick('cancel')
                }
              >
                {filters()
                  ? 'Cancel Offer'
                  : filterAuction()
                  ? 'Cancel Bid'
                  : isSecondBtn
                  ? 'Make Offer'
                  : 'Cancel Offer'}
              </button>
            </>
          )}
        </div>
      </motion.div>
      <AnimatePresence>
        {isBidModalOpen && (
          <PlaceBidModal
            status={filterAuction() ? 'update' : 'place'}
            isOpen={isBidModalOpen}
            setIsOpen={setIsBidModalOpen}
            nft={nft}
            accountBalance={accountBalance}
            chainID={chainID}
            nftType={nftType}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCancelBidModalOpen && (
          <CancelBidModal
            isOpen={isCancelBidModalOpen}
            setIsOpen={setIsCancelBidModalOpen}
            nft={nft}
            chainID={chainID}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOfferModalOpen && (
          <MakeOfferModal
            isOpen={isOfferModalOpen}
            setIsOpen={setIsOfferModalOpen}
            nft={nft}
            accountBalance={accountBalance}
            chainID={chainID}
            nftType={nftType}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCancelModalOpen && (
          <CancelAuctionModal
            setActiveTabIndex={setActiveTabIndex}
            isOpen={isCancelModalOpen}
            setIsOpen={setIsCancelModalOpen}
            nft={nft}
            chainID={chainID}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCancelSaleModalOpen && (
          <CancelSaleModal
            setActiveTabIndex={setActiveTabIndex}
            isOpen={isCancelSaleModalOpen}
            setIsOpen={setIsCancelSaleModalOpen}
            nft={nft}
            chainID={chainID}
            nftType={nftType}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCancelOfferModalOpen && (
          <CancelOfferModal
            isOpen={isCancelOfferModalOpen}
            setIsOpen={setIsCancelOfferModalOpen}
            contract_address={nft?.contract_address}
            token_id={nft?.token_id}
            address={address}
            caller={address}
            chainID={chainID}
            nftType={nftType}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isViewOwnersModalOpen && (
          <ViewOwnersModal
            isOpen={isViewOwnersModalOpen}
            setIsOpen={setIsViewOwnersModalOpen}
            owners={owners}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {imageView.isOpen && (
          <ImageViewModal
            isOpen={imageView.isOpen}
            setIsOpen={setImageView}
            img={imageView.img}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProductOverviewSection
