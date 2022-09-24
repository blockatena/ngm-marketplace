import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { fromLeftAnimation } from '../../utils/animations'

interface CardProps {
  children: ReactNode
  index: number
}

const cardVariants = {
  initial: {
    opacity: 0,
  },
  final: (index: number) => ({
    transition: {
      delay: 1.2 + index * 0.2,
      ease: 'easeInOut',
    },
    opacity: 1,
  }),
}

const Card: React.FC<CardProps> = ({ children, index }) => {
  return (
    <motion.div
      className="z-10 text-white w-[270px] h-[180px] xl:w-[356px] xl:h-[201px] flex justify-center items-center rounded-xl bg-gradient-to-br from-zinc-500 via-zinc-800 to-zinc-900 border-solid border-zinc-500 border-2"
      custom={index}
      variants={cardVariants}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
    >
      <p className="text-[16px] w-[200px] xl:w-[242px] opacity-100">
        {children}
      </p>
    </motion.div>
  )
}

const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full md:px-5 lg:px-10 xl:px-14 min-h-[50vh] flex flex-col lg:flex-row items-center lg:justify-between space-y-10 lg:space-y-0 xl:max-w-[1500px] xl:mx-auto pt-14">
      <div className="w-fit text-center text-white font-popins z-10 max-w-[90%] md:max-w-[390px] lg:max-w-[400px] xl:max-w-[454px]">
        <motion.h3
          variants={fromLeftAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.7,
          }}
          className="font-medium text-[46px] lg:text-[52px] xl:text-[60px]"
        >
          How it works
        </motion.h3>
        <motion.p
          variants={fromLeftAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 1,
          }}
          className="font-light text-[16px] lg:text-[18px] xl:text-[20px]"
        >
          We the community at NFTZone have our own discord group consisting of
          150+ members. Be part of it.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
        <Card index={0}>
          We the community at NFTZone have our own discord group
        </Card>
        <Card index={1}>
          We the community at NFTZone have our own discord group
        </Card>
        <Card index={2}>
          We the community at NFTZone have our own discord group
        </Card>
        <Card index={3}>
          We the community at NFTZone have our own discord group
        </Card>
      </div>
    </section>
  )
}

export default HowItWorksSection
