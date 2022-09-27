import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import AuctionCard from '../../components/AuctionCard'
import { auctionData } from '../../components/sections/LiveAuctionSection'
import heroIcon from '../../public/images/hero/product_page_hero_icon.png'
import historyIcon from '../../public/images/icons/Activity.svg'
import categoryIcon from '../../public/images/icons/Category.svg'
import collectionIcon from '../../public/images/icons/Folder.svg'
import messageIcon from '../../public/images/icons/Message.svg'
import settingsIcon from '../../public/images/icons/Setting.svg'
import walletIcon from '../../public/images/icons/Wallet.svg'

const routes = [
  { name: 'category', route: '/', icon: categoryIcon },
  { name: 'messages', route: '/', icon: messageIcon },
  { name: 'my collection', route: '/', icon: collectionIcon },
  { name: 'wallet', route: '/', icon: walletIcon },
  { name: 'history', route: '/', icon: historyIcon },
  { name: 'settings', route: '/', icon: settingsIcon },
]

const NavRoute: FC<{ icon: string; name: string; route: string }> = ({
  icon,
  name,
  route,
}) => {
  const router = useRouter()
  return (
    <div
      className="flex gap-8 cursor-pointer my-5"
      onClick={() => router.push(route)}
    >
      <Image src={icon} alt="icon" className="w-2" />
      <span className="text-white font-poppins text-lg capitalize">{name}</span>
    </div>
  )
}

const ProductPage: FC = () => {
  const [isCollections, setIsCollections] = useState(false)
  return (
    <main className="p-4 pt-6 pb-0 lg:px-16 relative -bottom-8">
      <div
        className="w-full h-[351px] bg-cover rounded-t-lg relative flex justify-center mb-40"
        style={{ backgroundImage: "url('/images/hero/product_page_hero.png')" }}
      >
        <div className="h-[126px] w-[151px] absolute -bottom-[63px]">
          <Image src={heroIcon} alt="" />
          <p className="text-white text-center font-poppins text-[21px] font-medium">
            Oliver Torsney
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 h-[928px] p-10 bg-[#1F2021] rounded-lg">
          {routes?.map(({ icon, name, route }) => (
            <NavRoute key={name} icon={icon} name={name} route={route} />
          ))}
        </div>
        <div className="col-span-9">
          <div className="text-white font-poppins text-[20px] pl-[25%] p-6">
            <span
              className="border-b-4 border-custom_yellow cursor-pointer transition-all"
              style={!isCollections ? { border: 'none' } : {}}
              onClick={() => setIsCollections(true)}
            >
              Collections
            </span>{' '}
            <span className="text-gray-500">|</span>{' '}
            <span
              className="border-b-4 border-custom_yellow cursor-pointer transition-all"
              style={isCollections ? { border: 'none' } : {}}
              onClick={() => setIsCollections(false)}
            >
              Activity
            </span>
          </div>
          <div
            className="pb-20 bg-[#1F2021] rounded-lg grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 
          gap-20 w-full md:w-[500px] lg:w-[900px] xl:w-[1240px] max-w-full mx-auto px-6 py-9 h-[928px] overflow-y-auto"
          >
            {auctionData.map((auction, index) => {
              return (
                <AuctionCard
                  {...auction}
                  key={index}
                  onClick={() => console.log('buy auction card nr' + index)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductPage
