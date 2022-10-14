import { motion } from 'framer-motion'
import { FC } from 'react'
import { opacityAnimation } from '../utils/animations'

const PageHeading: FC<{ name: string }> = ({ name }) => {
  return (
    <motion.div
      className="flex justify-center my-6"
      variants={opacityAnimation}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      transition={{
        ease: 'easeInOut',
        duration: 1,
        delay: 0.4,
      }}
    >
      <h1
        className="font-poppins text-2xl md:text-4xl lg:text-[50px] border-0 border-l-4 border-l-custom_yellow
  lg:pl-6 pl-4 text-white font-semibold capitalize"
      >
        {name}
      </h1>
    </motion.div>
  )
}

export default PageHeading
