import { motion } from 'framer-motion'
import Image from 'next/image'
import { ReactElement } from 'react'
import { fromBottomAnimation } from '../../../utils/animations'
import SectionContainer from '../../SectionContainer'

// OurPartners section for Home
function OurPartners(): ReactElement {
  return (
    <section className="py-16  lg:py-24 text-white bg-[#0A0A0A]">
      <SectionContainer>
        <motion.div
          className="grid place-items-center bg-[#0E0C0C]/90 p-4 lg:py-16 rounded-lg"
          variants={fromBottomAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.2,
          }}
        >
          <h2 className="text-white text-4xl lg:text-[4rem] font-poppins  capitalize">
            our supporters
          </h2>
          <div className="flex items-center gap-4 pt-10 lg:pt-16">
            <div className="relative w-[3.5rem] h-[3.5rem] lg:w-[4.875rem] lg:h-[4.875rem]">
              <Image
                alt="filecoin_logo"
                src="/images/others/filecoin_logo.svg"
                layout="fill"
              />
            </div>

            <div className="font-medium text-2xl lg:text-[29px] text-[#01D1FF] font-poppins">
              Filecoin Foundation
            </div>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  )
}

export default OurPartners
