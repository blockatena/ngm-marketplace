import { differenceInSeconds } from 'date-fns'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import getCommast from '../utils/getCommas'
import transformTimeLeft from '../utils/transformTimeLeft'

interface AuctionCardProps {
  imgUrl: any
  expireDate: Date
  currentPrice: number
  characterName: string
}

// const auctionData: AuctionCardProps[] = [
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

const TimerSquare: React.FC<{ time: string; title: string }> = ({
  time,
  title,
}) => {
  return (
    <div className="flex flex-row space-x-[1px] items-end">
      <p className="w-[24px] h-[22px] bg-[#8C8C8C]/50 text-white font-btn text-[16px] font-bold text-center rounded-md">
        {time}
      </p>
      <p className="text-[#F5F5F5]/60 font-bold text-[10px] font-btn">
        {title}
      </p>
    </div>
  )
}
const AuctionCard: React.FC<AuctionCardProps & { onClick: () => void }> = ({
  imgUrl,
  expireDate,
  currentPrice,
  characterName,
  onClick,
}) => {
  const [daysLeft, setDaysLeft] = useState('10')
  const [hoursLeft, setHoursLeft] = useState('10')
  const [minsLeft, setMinsLeft] = useState('10')
  const [secsLeft, setSecsLeft] = useState('10')

  useEffect(() => {
    if (hoursLeft == '00' && minsLeft == '00' && secsLeft == '00') {
      return
    }
    const interval = setInterval(() => {
      let datesDifferenceSeconds = differenceInSeconds(expireDate, new Date())
      if (datesDifferenceSeconds <= 0) {
        setDaysLeft('00')
        setHoursLeft('00')
        setMinsLeft('00')
        setSecsLeft('00')
        return
      }
      const days = Math.floor(datesDifferenceSeconds / 86400)
      const hours = Math.floor((datesDifferenceSeconds - days * 86400) / 3600)
      const mins = Math.floor((datesDifferenceSeconds - days * 86400 - hours *3600) / 60)
      const secs = Math.floor(datesDifferenceSeconds -days*86400 - mins * 60 - hours * 3600)
      setDaysLeft(transformTimeLeft(days))
      setHoursLeft(transformTimeLeft(hours))
      setMinsLeft(transformTimeLeft(mins))
      setSecsLeft(transformTimeLeft(secs))
    }, 1000)
    return () => clearInterval(interval)
  }, [expireDate, daysLeft, hoursLeft, minsLeft, secsLeft])

  return (
    <div className="relative before:absolute before:-right-2 before:top-16 before:w-[82px] before:h-[88px] before:bg-custom-yellow before:rounded-xl mx-auto h-[490px] flex items-end">
      <div className={`absolute bottom-2 right-[13px] z-10 max-w-[324px]`}>
        <Image alt="Character Image" src={imgUrl} />
      </div>
      <div
        className={`cut-card w-[350px] h-[416px] bg-gradient-to-b from-[#757575] via-[#2F2F2F]/70 to-[#1B1B1B] relative rounded-xl`}
      >
        <div className="cut-card absolute top-3 bottom-3 left-3 right-3 flex items-end bg-[#161817] rounded-tr-md"></div>
      </div>
      <div
        className={`w-[324px] h-[100px] z-20 absolute bottom-2 right-[13px] flex flex-col`}
      >
        <div
          className={`h-[48px] w-[324px] bg-[#000000]/50 px-3 flex flex-row justify-between items-center`}
        >
          <p className="font-josefins font-medium text-[19px] text-[#FFD325]">
            {characterName}
          </p>
          <div className="flex flex-row items-center h-[22px] space-x-2">
            <TimerSquare time={daysLeft} title="d" />
            <TimerSquare time={hoursLeft} title="h" />
            <TimerSquare time={minsLeft} title="m" />
            <TimerSquare time={secsLeft} title="s" />
          </div>
        </div>
        <div
          className={`h-[48px] w-[324px] bg-[#000000] pl-3 flex flex-row justify-between rounded-b-md`}
        >
          <div className="flex flex-col pt-1 pl-2">
            <p className="text-white font-popins text-[11px]">Current Bid:</p>
            <p className={`font-popins text-[19px] font-medium text-[#818482]`}>
              $ {getCommast(currentPrice)}
            </p>
          </div>
          <button
            className="w-[65%] h-[48px] btn-primary trapezoid font-popins font-semibold text-[#161616] text-[20px] rounded-br-md"
            onClick={onClick}
          >
            Bid Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuctionCard
