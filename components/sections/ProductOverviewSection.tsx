import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { FC, useState } from 'react'
import AvatarCard from '../../components/AvatarCard'
import ownerImg from '../../public/images/others/owner.png'
import { fromLeftAnimation, fromRightAnimation } from '../../utils/animations'
import CheckoutModal from '../modals/CheckoutModal'
import MakeOfferModal from '../modals/MakeOfferModal'

const ProductOverviewSection: FC = () => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)

  return (
    <section className="flex flex-col xl:flex-row gap-4 lg:gap-0 2xl:gap-32 xl:justify-between p-0">
      <motion.div
        className="flex justify-between"
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
        <AvatarCard
          name="Wraith"
          img="/images/auction/auction_img_1.svg"
          variant="lg"
          noCta
        />
        <div className="lg:hidden grid place-items-center">
          <div className=" capitalize border-l-[4px] border-custom_yellow pl-2 ">
            <p className="text-custom_yellow lg:text-[30px] font-play mb-2">
              Apex Legend
            </p>
            <p className="text-white text-2xl lg:text-[49px] font-josefin">
              Fuse
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="p-4 flex flex-col justify-evenly lg:pl-12 gap-4 xl:gap-0"
        variants={fromRightAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.4,
          delay: 0.6,
        }}
      >
        <div className=" capitalize border-l-[4px] border-custom_yellow pl-2 hidden lg:block">
          <p className="text-custom_yellow lg:text-[30px] font-play mb-2">
            Apex Legend
          </p>
          <p className="text-white text-2xl lg:text-[49px] font-josefin">
            Fuse
          </p>
        </div>

        <p className="text-[#D7D7D7] font-poppins text-sm lg:text-base text-center lg:text-left">
          The Fuse is an offensive character that harnesses the power of
          grenades, cluster bombs, and mortars to overwhelm enemy squads with
          it&apos;s own unique traits & personality
        </p>

        <div className="flex justify-between font-poppins">
          <div>
            <p className="text-gray-600 text-sm lg:text-base">Price Bid</p>
            <p className="text-white font-bold text-lg lg:text-2xl">
              10.89 ETH
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm lg:text-base">Last Bid</p>
            <p className="text-white font-bold text-lg lg:text-2xl">
              10.89 ETH
            </p>
          </div>
        </div>

        <div className="flex justify-between md:flex-row gap-2 md:gap-0">
          <div className="flex justify-between gap-4 lg:gap-6 bg-gray-900 p-2 lg:p-4 rounded-lg">
            <div>
              <Image src={ownerImg} alt="" />
            </div>
            <div className="font-poppins">
              <p className="text-gray-600 text-sm lg:text-base">Owner</p>
              <p className="font-medium text-white text-sm lg:text-base">
                SalvadorDali
              </p>
            </div>
          </div>
          <div className="grid place-items-center">
            <div className="px-2 lg:px-6 py-2 bg-[#262729] text-[13px] lg:text-[20px] text-white rounded-lg">
              05 : 12 : 07 : 45
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-2 lg:gap-4">
          <button
            className="btn-secondary w-full md:w-1/2 h-[42px] md:h-16 text-sm lg:text-[21px]"
            onClick={() => setIsCheckoutModalOpen(true)}
          >
            Purchase Now
          </button>
          <button
            className="w-full md:w-1/2 btn-primary rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
            onClick={() => setIsOfferModalOpen(true)}
          >
            Place Bid
          </button>
        </div>
      </motion.div>
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <CheckoutModal
            isOpen={isCheckoutModalOpen}
            setIsOpen={setIsCheckoutModalOpen}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOfferModalOpen && (
          <MakeOfferModal
            isOpen={isOfferModalOpen}
            setIsOpen={setIsOfferModalOpen}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProductOverviewSection
