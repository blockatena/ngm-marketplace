import Image from 'next/image'
import { FC } from 'react'

type WalletOptionType = {
  img: string
  title: string
  content: string
  isInactive?: boolean
}

interface CardProps extends WalletOptionType {}

const walletOptions: WalletOptionType[] = [
  {
    img: '/img/icons/portis.png',
    title: 'Portis',
    content:
      'Offer your user a familiar experience by signing in with just an email and password.',
    isInactive: true,
  },
  {
    img: '/img/icons/metamask.png',
    title: 'Metamask',
    content:
      'Available as a browser extension and as a mobile app. Metamask equips you with a key vault.',
  },
  {
    img: '/img/icons/coinbase.png',
    title: 'Coinbase Wallet',
    content:
      'Offer your user a familiar experience by signing in with just an email and password.',
    isInactive: true,
  },
  {
    img: '/img/icons/osmosis.png',
    title: 'Osmosis',
    content:
      'Offer your user a familiar experience by signing in with just an email and password.',
    isInactive: true,
  },
  {
    img: '/img/icons/phantom.png',
    title: 'Phantom',
    content:
      'Offer your user a familiar experience by signing in with just an email and password.',
    isInactive: true,
  },
]

const Card: FC<CardProps> = ({ img, title, content, isInactive }) => (
  <div
    style={isInactive ? { backgroundColor: '#374151', cursor: 'default' } : {}}
    className="overflow-ellipsis cursor-pointer h-72 p-2 w-full bg-dark_mild shadow-inner shadow-gray-400 md:w-52 rounded-lg"
  >
    <div className="h-36 grid place-items-center rounded-lg bg-gradient-to-r from-custom_gray_light to-custom_gray_dark">
      <Image src={img} alt="wallet_option" width="131px" height="126px" />
    </div>
    <p className="font-inter font-medium text-white text-center my-4 md:text-lg lg:text-xl">
      {title}
    </p>
    <p className="font-inter font-light text-white text-center md:text-xs">
      {content}
    </p>
  </div>
)

const WalletOptions: FC = () => {
  return (
    <div className="flex flex-col flex-wrap pb-28 gap-4 md:justify-start md:flex-row lg:justify-between">
      {walletOptions?.map(({ content, img, title, isInactive }) => (
        <Card
          key={title}
          content={content}
          img={img}
          title={title}
          isInactive={isInactive}
        />
      ))}
    </div>
  )
}

export default WalletOptions
