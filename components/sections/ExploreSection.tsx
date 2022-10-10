import { motion } from 'framer-motion'
import { opacityAnimation } from '../../utils/animations'
import AvatarCard from '../AvatarCard'

const avatars = [
  { name: 'Fuse', img: '/images/auction/auction_img_4.svg' },
  { name: 'Horizon', img: '/images/auction/auction_img_2.svg' },
  { name: 'Lifeline', img: '/images/auction/auction_img_3.svg' },
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
