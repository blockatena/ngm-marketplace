import { motion } from 'framer-motion'
import { FC } from 'react'
import {
  fromBottomAnimation,
  fromLeftAnimation,
  fromRightAnimation,
} from '../../utils/animations'
import { CONTAINER_PADDING } from '../../utils/constants'
import OutlinedNftCard from '../OutlinedNftCard'

const LiveAuction: FC = () => {
  return (
    <section
      className={`${CONTAINER_PADDING}  text-[#EAD30C] bg-[#0A0A0A] py-40`}
    >
      <motion.h2
        className="text-center lg:text-[55px] lg:leading-[66.6496px] pt-20"
        variants={fromBottomAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          delay: 0.6,
        }}
      >
        Live Auction
      </motion.h2>

      <motion.div
        className="flex justify-evenly flex-wrap gap-16 pt-20"
        variants={fromLeftAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.2,
          delay: 0.1,
        }}
      >
        {new Array(6).fill(2).map((item, i) => (
          <motion.div
            key={i}
            variants={fromRightAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
              delay: 0.1 + i / 5,
            }}
          >
            <OutlinedNftCard />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default LiveAuction
