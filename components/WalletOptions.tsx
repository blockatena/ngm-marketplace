import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import Image from 'next/image'
import { FC } from 'react'

type WalletOptionType = {
  img: string
  title: WalletType
  content: string
  isInactive?: boolean
  active?: boolean
}

type WalletType =
  | 'portis'
  | 'metamask'
  | 'coinbase wallet'
  | 'osmosis'
  | 'phantom'

interface CardProps extends WalletOptionType {
  handleConnect: (_wallet: WalletType, _active?: boolean) => void
}

const walletOptions: WalletOptionType[] = [
  {
    img: '/img/icons/portis.png',
    title: 'portis',
    content:
      'Offer your user a familiar experience by signing in with just an email and password.',
    isInactive: true,
  },
  {
    img: '/img/icons/metamask.png',
    title: 'metamask',
    content:
      'Available as a browser extension and as a mobile app. Metamask equips you with a key vault.',
  },
  {
    img: '/img/icons/coinbase.png',
    title: 'coinbase wallet',
    content:
      'Offer your user a familiar experience by signing in with just an email and password.',
    isInactive: true,
  },
  {
    img: '/img/icons/osmosis.png',
    title: 'osmosis',
    content:
      'Offer your user a familiar experience by signing in with just an email and password.',
    isInactive: true,
  },
  {
    img: '/img/icons/phantom.png',
    title: 'phantom',
    content:
      'Offer your user a familiar experience by signing in with just an email and password.',
    isInactive: true,
  },
]

const Card: FC<CardProps> = ({
  img,
  title,
  content,
  isInactive,
  handleConnect,
  active,
}) => {
  let shadow
  if (active && title === 'metamask') {
    shadow = 'shadow-lg shadow-custom_yellow'
  } else {
    shadow = 'shadow-inner shadow-gray-400'
  }
  return (
    <div
      style={
        isInactive ? { backgroundColor: '#464748', cursor: 'default' } : {}
      }
      className={`${shadow} overflow-ellipsis cursor-pointer h-72 p-2 w-full bg-dark_mild  md:w-52 rounded-lg`}
      onClick={() => handleConnect(title, active)}
    >
      <div className="h-36 grid place-items-center rounded-lg bg-gradient-to-r from-custom_gray_light to-custom_gray_dark">
        <Image src={img} alt="wallet_option" width="131px" height="126px" />
      </div>
      <p className="capitalize font-inter font-medium text-white text-center my-4 md:text-lg lg:text-xl">
        {title}
      </p>
      <p className="font-inter font-light text-white text-center md:text-xs">
        {content}
      </p>
    </div>
  )
}

const WalletOptions: FC = () => {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })
  const { activate, active, deactivate } = useWeb3React<Web3Provider>()
  const handleConnect = async (wallet: WalletType, active?: boolean) => {
    if (!active) {
      try {
        wallet === 'metamask' && (await activate(injectedConnector))
      } catch (e) {
        console.error(e)
      }
    } else {
      try {
        wallet === 'metamask' && deactivate()
      } catch (e) {
        console.error(e)
      }
    }
  }
  return (
    <div className="flex flex-col flex-wrap pb-28 gap-4 md:justify-start md:flex-row lg:justify-between">
      {walletOptions?.map(({ content, img, title, isInactive }) => (
        <Card
          key={title}
          content={content}
          img={img}
          title={title}
          isInactive={isInactive}
          handleConnect={handleConnect}
          active={active}
        />
      ))}
    </div>
  )
}

export default WalletOptions
