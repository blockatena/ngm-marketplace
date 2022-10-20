import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import useWindowDimensions from '../utils/hooks/useWindowDimensions'

interface AvatarCardProps {
  name: string
  img: string
  variant?: 'xs' | 'sm' | 'lg'
  noCta?: boolean
  isOnAuction?: boolean
  id: number
}

const TimerSection: FC<{ hours: number; minutes: number; seconds: number }> = ({
  hours,
  minutes,
  seconds,
}) => {
  return (
    <div className="text-white  text-[9px] lg:text-xs pt-1">
      <span className="rounded bg-gray-600 p-[2px] md:p-1 font-bold font-lora">
        {hours}
      </span>
      h{' '}
      <span className="rounded bg-gray-600 p-[2px] md:p-1 font-bold font-lora">
        {minutes}
      </span>
      m{' '}
      <span className="rounded bg-gray-600 p-[2px] md:p-1 font-bold font-lora">
        {seconds}
      </span>
      s
    </div>
  )
}

const AvatarCard: FC<AvatarCardProps> = ({
  name,
  img,
  variant = 'sm',
  noCta,
  isOnAuction,
  id,
}) => {
  const router = useRouter()
  const [isSelected, setIsSelected] = useState(false)
  const [shadow, setShadow] = useState('')
  const [cardProperties, setCardProperties] = useState({
    dimensions: 'w-[250px] h-[330px]',
  })
  const { width } = useWindowDimensions()
  const [clientWidth, setClientWidth] = useState(0)

  useEffect(() => {
    setClientWidth(width)
  }, [width])

  useEffect(() => {
    if (isSelected) setShadow('avatar-shadow')
    else setShadow('')
  }, [isSelected])

  useEffect(() => {
    if (variant === 'sm') {
      setCardProperties((prev) => ({
        ...prev,
        dimensions: 'lg:w-[250px] lg:h-[330px]',
      }))
    }
    if (variant === 'lg') {
      setCardProperties((prev) => ({
        ...prev,
        dimensions: 'lg:w-[442px] lg:h-[589px]',
      }))
    }
    if (variant === 'xs') {
      setCardProperties((prev) => ({
        ...prev,
        dimensions: 'lg:w-[213px] lg:h-[274px]',
      }))
    }
  }, [variant])

  const handleClick = () => {
    if (isOnAuction) {
      return
    }
    router.push(`/product/${id}`)
  }

  return (
    <div onClick={() => setIsSelected((prev) => !prev)}>
      <div
        className={`${shadow} relative w-min mt-16 hover:avatar-shadow cursor-pointer
    before:absolute before:-right-2 before:-top-2 before:w-[82px] before:h-[88px] before:bg-custom_yellow before:rounded-xl 
    `}
      >
        <div className="absolute -top-16 z-20 grid place-items-center">
          <Image
            src={img}
            width={variant === 'lg' ? '442px' : '250px'}
            height={
              variant === 'lg' && clientWidth > 768
                ? '641px'
                : variant === 'lg' && clientWidth <= 768
                ? '900px'
                : '382px'
            }
            alt="avatar"
          />
        </div>
        <div
          className={`
      avatar-card-clip relative w-[160px] h-[225px] ${cardProperties.dimensions} rounded-tr-lg rounded-b-lg 
      bg-gradient-to-b from-custom_gray_outline via-[#373737] to-[#1C1C1C]`}
        >
          <div
            className="avatar-card-clip rounded-b-lg rounded-tr-lg bg-dark_mild bg-scroll bg-cover
           absolute top-3 bottom-3 left-3 right-3"
            style={{
              backgroundImage: "url('/images/others/avatar_bg.png')",
            }}
          ></div>
        </div>
        {!noCta && (
          <div className="absolute  p-0 z-30 bottom-3 left-3 right-3  lg:h-1/4">
            <div className="opacity-70 bg-dark_heavy p-2 flex  justify-between h-20">
              <div className="text-custom_yellow  text-base lg:text-lg font-josefin">
                {name}
              </div>
              {isOnAuction && (
                <TimerSection hours={12} minutes={30} seconds={20} />
              )}
            </div>
            <div className="flex  absolute top-10 -bottom-0 right-0 left-0 ">
              <div className="text-center grid place-items-center avatar-btn-left w-full  h-full bg-black text-gray-400 rounded-l-lg">
                <p className="text-[10px] lg:text-xs font-poppins my-0">
                  {isOnAuction ? 'Current Bid' : 'Price'}
                </p>
                <p className="text-[8px] lg:text-sm font-poppins font-medium my-0">
                  $20,000
                </p>
              </div>

              <div
                role="button"
                className="avatar-btn-right cursor-pointer w-full h-full bg-custom_yellow opacity-100
        grid place-items-center text-black font-poppins font-semibold text-[13px] lg:text-base capitalize rounded-r-lg 
        hover:bg-[#e6c518]"
                onClick={handleClick}
              >
                {isOnAuction ? 'Place Bid' : 'View'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AvatarCard
