import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { FaHamburger } from 'react-icons/fa'
import AvatarCard from '../../components/AvatarCard'
import heroIcon from '../../public/images/hero/product_page_hero_icon.png'
import historyIcon from '../../public/images/icons/Activity.svg'
import categoryIcon from '../../public/images/icons/Category.svg'
import editIcon from '../../public/images/icons/edit.svg'
import collectionIcon from '../../public/images/icons/Folder.svg'
import messageIcon from '../../public/images/icons/Message.svg'
import settingsIcon from '../../public/images/icons/Setting.svg'
import walletIcon from '../../public/images/icons/Wallet.svg'
import {
  fromLeftAnimation,
  fromRightAnimation,
  opacityAnimation,
} from '../../utils/animations'

const routes = [
  { name: 'category', route: '/', icon: categoryIcon },
  { name: 'messages', route: '/', icon: messageIcon },
  { name: 'my collection', route: '/', icon: collectionIcon },
  { name: 'wallet', route: '/', icon: walletIcon },
  { name: 'history', route: '/', icon: historyIcon },
  { name: 'settings', route: '/', icon: settingsIcon },
]

const avatars = [
  { name: 'Wraith', img: '/images/auction/auction_img_1.svg' },
  { name: 'Horizon', img: '/images/auction/auction_img_2.svg' },
  { name: 'Lifeline', img: '/images/auction/auction_img_3.svg' },
  { name: 'Fuse', img: '/images/auction/auction_img_4.svg' },
  { name: 'Fortune', img: '/images/auction/auction_img_5.svg' },
  { name: 'Crypto', img: '/images/auction/auction_img_6.svg' },
  { name: 'Wraith', img: '/images/auction/auction_img_1.svg' },
  { name: 'Horizon', img: '/images/auction/auction_img_2.svg' },
  { name: 'Lifeline', img: '/images/auction/auction_img_3.svg' },
  { name: 'Fuse', img: '/images/auction/auction_img_4.svg' },
  { name: 'Fortune', img: '/images/auction/auction_img_5.svg' },
  { name: 'Crypto', img: '/images/auction/auction_img_6.svg' },
]

const NavRoute: FC<{
  icon: string
  name: string
  route: string
  isDrawer?: boolean
}> = ({ icon, name, route, isDrawer }) => {
  const router = useRouter()
  const handleClick = () => {
    if (isDrawer) return
    router.push(route)
  }
  return (
    <div
      className="p-1 flex gap-8 cursor-pointer my-5 hover:bg-[#41391C] text-white hover:text-[#FFC400]"
      onClick={handleClick}
    >
      <Image src={icon} alt="icon" className="w-2" />
      <span className=" font-poppins text-lg capitalize">{name}</span>
    </div>
  )
}

const Drawer: FC<{
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setIsOpen }) => {
  const handleClick = () => {
    //Route to new route
    setIsOpen(false)
  }
  return (
    <div className="md:lg min-h-screen absolute top-0 right-4 left-4 p-4 bg-[#1F2021] rounded-lg">
      <div className="text-right font-light">
        <span className="cursor-pointer" onClick={() => setIsOpen(false)}>
          X
        </span>
      </div>
      {routes?.map(({ icon, name, route }) => (
        <div key={name} onClick={handleClick}>
          <NavRoute icon={icon} name={name} route={route} isDrawer={true} />
        </div>
      ))}
    </div>
  )
}

const ProductPage: FC = () => {
  const [isCollections, setIsCollections] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <main className="p-4 pt-6 pb-0 lg:px-8 relative -bottom-8">
      <div
        className="w-full h-[351px] bg-cover rounded-t-lg relative flex justify-center mb-40"
        style={{ backgroundImage: "url('/images/hero/product_page_hero.png')" }}
      >
        <div
          className="text-[#E5E5E5] font-inter lg:text-[19px] absolute bottom-4 right-6 
        bg-[#2B3137] opacity-80 p-2 cursor-pointer rounded-lg flex items-end gap-2"
        >
          <Image src={editIcon} alt="edit" /> Edit
        </div>
        <motion.div
          className="h-[126px] w-[151px] absolute -bottom-[63px]"
          variants={opacityAnimation}
          initial="initial"
          animate="final"
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 0.4,
          }}
        >
          <Image src={heroIcon} alt="" />
          <p className="text-white text-center font-poppins text-[21px] font-medium">
            Oliver Torsney
          </p>
        </motion.div>
      </div>
      <div className="grid place-items-center">
        <div className="grid grid-cols-12 gap-4 w-max">
          <motion.div
            className="hidden lg:block lg:col-span-3 h-[928px] p-10 bg-[#1F2021] rounded-lg"
            variants={fromLeftAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.4,
              delay: 0.6,
            }}
          >
            {routes?.map(({ icon, name, route }) => (
              <NavRoute key={name} icon={icon} name={name} route={route} />
            ))}
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-9"
            variants={fromRightAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.4,
              delay: 0.8,
            }}
          >
            <div className="text-white font-poppins text-[20px] pl-[25%] p-6">
              <span
                className="border-b-2 border-custom_yellow cursor-pointer transition-all"
                style={!isCollections ? { border: 'none' } : {}}
                onClick={() => setIsCollections(true)}
              >
                Collections
              </span>{' '}
              <span className="text-gray-500">|</span>{' '}
              <span
                className="border-b-2 border-custom_yellow cursor-pointer transition-all"
                style={isCollections ? { border: 'none' } : {}}
                onClick={() => setIsCollections(false)}
              >
                Activity
              </span>
            </div>
            <div
              onClick={() => setIsDrawerOpen(true)}
              className="text-white p-4 lg:hidden"
            >
              <FaHamburger className=" text-lg hover:text-custom_yellow text-[#E5E5E5]" />
            </div>
            <div
              className="pb-20 md:px-4 bg-[#1F2021] rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 
          gap-20 w-full  max-w-full mx-auto px-6 py-9 lg:h-[928px] scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021] overflow-y-scroll"
            >
              {avatars?.map((cardData, index) => (
                <motion.div
                  className="flex justify-center"
                  key={index}
                  variants={opacityAnimation}
                  initial="initial"
                  whileInView="final"
                  viewport={{ once: true }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.6,
                    delay: index < 3 ? 1.2 + index * 0.2 : index * 0.2,
                  }}
                >
                  <AvatarCard {...cardData} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="text-[#E5E5E5] absolute top-0 bottom-0 left-0 right-0"
            variants={fromLeftAnimation}
            initial="initial"
            animate="final"
            exit="initial"
            transition={{
              ease: 'easeInOut',
              duration: 0.25,
            }}
          >
            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default ProductPage
