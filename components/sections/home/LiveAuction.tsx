import { motion } from 'framer-motion'
import { FC } from 'react'
import {
  fromBottomAnimation,
  fromLeftAnimation,
  fromRightAnimation,
} from '../../../utils/animations'
import OutlinedNftCard from '../../OutlinedNftCard'
import SectionContainer from '../../SectionContainer'

// Live Auction Section
const LiveAuction: FC = () => {
  return (
    <section className={`text-[#fff] bg-[#0A0A0A] py-10 lg:pb-40 lg:pt-8`}>
      <SectionContainer>
        <motion.h2
          className="text-center text-4xl lg:text-[4rem] lg:leading-[66.6496px] pt-4 lg:pt-20"
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
          Live <span className="text-[#FF00F8]">Auction</span>
        </motion.h2>

        <motion.div
          className="flex justify-evenly flex-wrap gap-10 pt-20"
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
          {new Array(4).fill(2).map((item, i) => (
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
              className=""
            >
              <OutlinedNftCard />
            </motion.div>
          ))}
        </motion.div>
      </SectionContainer>
    </section>
  )
}

export default LiveAuction
