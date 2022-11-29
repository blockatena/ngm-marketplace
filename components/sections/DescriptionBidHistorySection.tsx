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
import { motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  AuctionType,
  AvatarType,
  BidType,
  NftContractType,
} from '../../interfaces'
import { fromRightAnimation, opacityAnimation } from '../../utils/animations'

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

const LineChart = ({ chartData }) => {
  return <Line data={chartData} />
}

const DescriptionItem: FC<{
  name: string
  value: string
  contract: string
  tokenUri: string
}> = ({ name, value, contract, tokenUri }) => {
  const clickC = () => {
    if (name === 'Contract Address') {
      let url = `https://mumbai.polygonscan.com/token/${contract}`
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
    { name: 'Token ID', value: nft?.token_id || '' },
    { name: 'Token Standard', value: nft?.contract_type || '' },
    { name: 'Blockchain', value: contractDetails?.chain || '' },
  ]

  return (
    <div className="p-4">
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

const BidHistory = () => {
  const avatarData = {
    labels: AvatarData.map((data) => data.year),
    datasets: [
      {
        label: 'All Time Avg. Price',
        data: AvatarData.map((data) => data.allTimePrice),
        borderColor: '#C8B511',
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="lg:w-[800px] 2xl:w-[75%] bg-[#121212] rounded-lg p-4">
      <LineChart chartData={avatarData} />
    </div>
  )
}

const shortenString = (value: string) => {
  let shortenedString = ''
  if (value) {
    shortenedString =
      value?.substring(0, 6) + '...' + value?.substring(value?.length - 4)
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

const onClickAddress = (user) => {
  let url = `https://mumbai.polygonscan.com/address/${user}`
  window.open(url, '_blank')
}

const BidItem: FC<{
  bid: BidType
  auction: AuctionType | undefined
  index: number
}> = ({
  bid,
  index,
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
}> = ({ bids, auction }) => {
  const tableHeadings = [
    { name: 'Bidder Address' },
    { name: 'Bid Amount (WETH)' },
    { name: 'Placed At' },
    // { name: 'Updated At' },
    // { name: 'Contract Address' },
    // { name: 'Token ID' },
    // { name: 'Auction ID' },
  ]
  return (
    <div
      className="font-poppins text-[#D7D7D7] lg:text-lg px-2 lg:px-4 max-h-[300px] lg:overflow-x-hidden
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

const DescriptionBidHistorySection: FC<{
  nft: AvatarType | undefined
  contractDetails: NftContractType | undefined
  bids: BidType[] | undefined
  auction: AuctionType | undefined
}> = ({ nft, contractDetails, bids, auction }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)

  const tabsRef = useRef([])

  const tabsData = [
    {
      label: 'Description',
    },
    {
      label:
        nft?.is_in_auction === true
          ? 'Current Bids'
          : "Top Offers",
    },
    // {
    //   label: 'Bid History',
    // },
  ]

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
        ) : activeTabIndex === 1 ? (
          <CurrentBids bids={bids} auction={auction} />
        ) : (
          <BidHistory />
        )}
      </div>
    </section>
  )
}

export default DescriptionBidHistorySection
