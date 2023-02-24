import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { FC, useCallback, useEffect, useState } from 'react'
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
]

interface CarouselCardProps extends ICollection {
  index: number
  currentIndex: number
}

const CarouselCard: FC<CarouselCardProps> = ({ img, index, currentIndex }) => {
  return (
    <div
      className={`p-4 lg:p-6 w-[33%] min-w-[300px]  md:min-w-[378px] min-h-[334px] bg-[#0A0A19]
      backdrop-blur-lg rounded-[3.75rem] transition-all relative
      ${
        index === currentIndex + 1 &&
        'lg:scale-y-125 lg:mx-12 xl:mx-24 lg:bg-transparent'
      }`}
    >
      <Image alt="" src={img} layout="fill" />
    </div>
  )
}

const CollectionCarousel: FC<{ carouselData: ICollection[] }> = ({
  carouselData,
}) => {
  const { width } = useWindowDimensions()
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClick = useCallback(
    (number: number) => {
      let maxNum = carouselData.length - 1
      if (width > 1024 && width < 1280 && carouselData.length >= 2) {
        maxNum = carouselData.length - 2
      }
      if (width > 1280 && carouselData.length >= 3) {
        maxNum = carouselData.length - 3
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
      className="w-[350px] md:w-[392px] lg:w-full 
     mx-auto overflow-hidden pt-8 lg:pt-10"
    >
      <div
        className="w-fit flex flex-row items-center h-[550px] gap-6 transition-all ease-in-out duration-300"
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

const OurCollections = () => {
  return (
    <section className="py-16 lg:py-24  px-[5%] 2xl:px-[12%] bg-[#0A0A0A]">
      <motion.h2
        className="text-white lg:text-[4rem] font-poppins leading-[6rem] text-center"
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
        Our Collections
      </motion.h2>
      <div className="my-10">
        <CollectionCarousel carouselData={carouselData} />
      </div>
      <div className="flex justify-center">
        <button
          className="capitalize bg-[#F8D40A] text-black w-[9.125rem] h-[3rem] rounded-md hover:bg-custom-yellow-hover
        font-poppins font-medium"
        >
          see all
        </button>
      </div>
    </section>
  )
}

export default OurCollections
