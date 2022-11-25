import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
  useState,
} from 'react'
import { useQuery } from 'react-query'
import { CollectionCardType } from '../interfaces'
import { QUERIES } from '../react-query/constants'
import { getCollections } from '../react-query/queries'
import { fromRightAnimation, opacityAnimation } from '../utils/animations'
import useWindowDimensions from '../utils/hooks/useWindowDimensions'

const carouselData: { img: string; title: string }[] = [
  { img: '/images/live-auction/all_character.png', title: 'all character' },
  { img: '/images/live-auction/apex_legend.png', title: 'apex legend' },
  { img: '/images/live-auction/pubg.png', title: 'pubg' },
  { img: '/images/live-auction/freefire.png', title: 'freefire' },
]

interface CustomButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
}

interface CarouselItemProps extends CollectionCardType {
  currentCardWidth: number
  currentIndex: number
}

const CustomButton: FC<CustomButtonProps> = ({ children, ...props }) => (
  <button
    className="bg-transparent hover:bg-[#3A3A3B] cursor-pointer  p-1 rounded-sm font-inter text-sm 
  lg:text-[22px] hover:text-[#F4F4F4] border border-[#EFEFEF] text-white"
    {...props}
  >
    {children}
  </button>
)

const CarouselItem: FC<CarouselItemProps> = ({
  currentCardWidth,
  currentIndex,
  imageuri,
  contract_address,
  collection_name,
}) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="min-w-[220px]  h-[150px] md:h-[232px] md:min-w-[370px] transition-all
      ease-in-out duration-500 hover:h-[157px] md:hover:h-[261px] md:hover:min-w-[378px] cursor-pointer
      flex justify-center items-center hover:items-end p-4 brightness-50 hover:brightness-100 rounded-lg
      md:text-[25px] hover:md:text-[15px] text-white font-poppins font-medium "
      style={{
        transform: `translateX(-${currentCardWidth * currentIndex}px)`,
        backgroundImage: `url(${imageuri[0]})`,
        backgroundSize: 'cover',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/collections/${contract_address}`)}
    >
      <motion.p
        layout
        className={`capitalize px-1 ${isHovered && 'bg-black opacity-70'}`}
      >
        {collection_name}
      </motion.p>
    </div>
  )
}

const AuctionCarousel: FC = () => {
  const { data } = useQuery(QUERIES.getCollections, () => getCollections(1))
  const { width } = useWindowDimensions()
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClick = (isForward: boolean) => {
    if (isForward) {
      if (currentIndex < carouselData.length + 1)
        setCurrentIndex((prev) => prev + 1)
      else setCurrentIndex(0)
      return
    }
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1)
    else setCurrentIndex(carouselData.length + 1)
  }

  let currentCardWidth: 370 | 220
  if (width < 768) {
    currentCardWidth = 220
  } else {
    currentCardWidth = 370
  }

  const collectionsData: CollectionCardType[] = data?.data?.collections

  return (
    <div>
      <motion.div
        variants={opacityAnimation}
        initial="initial"
        animate="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 1,
          delay: 0.6,
        }}
        className="flex justify-end gap-2 mb-10 mt-0 pr-4 lg:pr-20"
      >
        <CustomButton onClick={() => handleClick(false)}>{'<'}</CustomButton>
        <CustomButton onClick={() => handleClick(true)}>{'>'}</CustomButton>
      </motion.div>
      <div className="h-[165px] md:h-[265px]">
        <motion.div
          className="flex items-center gap-4 md:gap-8 overflow-hidden absolute max-w-full"
          variants={fromRightAnimation}
          initial="initial"
          animate="final"
          transition={{
            ease: 'easeInOut',
            duration: 0.6,
            delay: 1,
          }}
        >
          {collectionsData?.length &&
            collectionsData.map((collection, index) => (
              <CarouselItem
                key={index}
                currentIndex={currentIndex}
                currentCardWidth={currentCardWidth}
                {...collection}
              />
            ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AuctionCarousel
