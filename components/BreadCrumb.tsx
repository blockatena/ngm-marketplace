import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'
import { CrumbType } from '../interfaces'
import { fromLeftAnimation } from '../utils/animations'

interface BreadCrumbProps {
  crumbs: CrumbType[]
}

// BreadCrumb

const BreadCrumb: FC<BreadCrumbProps> = ({ crumbs }) => {
  const router = useRouter()
  return (
    <div className="flex gap-2 lg:gap-4 text-[14px] md:text-base lg:text-[19px] font-poppins capitalize">
      {crumbs.map(({ name, route }, index) => {
        if (index + 1 === crumbs.length) {
          return (
            <motion.p
              className="text-white"
              key={index}
              variants={fromLeftAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.6,
                delay: (index + 1) * 0.2,
              }}
            >
              {name}
            </motion.p>
          )
        }
        return (
          <Fragment key={index}>
            <motion.p
              className="text-[#929191] hover:text-white cursor-pointer"
              onClick={() => router.push(route)}
              variants={fromLeftAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.6,
                delay: index * 0.2,
              }}
            >
              {name}
            </motion.p>
            <p className="text-custom_yellow font-thin">|</p>
          </Fragment>
        )
      })}
    </div>
  )
}

export default BreadCrumb
