import { motion } from 'framer-motion'
import { AvatarType } from '../../interfaces'
import { opacityAnimation } from '../../utils/animations'
import AvatarCard from '../AvatarCard'

const avatars: AvatarType[] = [
  {
    token_id: '1',
    name: 'Wraith',
    img: '/images/auction/auction_img_1.svg',
    is_in_auction: false,
    contract_address: '0xfd2b3561630c02b8047B911c22d3f3bfF3ad64Ce',
    contract_type: '',
    createdAt: '',
    is_in_sale: false,
    meta_data_url: '',
    token_owner: '',
    updatedAt: '',
    __v: 0,
    _id: '',
  },
  {
    token_id: '2',
    name: 'Horizon',
    img: '/images/auction/auction_img_2.svg',
    is_in_auction: true,
    contract_address: '0xfd2b4561630c02b8047B911c22d3f3bfF3ad64Ce',
    contract_type: '',
    createdAt: '',
    is_in_sale: false,
    meta_data_url: '',
    token_owner: '',
    updatedAt: '',
    __v: 0,
    _id: '',
  },
  {
    token_id: '3',
    name: 'Lifeline',
    img: '/images/auction/auction_img_3.svg',
    is_in_auction: false,
    contract_address: '0xfd2b3561630c02b8047B911c22d3f3bfF3ad64Ce',
    contract_type: '',
    createdAt: '',
    is_in_sale: false,
    meta_data_url: '',
    token_owner: '',
    updatedAt: '',
    __v: 0,
    _id: '',
  },
]

const ExploreSection = () => {
  return (
    <section className="mt-8 mb-12">
      <h3 className="font-poppins text-lg lg:text-[40px] text-center text-white mb-10">
        You may also like
      </h3>
      <div
        className="pb-20 md:px-4  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3
      gap-20 w-full  max-w-full mx-auto px-6 py-9"
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
              delay: index * 0.4,
            }}
          >
            <AvatarCard {...cardData} />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center">
        <p className="font-poppins text-white font-semibold cursor-pointer border-b border-custom_yellow px-1">
          Explore more
        </p>
      </div>
    </section>
  )
}

export default ExploreSection
