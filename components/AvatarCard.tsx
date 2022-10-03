import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

const AvatarCard: FC<{
  name: string
  img: string
  variant?: 'sm' | 'lg'
  noCta?: boolean
}> = ({ name, img, variant = 'sm', noCta }) => {
  const [isSelected, setIsSelected] = useState(false)
  const [shadow, setShadow] = useState('')
  const [cardProperties, setCardProperties] = useState({
    dimensions: 'w-[250px] h-[330px]',
  })

  useEffect(() => {
    if (isSelected) setShadow('avatar-shadow')
    else setShadow('')
  }, [isSelected])

  useEffect(() => {
    if (variant == 'sm') {
      setCardProperties((prev) => ({
        ...prev,
        dimensions: 'w-[250px] h-[330px]',
      }))
    }
    if (variant == 'lg') {
      setCardProperties((prev) => ({
        ...prev,
        dimensions: 'w-[442px] h-[589px]',
      }))
    }
  }, [variant])

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
            height={variant === 'lg' ? '641px' : '382px'}
            alt="avatar"
          />
        </div>
        <div
          className={`
      avatar-card-clip relative ${cardProperties.dimensions} rounded-tr-lg rounded-b-lg 
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
          <div className="absolute  p-0 z-30 bottom-3 left-3 right-3  h-1/4">
            <div className="opacity-70 bg-dark_heavy p-2 flex  justify-between h-20">
              <div className="text-custom_yellow text-lg font-josefin">
                {name}
              </div>
              <div className="text-white text-xs pt-1">
                <span className="rounded bg-gray-600 p-1 font-bold font-lora">
                  12
                </span>
                h{' '}
                <span className="rounded bg-gray-600 p-1 font-bold font-lora">
                  30
                </span>
                m{' '}
                <span className="rounded bg-gray-600 p-1 font-bold font-lora">
                  20
                </span>
                s
              </div>
            </div>
            <div className="flex  absolute top-10 -bottom-0 right-0 left-0 ">
              <div className="text-center grid place-items-center avatar-btn-left w-full  h-full bg-black text-gray-400 rounded-l-lg">
                <p className="text-xs font-poppins my-0">Current Bid:</p>
                <p className="text-sm font-poppins font-medium my-0">$20,000</p>
              </div>

              <div
                role="button"
                className="avatar-btn-right cursor-pointer w-full h-full bg-custom_yellow opacity-100
        grid place-items-center text-black font-poppins font-semibold text-base capitalize rounded-r-lg 
        hover:bg-[#e6c518]"
              >
                Buy Now
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AvatarCard
