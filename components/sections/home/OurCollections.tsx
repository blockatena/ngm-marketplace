import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import router from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'
import { IoChevronForwardSharp } from 'react-icons/io5'
import personImg from '../../../public/images/live-auction/pubg.png'
import { fromBottomAnimation } from '../../../utils/animations'
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions'

interface ICollection {
  img: StaticImageData
}

export const carouselData: ICollection[] = [
  {
    img: personImg,
  },
  {
    img: personImg,
  },
  {
    img: personImg,
  },
  {
    img: personImg,
  },
  {
    img: personImg,
  },
  {
    img: personImg,
  },
  {
    img: personImg,
  },
  {
    img: personImg,
  },
  {
    img: personImg,
  },
]

interface CarouselCardProps extends ICollection {
  index: number
  currentIndex: number
}

// Collection Carousel card
const CarouselCard: FC<CarouselCardProps> = ({ img, index, currentIndex }) => {
  return (
    <div
      className={`p-4 lg:p-6 w-[370px] min-w-[360px]  md:min-w-[340px] md:min-h-[360px] min-h-[370px] bg-[#0A0A19]
      backdrop-blur-lg rounded-[3.75rem] transition-all relative
      ${
        index % 2 == currentIndex % 2 &&
        'lg:scale-y-125 min-h-full lg:mx-8 xl:mx-8 lg:bg-transparent '
      }`}
    >
      <Image alt="" src={img} layout="fill" className="rounded-[3.75rem]" />
    </div>
  )
}

//  Collections Carousel
const CollectionCarousel: FC<{ carouselData: ICollection[] }> = ({
  carouselData,
}) => {
  const { width } = useWindowDimensions()
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClick = useCallback(
    (number: number) => {
      let maxNum = carouselData.length - 1
      if (width > 1024 && width < 1280 && carouselData.length >= 3) {
        maxNum = carouselData.length - 3
      }
      if (width > 1280 && carouselData.length >= 5) {
        maxNum = carouselData.length - 5
      }

      if (number === 1) {
        if (currentIndex === maxNum + 1) {
          setCurrentIndex(0)
          return
        }
        setCurrentIndex((prev) => prev + 1)
        return
      } else if (number === -1) {
        if (currentIndex === -1) {
          setCurrentIndex(maxNum)
          return
        }
        setCurrentIndex((prev) => prev - 1)
        return
      }
    },
    [carouselData.length, currentIndex, width]
  )

  let pixels
  if (width < 768) {
    pixels = 300
  } else {
    pixels = 400
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleClick(1)
    }, 3000)

    return () => clearInterval(intervalId)
  }, [handleClick])

  return (
    <div
      className="w-full 
     mx-auto overflow-hidden pt-2 lg:pt-10"
    >
      <div
        className="flex flex-row items-center h-[476px] md:gap-7 sm:gap-7 lg:gap-0 xl:gap-0 transition-all ease-in-out duration-300"
        style={{ transform: `translateX(-${pixels * currentIndex}px)` }}
      >
        {carouselData.map((testimonial, index) => {
          return (
            <CarouselCard
              {...testimonial}
              key={index}
              index={index}
              currentIndex={currentIndex}
            />
          )
        })}
      </div>
    </div>
  )
}

// Our Collections
const OurCollections = () => {
  return (
    <section className="py-5 lg:py-24 justify-center bg-[#0A0A0A]">
      <motion.h2
        className="text-white text-4xl lg:text-[4rem] font-poppins leading-[6rem] text-center"
        variants={fromBottomAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          delay: 0.1,
        }}
      >
        Our <span className="text-[#76CEFF]">Collections</span>
      </motion.h2>
      <div className=" my-2 lg:my-10">
        <CollectionCarousel carouselData={carouselData} />
      </div>
      <div className="flex justify-center p-12">
        <motion.button
          className="text-white flex items-center justify-center w-[16.5rem] h-[3.888rem] gap-4 bg-gradient-to-r 
      from-[#BD00D1] via-[#000000] to-[#FFC701] rounded-full hover:to-[#BD00D1] hover:via-[#000000] hover:from-[#FFC701]
      font-poppins text-[1.75rem] font-normal"
          onClick={() => router.push('/collections')}
          variants={fromBottomAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.1,
          }}
        >
          See More <IoChevronForwardSharp />
        </motion.button>
      </div>
    </section>
  )
}

export default OurCollections
