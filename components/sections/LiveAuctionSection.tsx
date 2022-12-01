import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
// import img_1 from '../../public/images/auction/auction_img_1.svg'
// import img_2 from '../../public/images/auction/auction_img_2.svg'
// import img_3 from '../../public/images/auction/auction_img_3.svg'
// import img_4 from '../../public/images/auction/auction_img_4.svg'
// import img_5 from '../../public/images/auction/auction_img_5.svg'
// import img_6 from '../../public/images/auction/auction_img_6.svg'
import { fromLeftAnimation, opacityAnimation } from '../../utils/animations'
import { CONTAINER_PADDING } from '../../utils/constants'
// import getCommast from '../../utils/getCommas'
// import transformTimeLeft from '../../utils/transformTimeLeft'
import { useQuery } from 'react-query'
import type { AvatarType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { getAllNFts } from '../../react-query/queries'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'
import AvatarCard from '../AvatarCard'

// interface AuctionCardProps {
//   imgUrl: any
//   expireDate: Date
//   currentPrice: number
//   characterName: string
// }

// export const auctionData: AuctionCardProps[] = [
//   {
//     imgUrl: img_1,
//     characterName: 'Fuse',
//     currentPrice: 20000,
//     expireDate: new Date(2021, 8, 23),
//   },
//   {
//     imgUrl: img_2,
//     characterName: 'Nick Fury',
//     currentPrice: 20000,
//     expireDate: new Date(2022, 8, 23, 3, 4, 5),
//   },
//   {
//     imgUrl: img_3,
//     characterName: 'Nico',
//     currentPrice: 20000,
//     expireDate: new Date(2022, 8, 22, 6, 7, 8),
//   },
//   {
//     imgUrl: img_4,
//     characterName: 'Taric',
//     currentPrice: 20000,
//     expireDate: new Date(2022, 8, 21, 2, 2, 2),
//   },
//   {
//     imgUrl: img_5,
//     characterName: 'Wraith',
//     currentPrice: 20000,
//     expireDate: new Date(2022, 8, 20, 1, 1, 1),
//   },
//   {
//     imgUrl: img_6,
//     characterName: 'Harth Stonebrew',
//     currentPrice: 20000,
//     expireDate: new Date(2022, 7, 24),
//   },
// ]

// const TimerSquare: React.FC<{ time: string; title: string }> = ({
//   time,
//   title,
// }) => {
//   return (
//     <div className="flex flex-row space-x-[1px] items-end">
//       <p className="w-[24px] h-[22px] bg-[#8C8C8C]/50 text-white font-btn text-[16px] font-bold text-center rounded-md">
//         {time}
//       </p>
//       <p className="text-[#F5F5F5]/60 font-bold text-[10px] font-btn">
//         {title}
//       </p>
//     </div>
//   )
// }

// const AuctionCard: React.FC<AuctionCardProps & { onClick: () => void }> = ({
//   imgUrl,
//   expireDate,
//   currentPrice,
//   characterName,
//   onClick,
// }) => {
//   const [hoursLeft, setHoursLeft] = useState('10')
//   const [minsLeft, setMinsLeft] = useState('10')
//   const [secsLeft, setSecsLeft] = useState('10')

//   useEffect(() => {
//     if (hoursLeft == '00' && minsLeft == '00' && secsLeft == '00') {
//       return
//     }
//     const interval = setInterval(() => {
//       const datesDifferenceSeconds = differenceInSeconds(expireDate, new Date())
//       if (datesDifferenceSeconds <= 0) {
//         setHoursLeft('00')
//         setMinsLeft('00')
//         setSecsLeft('00')
//         return
//       }
//       const hours = Math.floor(datesDifferenceSeconds / 3600)
//       const mins = Math.floor(datesDifferenceSeconds / 60 - hours * 60)
//       const secs = Math.floor(datesDifferenceSeconds - mins * 60 - hours * 3600)
//       setHoursLeft(transformTimeLeft(hours))
//       setMinsLeft(transformTimeLeft(mins))
//       setSecsLeft(transformTimeLeft(secs))
//     }, 1000)
//     return () => clearInterval(interval)
//   }, [expireDate, hoursLeft, minsLeft, secsLeft])

//   return (
//     <div className="relative before:absolute before:-right-2 before:top-16 before:w-[82px] before:h-[88px] before:bg-custom-yellow before:rounded-xl mx-auto h-[490px] flex items-end">
//       <div className="absolute bottom-2 right-[13px] z-10 max-w-[324px]">
//         <Image alt="Character Image" src={imgUrl} />
//       </div>
//       <div className="cut-card w-[350px] h-[416px] bg-gradient-to-b from-[#757575] via-[#2F2F2F]/70 to-[#1B1B1B] relative rounded-xl">
//         <div className="cut-card absolute top-3 bottom-3 left-3 right-3 flex items-end bg-[#161817] rounded-tr-md"></div>
//       </div>
//       <div className="w-[324px] h-[100px] z-20 absolute bottom-2 right-[13px] flex flex-col">
//         <div className="h-[48px] w-[324px] bg-[#000000]/50 px-3 flex flex-row justify-between items-center">
//           <p className="font-josefins font-medium text-[19px] text-[#FFD325]">
//             {characterName}
//           </p>
//           <div className="flex flex-row items-center h-[22px] space-x-2">
//             <TimerSquare time={hoursLeft} title="h" />
//             <TimerSquare time={minsLeft} title="m" />
//             <TimerSquare time={secsLeft} title="s" />
//           </div>
//         </div>
//         <div className="h-[48px] w-[324px] bg-[#000000] pl-3 flex flex-row justify-between rounded-b-md">
//           <div className="flex flex-col pt-1 pl-2">
//             <p className="text-white font-popins text-[11px]">Current Bid:</p>
//             <p className="font-popins text-[19px] font-medium text-[#818482]">
//               $ {getCommast(currentPrice)}
//             </p>
//           </div>
//           <button
//             className="w-[175px] h-[48px] btn-primary trapezoid font-popins font-semibold text-[#161616] text-[20px] rounded-br-md"
//             onClick={onClick}
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

const CURRENT_PAGE = 1

const LiveAuctionSection: React.FC = () => {
  const [avatars, setAvatars] = useState<AvatarType[]>()
  const [clientWidth, setClientWidth] = useState(1)
  const { data } = useQuery([QUERIES.getAllNFts, CURRENT_PAGE], () =>
    getAllNFts(CURRENT_PAGE, 12)
  )
  const { width } = useWindowDimensions()

  useEffect(() => {
    setClientWidth(width)
  }, [width])

  useEffect(() => {
    if (data?.data) {
      setAvatars(data.data.nfts)
    }
  }, [data?.data])

  const is2xl = clientWidth >= 1536

  return (
    <section className="w-full min-h-screen 2xl:min-h-full pt-10">
      <div
        className={`${CONTAINER_PADDING} w-full flex justify-start items-center mx-auto pb-12`}
      >
        <motion.h2
          variants={fromLeftAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.4,
          }}
          className="z-10 text-white leading-none font-popins font-medium text-[32px] md:text-[38px] lg:text-[50px] relative before:absolute before:w-[4px] before:h-[30px] before:md:h-[35px] before:lg:h-[48px] before:bg-[#FFDC20] before:-translate-x-2 before:md:-translate-x-3 before:lg:-translate-x-4 pt-10"
        >
          Top Assets
        </motion.h2>
      </div>
      <motion.div
        variants={opacityAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          delay: 0.9,
        }}
        className={`${CONTAINER_PADDING} grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 lg:gap-20 w-full bg-black mx-auto py-9 rounded-xl`}
      >
        {avatars?.map((avatar, index) => {
          if (is2xl && index < 8) {
            return (
              <div className="flex justify-center" key={index}>
                <AvatarCard {...avatar} />
              </div>
            )
          }
          if (!is2xl && index < 6)
            return (
              <div className="flex justify-center" key={index}>
                <AvatarCard {...avatar} />
              </div>
            )
        })}
      </motion.div>
    </section>
  )
}

export default LiveAuctionSection
