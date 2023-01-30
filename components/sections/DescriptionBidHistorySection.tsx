// @ts-nocheck
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import {
  ActivityType,
  AuctionType,
  AvatarType,
  BidType,
  ListingType,
  NftContractType,
  OfferType,
  SaleType,
} from '../../interfaces'
import { fromRightAnimation, opacityAnimation } from '../../utils/animations'
import AcceptOfferModal from '../modals/AcceptOfferModal'
import CancelOfferModal from '../modals/CancelOfferModal'
const CHAINID = process.env.NEXT_PUBLIC_CHAIN_ID || ''
const explorer =
  CHAINID === '80001' ? 'mumbai.polygonscan.com' : 'polygonscan.com'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const AvatarData = [
  {
    id: 1,
    year: '15/9',
    allTimePrice: 0.5,
  },
  {
    id: 2,
    year: '16/9',
    allTimePrice: 1,
  },
  {
    id: 3,
    year: '17/9',
    allTimePrice: 0.5,
  },
  {
    id: 4,
    year: '18/9',
    allTimePrice: 2,
  },
  {
    id: 5,
    year: '19/9',
    allTimePrice: 2.5,
  },
]

const DescriptionItem: FC<{
  name: string
  value: string
  contract: string
  tokenUri: string
}> = ({ name, value, contract, tokenUri }) => {
  const clickC = () => {
    if (name === 'Contract Address') {
      let url = `https://${explorer}/token/${contract}`
      window.open(url, '_blank')
    } else if (name === 'Token ID') {
      let url = tokenUri
      window.open(url, '_blank')
    }
  }
  return (
    <>
      <div className="flex justify-between gap-4">
        <p className=" font-bold">{name}</p>
        <p
          className={
            name === 'Contract Address' || name === 'Token ID'
              ? 'cursor-pointer underline hover:text-sky-500'
              : ''
          }
          onClick={() => {
            clickC()
          }}
        >
          {value}
        </p>
      </div>
    </>
  )
}

