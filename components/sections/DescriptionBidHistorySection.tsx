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
import { AvatarType, NftContractType } from '../../interfaces'
import { opacityAnimation } from '../../utils/animations'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const tabsData = [
  {
    label: 'Description',
  },
  {
    label: 'Bid History',
  },
]

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

const DescriptionItem: FC<{ name: string; value: string }> = ({
  name,
  value,
}) => (
  <div className="flex justify-between gap-4">
    <p className=" font-bold">{name}</p>
    <p className="">{value}</p>
  </div>
)

const CharacterDescription: FC<{
  nft: AvatarType | undefined
  contractDetails: NftContractType
}> = ({ nft, contractDetails }) => {
  const description = [
    { name: 'Contract Address', value: nft?.contract_address || '' },
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
        {contractDetails?.description}
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
            <DescriptionItem {...item} />
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
const DescriptionBidHistorySection: FC<{
  nft: AvatarType | undefined
  contractDetails: NftContractType | undefined
}> = ({ nft, contractDetails }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)

  const tabsRef = useRef([])

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
        ) : (
          <BidHistory />
        )}
      </div>
    </section>
  )
}

export default DescriptionBidHistorySection
