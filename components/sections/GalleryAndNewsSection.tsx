import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useQuery } from 'react-query'
import type { CollectionCardType } from '../../interfaces'
import news_img_1 from '../../public/images/news/news_img_1.svg'
import news_img_2 from '../../public/images/news/news_img_2.svg'
import { QUERIES } from '../../react-query/constants'
import { getCollections } from '../../react-query/queries'
import {
  fromBottomAnimation,
  fromLeftAnimation,
  fromRightAnimation,
} from '../../utils/animations'
import { CONTAINER_PADDING } from '../../utils/constants'
import getDescription from '../../utils/getDescription'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

interface GalleryCardProps extends CollectionCardType {
  // title: string
  // imgUrl: any
  // behindImgUrl: any
}


const cardVariants = {
  initial: {
    opacity: 0,
    transform: 'translateY(100%)',
  },
  final: (index: number) => ({
    transition: {
      delay: 0.6 + index * 0.2,
      ease: 'easeInOut',
    },
    opacity: 1,
    transform: 'translateY(0%)',
  }),
}

const placeholderImg = '/images/collections/placeholder.jpg'

const GalleryCard: React.FC<
  // GalleryCardProps & { onClick: () => void; index: number }
  GalleryCardProps & { index: number }
> = ({ imageuri, contract_address, collection_name, index }) => {
  const router = useRouter()
  return (
    <motion.div
      className="relative cursor-pointer w-[297px] mx-auto h-[425px] hover:z-20"
      onClick={() => router.push(`/collections/${contract_address}`)}
      custom={index}
      variants={cardVariants}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
    >
      <div className="w-full h-full flex flex-col pt-2 bg-white/[0.1] rotate-3 rounded-lg border-[3px] border-[#A4950C] absolute top-0 left-3">
        <div className="p-2 h-full w-full">
          <div className="mx-auto w-full h-full relative">
            {/* <Image src={behindImgUrl} alt="behind image" /> */}
            {imageuri?.[1] ? (
              <Image
                loader={() => imageuri[1]}
                src={imageuri[1]}
                alt="collection_img"
                layout="fill"
                className="rounded-lg"
              />
            ) : (
              <Image
                src={placeholderImg}
                alt="collection_img"
                layout="fill"
                className="rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col pt-2 pb-4 bg-white/[0.1] rounded-lg border-[3px] border-[#A4950C] absolute top-2 left-0 backdrop-blur-lg hover:-rotate-12 hover:translate-y-32 transition-all ease-in-out duration-300">
        <div className="p-2 bg-transparent h-full w-full">
          <div className="mx-auto relative h-full w-full rounded-lg">
            {/* <Image src={imgUrl} alt="Main image" /> */}
            {imageuri?.[0] ? (
              <Image
                loader={() => imageuri[0]}
                src={imageuri[0]}
                alt="collection_img"
                layout="fill"
                className="rounded-lg"
              />
            ) : (
              <Image
                src={placeholderImg}
                alt="collection_img"
                layout="fill"
                className="rounded-lg"
              />
            )}
          </div>
        </div>
        <h4 className="text-white w-full text-center font-roboto font-medium text-[24px] pt-4 capitalize">
          {collection_name}
        </h4>
      </div>
    </motion.div>
  )
}

interface NewsCardProps {
  imgUrl: any
  description: string
  link: string
}

const newsData: NewsCardProps[] = [
  {
    description:
      'Samsung Gaming Hub, an All-New Game Streaming Discovery Platform.',
    imgUrl: news_img_1,
    link: '#',
  },
  {
    description:
      'Garena free fire logo has changed forever here is what it look like now and this description is too long so we need to have it shorten.',
    imgUrl: news_img_2,
    link: '#',
  },
  {
    description:
      'Samsung Gaming Hub, an All-New Game Streaming Discovery Platform.',
    imgUrl: news_img_1,
    link: '#',
  },
  {
    description:
      'Garena free fire logo has changed forever here is what it look like now and this description is too long so we need to have it shorten.',
    imgUrl: news_img_2,
    link: '#',
  },
  {
    description:
      'Garena free fire logo has changed forever here is what it look like now and this description is too long so we need to have it shorten.',
    imgUrl: news_img_2,
    link: '#',
  },
  {
    description:
      'Samsung Gaming Hub, an All-New Game Streaming Discovery Platform.',
    imgUrl: news_img_1,
    link: '#',
  },
]

const NewsCard: React.FC<NewsCardProps> = ({ imgUrl, description, link }) => {
  return (
    <div className="min-w-[390px] h-[388px] border-[2px] border-custom-yellow z-10  lg:ml-[8px] mr-[8px] rounded-xl relative">
      <div className="w-fit mx-auto max-w-[394px] max-h-[392px]">
        <Image src={imgUrl} alt="Img" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[123px] bg-black/80 flex justify-center items-center rounded-b-xl">
        <p className="font-popins text-[20px] text-white w-[362px]">
          {getDescription(description)}{' '}
          <a href={link} className="text-[#4864C8] hover:underline">
            see more
          </a>
        </p>
      </div>
    </div>
  )
}

const NewsCardContainer: React.FC<{
  cards: NewsCardProps[]
  currentIndex: number
  setCurrentIndex: Dispatch<SetStateAction<number>>
  maxNum: number
}> = ({ cards, currentIndex, setCurrentIndex, maxNum }) => {
  const { width } = useWindowDimensions()

  const handleClick = (number: 1 | -1) => {
    if (number === 1) {
      if (currentIndex === maxNum) {
        setCurrentIndex(0)
        return
      }
      setCurrentIndex((prev) => prev + 1)
      return
    } else if (number === -1) {
      if (currentIndex === 0) {
        setCurrentIndex(maxNum)
        return
      }
      setCurrentIndex((prev) => prev - 1)
      return
    }
  }

  let pixels: number
  if (width < 768) {
    pixels = 398
  } else {
    pixels = 406
  }

  return (
    <div className="w-[392px] md:w-[392px] lg:w-[808px] xl:w-[1222px] flex flex-row items-center justify-between mx-auto overflow-hidden pt-8 lg:pt-10 relative">
      <div className="absolute z-20">
        <ArrowGoldenBtns
          icon={<FiChevronLeft />}
          onClick={() => {
            handleClick(-1)
          }}
        />
      </div>
      <div
        className="w-fit flex flex-row transition-all ease-in-out duration-300"
        style={{ transform: `translateX(-${pixels * currentIndex}px)` }}
      >
        {cards.map((card, index) => {
          return <NewsCard {...card} key={index} />
        })}
      </div>
      <div className="absolute z-20 right-0">
        <ArrowGoldenBtns
          icon={<FiChevronRight />}
          onClick={() => {
            handleClick(1)
          }}
        />
      </div>
    </div>
  )
}

interface ArrowGrayBtnsProps {
  icon: ReactNode
  onClick: () => void
}

const ArrowGrayBtns: React.FC<ArrowGrayBtnsProps> = ({ icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white w-[34px] h-[47px] border-[2px] border-white bg-[#818185]/[0.3] hover:bg-zinc-700 active:bg-zinc-800 z-10 transition-all ease-in-out duration-200"
    >
      <div className="flex justify-center items-center">{icon}</div>
    </button>
  )
}

interface ArrowGoldenBtnsProps {
  icon: ReactNode
  onClick: () => void
}

const ArrowGoldenBtns: React.FC<ArrowGoldenBtnsProps> = ({ icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white w-[30px] h-[44px] bg-[#926f34] hover:bg-[#83642f] active:bg-[#75592a] rounded-lg transition-all ease-in-out duration-200"
    >
      <div className="flex justify-center items-center">{icon}</div>
    </button>
  )
}

const CURRENT_PAGE = 1

const GalleryAndNewsSection: React.FC = () => {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [collections, setCollections] = useState<CollectionCardType[]>([])

  const { width } = useWindowDimensions()

  const { data } = useQuery([QUERIES.getCollections, CURRENT_PAGE], () =>
    getCollections(CURRENT_PAGE, 12, 'NA', 'NA', 'NA')
  )

  let maxNum = newsData.length - 1
  if (width > 1024 && width < 1280 && newsData.length >= 2) {
    maxNum = newsData.length - 2
  }
  if (width > 1280 && newsData.length >= 3) {
    maxNum = newsData.length - 3
  }

  const viewMoreClick = () => {
    router.push('/collections')
  }

  useEffect(() => {
    if (data?.data?.collections?.length) {
      setCollections(data.data.collections)
    }
  }, [data?.data])

  return (
    <section className="min-h-screen w-full py-10">
      <motion.div
        variants={fromBottomAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          delay: 0.6,
        }}
        className={`${CONTAINER_PADDING} w-full  flex items-end justify-between mx-auto`}
      >
        <h2 className="z-10 text-white leading-none font-popins font-medium text-[32px] md:text-[38px] lg:text-[50px] relative before:absolute before:w-[4px] before:h-[30px] before:md:h-[35px] before:lg:h-[48px] before:bg-[#FFDC20] before:-translate-x-2 before:md:-translate-x-3 before:lg:-translate-x-4 pt-10">
          Top Galleries
        </h2>
        <button
          className="z-10 font-roboto text-white text-[16px] md:text-[18px] lg:text-[20px] w-[110px] md:w-[120px] lg:w-[135px]  h-[28px] md:h-[32px] lg:h-[35px] bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-900 transition-all ease-in-out duration-200"
          onClick={viewMoreClick}
        >
          View More
        </button>
      </motion.div>
      <div
        className={`${CONTAINER_PADDING} w-full flex flex-col lg:flex-row items-center justify-between mx-auto pt-14 space-y-24 lg:space-y-0`}
      >
        {collections?.map((data, index) => {
          if (index > 8 && index < 12) {
            return (
              <GalleryCard
                key={index}
                index={index}
                // onClick={() => console.log(`card number ${index + 1}`)}
                {...data}
              />
            )
          }
        })}
      </div>
      <div className="flex items-center justify-center mx-auto mt-32">
        <motion.h2
          variants={fromLeftAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.5,
          }}
          className="z-10 text-white leading-none font-popins font-medium text-[32px] md:text-[38px] lg:text-[50px] relative before:absolute before:w-[4px] before:h-[30px] before:md:h-[35px] before:lg:h-[48px] before:bg-[#FFDC20] before:-translate-x-3 before:md:-translate-x-4 before:lg:-translate-x-6 after:absolute after:w-[4px] after:h-[30px] after:md:h-[35px] after:lg:h-[48px] after:bg-[#FFDC20] after:translate-x-3 after:md:translate-x-4 after:lg:translate-x-6"
        >
          Latest News
        </motion.h2>
      </div>
      <div className={`${CONTAINER_PADDING} w-full flex justify-end mx-auto`}>
        <motion.div
          variants={fromRightAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.9,
          }}
          className="flex flex-row space-x-3 pt-2"
        >
          <ArrowGrayBtns
            icon={<FiChevronLeft size={30} />}
            onClick={() => setCurrentIndex(0)}
          />
          <ArrowGrayBtns
            icon={<FiChevronRight size={30} />}
            onClick={() => setCurrentIndex(maxNum)}
          />
        </motion.div>
      </div>
      <motion.div
        variants={fromLeftAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          delay: 1,
        }}
      >
        <NewsCardContainer
          cards={newsData}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          maxNum={maxNum}
        />
      </motion.div>
    </section>
  )
}

export default GalleryAndNewsSection