const CharacterDescription: FC<{
  nft: AvatarType | undefined
  contractDetails: NftContractType
}> = ({ nft, contractDetails }) => {
  const address =
    nft?.contract_address &&
    `${nft?.contract_address?.substring(
      0,
      6
    )}...${nft?.contract_address?.substring(nft?.contract_address?.length - 4)}`

  const description = [
    { name: 'Contract Address', value: address || '' },
    {
      name: 'Token ID',
      value: nft?.token_id === 0 ? '0' : nft?.token_id || '',
    },
    { name: 'Total Supply', value: nft?.number_of_tokens || 1 },
    { name: 'Token Standard', value: nft?.contract_type || '' },
    { name: 'Chain ID', value: contractDetails?.chain?.id || '' },
    { name: 'Network', value: contractDetails?.chain?.name || '' },
  ]

  return (
    <div className="py-4 px-0">
      <motion.p
        className="font-poppins text-[#D7D7D7] max-w-[885px] mb-4"
        variants={opacityAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.4,
          delay: 0.1,
        }}
      >
        {nft?.meta_data?.description}
      </motion.p>
      <div className="max-w-[349px] text-[#E7ECF2] font-poppins flex flex-col gap-6">
        {description.map((item, index) => (
          <motion.div
            key={index}
            variants={opacityAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.6,
              delay: index * 0.2,
            }}
          >
            <DescriptionItem
              {...item}
              contract={nft?.contract_address}
              tokenUri={nft?.meta_data_url}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const Activity: FC<{
  activity: ActivityType
  onClickAddress: () => void
}> = ({ activity, onClickAddress }) => {
  // activity = activity.activity
  const tableHeadings = [
    { name: 'Type' },
    { name: 'Price' },
    { name: 'Quantity' },
    { name: 'From' },
    { name: 'To' },
    { name: 'Time' },
  ]
  return (
    // <div className="lg:w-[800px] 2xl:w-[75%] bg-[#121212] rounded-lg p-4">
    //   {/* <LineChart chartData={avatarData} /> */}
    // </div>
    <>
      <div
        className="font-poppins text-[#D7D7D7] lg:text-lg px-0 max-h-[300px] lg:overflow-x-hidden
    overflow-y-scroll scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021]"
      >
        {activity?.length && (
          <table className="w-full overflow-x-auto text-center">
            <thead>
              <tr className="h-16">
                {tableHeadings.map((heading) => (
                  <th key={heading.name} className="h-16">
                    {heading.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activity?.length &&
                activity.map((activity, index) => {
                  return (
                    <ActivityItem
                      key={index}
                      activity={activity}
                      index={index}
                      onClickAddress={onClickAddress}
                    />
                  )
                })}
              {activity?.length === 0 && (
                // <tr>
                <td>Activites</td>
                // </tr>
              )}
            </tbody>
          </table>
        )}
        {activity?.length === 0 && (
          // <tr>
          <p className="text-center b text-3xl p-12">- No Activities yet -</p>
          // </tr>
        )}
      </div>
    </>
  )
}

const shortenString = (value: string) => {
  let shortenedString = ''
  if (value) {
    shortenedString =
      value?.substring(0, 5) + '...' + value?.substring(value?.length - 5)
  }
  return shortenedString
}

// const BidInfo: FC<{ name: string; value: string | number }> = ({
//   name,
//   value,
// }) => {
//   return (
//     <div className="flex justify-between my-2">
//       <p className="font-bold">{name}</p>
//       {name === 'Bidder Address' || name === 'Contract Address' ? (
//         <p>
//           {value &&
//             `${value?.substring(0, 6)}...${value?.substring(
//               value?.length - 4
//             )}`}
//         </p>
//       ) : (
//         <p className="">{value}</p>
//       )}
//     </div>
//   )
// }

const onClickTx = (hash) => {
  let url = `https://${explorer}/tx/${hash}`
  window.open(url, '_blank')
}

const BidItem: FC<{
  bid: BidType
  auction: AuctionType | undefined
  index: number
  onClickAddress: () => void
}> = ({
  bid,
  index,
  onClickAddress,
  // auction,
}) => {
  let timePlaced = ''
  // let timeUpdated = ''

  if (bid?.createdAt) {
    let d = new Date(bid.createdAt)
    timePlaced = d.toLocaleString()
  }

  if (bid?.updatedAt) {
    // let d = new Date(bid.updatedAt)
    // timeUpdated = d.toLocaleString()
  }

  let bgColor = 'bg-transparent'
  if (index % 2 === 0) {
    bgColor = 'bg-[#070707]'
  }

  const bidData = [
    { name: 'Bidder Address', value: shortenString(bid?.bidder_address) },
    { name: 'Bid Amount', value: bid?.bid_amount },
    { name: 'Quantity', value: 1 },
    { name: 'Placed At', value: timePlaced },
    // { name: 'Updated At', value: timeUpdated },
    // { name: 'Contract Address', value: shortenString(bid?.contract_address) },
    // { name: 'Token ID', value: bid?.token_id },
    // { name: 'Auction ID', value: bid?.auction_id },
  ]

  return (
    <motion.tr
      className={`${bgColor} font-poppins text-[#D7D7D7] lg:text-lg py-2 h-16`}
      variants={fromRightAnimation}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      transition={{
        ease: 'easeInOut',
        duration: 0.4,
        delay: 0.1 * index,
      }}
    >
      {bidData?.map((bidData, index) => (
        <td
          key={index}
          className={
            bidData?.name === 'Bidder Address'
              ? 'cursor-pointer underline hover:text-sky-500'
              : 'h-16'
          }
          onClick={() => onClickAddress(bid?.bidder_address)}
        >
          {bidData?.value}
        </td>
      ))}
    </motion.tr>
  )
}

const CurrentBids: FC<{
  bids: BidType[]
  auction: AuctionType | undefined
  onClickAddress: () => void
}> = ({ bids, auction, onClickAddress }) => {
  const tableHeadings = [
    { name: 'Bidder Address' },
    { name: 'Bid Amount (WETH)' },
    { name: 'Quantity' },
    { name: 'Placed At' },
    // { name: 'Updated At' },
    // { name: 'Contract Address' },
    // { name: 'Token ID' },
    // { name: 'Auction ID' },
  ]
  return (
    <div
      className="font-poppins text-[#D7D7D7] lg:text-lg px-0 max-h-[300px] lg:overflow-x-hidden
    overflow-y-scroll scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021]"
    >
      {bids?.[0] && (
        <table className="w-full overflow-x-auto text-center">
          <thead>
            <tr className="h-16">
              {tableHeadings.map((heading) => (
                <th key={heading.name} className="h-16">
                  {heading.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bids?.length &&
              bids.map((bid, index) => {
                return (
                  <BidItem
                    key={index}
                    bid={bid}
                    auction={auction}
                    index={index}
                    onClickAddress={onClickAddress}
                  />
                )
              })}
            {bids?.length === 0 && (
              // <tr>
              <td>Bids</td>
              // </tr>
            )}
          </tbody>
        </table>
      )}
      {bids?.length === 0 && (
        // <tr>
        <p className="text-center b text-3xl p-12">- No Bids yet -</p>
        // </tr>
      )}
      {!auction && (
        // <tr>
        <p className="text-center b text-3xl p-12">
          -The NFT don&lsquo;t have any offers-
        </p>
        // </tr>
      )}
    </div>
  )
}

const OfferItem: FC<{
  offer: OfferType
  index: number
  ifOwner: string
  handleOffers: () => void
  onClickAddress: () => void
}> = ({ offer, index, ifOwner, handleOffers, onClickAddress }) => {
  let timePlaced = ''

  if (offer?.createdAt) {
    let d = new Date(offer.createdAt)
    timePlaced = d.toLocaleString()
  }

  let bgColor = 'bg-transparent'
  if (index % 2 === 0) {
    bgColor = 'bg-[#070707]'
  }
  const offerData = ifOwner
    ? [
        {
          name: 'Buyer Address',
          value: shortenString(offer?.offer_person_address),
        },
        {
          name: 'Bid Amount',
          value: offer?.offer_price || offer?.per_unit_price,
        },
        { name: 'Quantity', value: offer?.number_of_tokens },
        { name: 'Made At', value: timePlaced },
        { name: 'cancel', value: 'CANCEL' },
        { name: 'accept', value: 'ACCEPT' },
      ]
    : [
        {
          name: 'Buyer Address',
          value: shortenString(offer?.offer_person_address),
        },
        {
          name: 'Bid Amount',
          value: offer?.offer_price || offer?.per_unit_price,
        },
        { name: 'Quantity', value: offer?.number_of_tokens },
        { name: 'Made At', value: timePlaced },
      ]

  return (
    <>
      <motion.tr
        className={`${bgColor} font-poppins text-[#D7D7D7] lg:text-lg py-2 h-16`}
        variants={fromRightAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.4,
          delay: index < 6 ? 0.1 * index : 0,
        }}
      >
        {offerData?.map((offerData, index) => (
          <td
            key={index}
            className={
              offerData?.name === 'Buyer Address'
                ? 'cursor-pointer underline hover:text-sky-500'
                : offerData?.name === 'cancel'
                ? 'cursor-pointer hover:text-red-500'
                : offerData?.name === 'accept'
                ? 'cursor-pointer  hover:text-yellow-500'
                : 'h-16'
            }
            onClick={() =>
              offerData?.name === 'Buyer Address'
                ? onClickAddress(offer?.offer_person_address)
                : offerData?.name === 'cancel'
                ? handleOffers(
                    offer?.offer_person_address,
                    offer?.contract_address,
                    offer?.token_id,
                    'cancel'
                  )
                : offerData?.name === 'accept'
                ? handleOffers(
                    offer?.offer_person_address,
                    offer?.contract_address,
                    offer?.token_id,
                    'accept'
                  )
                : ''
            }
          >
            {offerData?.value}
          </td>
        ))}
      </motion.tr>
    </>
  )
}

const ActivityItem: FC<{
  activity: ActivityType
  index: number
  onClickAddress: () => void
}> = ({ activity, index, onClickAddress }) => {
  let timePlaced = ''
  const { address } = useAccount()
  if (activity?.createdAt) {
    let d = new Date(activity.createdAt)
    timePlaced = d.toLocaleString()
  }

  let bgColor = 'bg-transparent'
  if (index % 2 === 0) {
    bgColor = 'bg-[#070707]'
  }

  const isTo = activity?.to !== '----'
  const isTx = activity?.transaction_hash
  const price = activity?.price

  const isInitial = activity?.event === '-'

  const activityData = [
    {
      name: 'Type',
      value: activity?.event,
    },
    {
      name: 'Price',
      value:
        activity?.event === 'Transfer'
          ? `${price} ETH`
          : activity?.event === ' '
          ? ' '
          : `${activity?.price} ETH`,
    },
    {
      name: 'Quantity',
      value: activity?.quantity,
    },
    {
      name: 'From',
      value:
        activity?.from === address
          ? 'You'
          : activity?.to === ' '
          ? ' '
          : shortenString(activity?.from),
    },
    {
      name: 'To',
      value:
        activity?.to !== '----'
          ? activity?.to === address
            ? 'You'
            : activity?.to === ' '
            ? ' '
            : shortenString(activity?.to)
          : '-',
    },
    { name: 'Time', value: timePlaced === 'Invalid Date' ? ' ' : timePlaced },
  ]

  return (
    <motion.tr
      className={`${bgColor} font-poppins text-[#D7D7D7] lg:text-lg py-2 h-16`}
      variants={opacityAnimation}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      transition={{
        ease: 'easeInOut',
        duration: 0.4,
        delay: index < 6 ? 0.1 * index : 0,
      }}
    >
      {activityData?.map((activityData, index) => (
        <td
          key={index}
          className={
            isInitial
              ? 'h-16'
              : activityData?.name === 'From'
              ? 'cursor-pointer underline hover:text-sky-500'
              : (isTo && activityData?.name === 'To') ||
                (isTx && activityData?.name === 'Time')
              ? 'cursor-pointer underline hover:text-sky-500'
              : 'h-16'
          }
          onClick={() =>
            activityData?.name === 'From'
              ? onClickAddress(activity?.from)
              : isTo && activityData?.name === 'To'
              ? onClickAddress(activity?.to)
              : isTx && activityData?.name === 'Time'
              ? onClickTx(activity?.transaction_hash)
              : ''
          }
        >
          {activityData?.value}
        </td>
      ))}
    </motion.tr>
  )
}

const CurrentOffers: FC<{
  offers: OfferType[] | undefined
  sale: SaleType | undefined
  address: string
  setActiveTabIndex: () => void
  onClickAddress: () => void
  chainID: any
  nftType: any
  owners: any[]
}> = ({
  offers,
  sale,
  address,
  setActiveTabIndex,
  onClickAddress,
  chainID,
  nftType,
  owners,
}) => {
  const [isCancelOfferModalOpen, setIsCancelOfferModalOpen] = useState(false)
  const [isAcceptOfferModalOpen, setIsAcceptOfferModalOpen] = useState(false)
  const [offer_person_address, setoffer_person_address] = useState('')
  const [contract_address, setContract_address] = useState('')
  const [token_id, setToken_id] = useState('')
  const ifOwner =
    sale?.token_owner === address ||
    owners?.some((owner) => owner.token_owner === address)
  const tableHeadings = ifOwner
    ? [
        { name: 'Buyer Address' },
        { name: 'Offer Amount (WETH)' },
        { name: 'Quantity' },
        { name: 'Made At' },
        { name: 'Cancel' },
        { name: 'Accept' },
      ]
    : [
        { name: 'Buyer Address' },
        { name: 'Offer Amount (WETH)' },
        { name: 'Quantity' },
        { name: 'Made At' },
      ]

  const handleOffers = (
    offer_person_address,
    contract_address,
    token_id,
    event
  ) => {
    setoffer_person_address(offer_person_address)
    setContract_address(contract_address)
    setToken_id(token_id)
    if (ifOwner && event === 'accept') {
      setIsAcceptOfferModalOpen(true)
      return
    }
    if (ifOwner && event === 'cancel') {
      setIsCancelOfferModalOpen(true)
      return
    }
  }
  return (
    <div
      className="font-poppins text-[#D7D7D7] lg:text-lg px-0 max-h-[300px] lg:overflow-x-hidden
    overflow-y-scroll scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021]"
    >
      {offers?.length && (
        <table className="w-full overflow-x-auto text-center">
          <thead>
            <tr className="h-16">
              {tableHeadings.map((heading) => (
                <th key={heading.name} className="h-16">
                  {heading.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {offers?.length &&
              offers.map((offer, index) => {
                return (
                  <OfferItem
                    handleOffers={handleOffers}
                    key={index}
                    offer={offer}
                    index={index}
                    ifOwner={ifOwner}
                    onClickAddress={onClickAddress}
                  />
                )
              })}
            {offers?.length === 0 && (
              // <tr>
              <p className="text-center b text-3xl p-12">- No offers yet -</p>
              // </tr>
            )}
          </tbody>
        </table>
      )}
      {offers?.length === 0 && (
        // <tr>
        <p className="text-center b text-3xl p-12">- No Offers yet -</p>
        // </tr>
      )}
      {!sale && (
        // <tr>
        <p className="text-center b text-3xl p-12">-NFT not on sale-</p>
        // </tr>
      )}
      <AnimatePresence>
        {isCancelOfferModalOpen && (
          <CancelOfferModal
            isOpen={isCancelOfferModalOpen}
            setIsOpen={setIsCancelOfferModalOpen}
            contract_address={contract_address}
            token_id={token_id}
            address={offer_person_address}
            caller={address}
            chainID={chainID}
            nftType={nftType}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isAcceptOfferModalOpen && (
          <AcceptOfferModal
            setActiveTabIndex={setActiveTabIndex}
            isOpen={isAcceptOfferModalOpen}
            setIsOpen={setIsAcceptOfferModalOpen}
            contract_address={contract_address}
            token_id={token_id}
            offer_address={offer_person_address}
            chainID={chainID}
            nftType={nftType}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const ListingItem: FC<{
  index: number
  sale: ListingType
}> = ({ index, sale }) => {
  let timeCreated = ''
  let endTime
  if (sale?.createdAt) {
    let d = new Date(sale.createdAt)
    timeCreated = d.toLocaleString()
  }
  if (sale?.end_date) endTime = new Date(sale.end_date).toLocaleString()

  let bgColor = 'bg-transparent'
  if (index % 2 === 0) {
    bgColor = 'bg-[#070707]'
  }

  const activityData = [
    {
      name: 'Token Owner',
      value: shortenString(sale?.token_owner),
    },
    {
      name: 'Date Created',
      value: timeCreated,
    },
    {
      name: 'End Date',
      value: endTime,
    },
    {
      name: 'Unit Price',
      value: sale?.per_unit_price,
    },
    { name: 'Quantity', value: sale?.number_of_tokens },
  ]

  return (
    <motion.tr
      className={`${bgColor} font-poppins text-[#D7D7D7] lg:text-lg py-2 h-16`}
      variants={opacityAnimation}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      transition={{
        ease: 'easeInOut',
        duration: 0.4,
        delay: index < 6 ? 0.1 * index : 0,
      }}
    >
      {activityData?.map((activityData, index) => (
        <td key={index} className="h-16">
          {activityData?.value}
        </td>
      ))}
    </motion.tr>
  )
}

const Listings: FC<{
  sales: ListingType[]
}> = ({ sales }) => {
  const tableHeadings = [
    { name: 'Token Owner' },
    { name: 'Date Created' },
    { name: 'End Date' },
    { name: 'Unit Price' },
    { name: 'Quantity' },
  ]
  return (
    <>
      <div
        className="font-poppins text-[#D7D7D7] lg:text-lg px-0 max-h-[300px] lg:overflow-x-hidden
    overflow-y-scroll scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021]"
      >
        {sales?.length && (
          <table className="w-full overflow-x-auto text-center">
            <thead>
              <tr className="h-16">
                {tableHeadings.map((heading) => (
                  <th key={heading.name} className="h-16">
                    {heading.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sales?.length
                ? sales.map((sale, index) => {
                    return <ListingItem key={index} sale={sale} index={index} />
                  })
                : ''}
            </tbody>
          </table>
        )}
        {sales?.length === 0 && (
          <p className="text-center b text-3xl p-12">- No Listings yet -</p>
        )}
      </div>
    </>
  )
}
const DescriptionBidHistorySection: FC<{
  nft: AvatarType | undefined
  contractDetails: NftContractType | undefined
  bids: BidType[] | undefined
  auction: AuctionType | undefined
  offers: OfferType[] | undefined
  sale: SaleType | undefined
  activity: ActivityType | undefined
  currentTab: any
  owners?: any[]
  nftType?: any
  handleTabs: () => void
  state: () => void
  states: () => void
  sales?: ListingType[]
}> = ({
  nft,
  contractDetails,
  bids,
  auction,
  offers,
  sale,
  activity,
  currentTab,
  owners,
  nftType,
  handleTabs,
  state,
  states,
  sales,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)
  const { address } = useAccount()
  const router = useRouter()
  const tabsData = [
    {
      label: 'Description',
    },
    {
      label: 'Activity',
    },
    {
      label:
        nft?.is_in_auction === true
          ? 'Current Bids'
          : nft?.is_in_sale
          ? 'Current Offers'
          : '',
    },
    {
      label: 'Listings',
    },

    // {
    //   label: 'Bid History',
    // },
  ]

  const onClickAddress = (user) => {
    let profile = user === address ? `/profile` : `/profile/${user}`
    router.push(profile)
  }

  const tabsRef = useRef([])

  useEffect(() => {
    if (activeTabIndex === 1) {
      state()
    } else {
      states()
    }
  })

  useEffect(() => {
    if (currentTab === 0) {
      setActiveTabIndex(0)
      handleTabs()
    }
  }, [currentTab, handleTabs])

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex]
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0)
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0)
    }

    setTabPosition()
    window.addEventListener('resize', setTabPosition)

    return () => window.removeEventListener('resize', setTabPosition)
  }, [activeTabIndex])

  return (
    <section>
      <div className="relative">
        <div className="flex space-x-3 border-b border-[#464646] gap-8 lg:gap-36">
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                ref={(el) => (tabsRef.current[idx] = el)}
                onClick={() => setActiveTabIndex(idx)}
                className="pt-2 pb-3 text-[#f6f6f6] font-poppins font-medium lg:text-[22px]"
              >
                {tab.label}
              </button>
            )
          })}
        </div>
        <span
          className="absolute bottom-0 block h-1 bg-custom_yellow transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className="py-4">
        {activeTabIndex === 0 ? (
          <CharacterDescription nft={nft} contractDetails={contractDetails} />
        ) : activeTabIndex === 2 ? (
          nft?.is_in_sale || offers ? (
            <CurrentOffers
              offers={offers}
              sale={sale}
              address={address}
              setActiveTabIndex={setActiveTabIndex}
              onClickAddress={onClickAddress}
              chainID={contractDetails?.chain?.id}
              nftType={nftType}
              owners={owners}
            />
          ) : (
            <CurrentBids
              bids={bids}
              auction={auction}
              onClickAddress={onClickAddress}
            />
          )
        ) : activeTabIndex === 1 ? (
          <Activity
            activity={activity}
            address={address}
            onClickAddress={onClickAddress}
          />
        ) : activeTabIndex === 3 ? (
          <Listings sales={sales} />
        ) : (
          ''
        )}
      </div>
    </section>
  )
}

export default DescriptionBidHistorySection
