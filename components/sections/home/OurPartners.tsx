import { motion } from 'framer-motion'
import { ReactElement, FC } from 'react'
import { fromBottomAnimation } from '../../../utils/animations'
import Accordion from '../../Accordion'
import Image from 'next/image'
// OurPartners Data
const cardData = [
  {
    title: 'Filecoin Foundation',
    img: '/images/others/filecoin_logo.svg',
    color: 'text-[#01D1FF]',
  },
]

// handle single card
const Card: FC<{ title: string; img: string; color: string }> = ({
  title,
  img,
  color,
}) => (
  <div className=" inline-flex h-[15rem] text-center gap-4 p-4 text-white font-family: 'Mulish'; rounded-lg font-semibold">
    <p>
      <Image alt="icon" src={img} height={70} width={70} />
    </p>
    <h5
      className={`pt-[1.2rem] text-[2rem] ${color} leading-[2.375rem] capitalize py-4`}
    >
      {title}
    </h5>
    {/* <p>{body}</p> */}
  </div>
)


// OurPartners section for Home
function OurPartner(): ReactElement {

    const renderCards = cardData.map((card, i) => <Card key={i} {...card} />)
  return (
    <section className="pt-16 lg:py-24  px-[5%] 2xl:px-[12%] text-white bg-[#0A0A0A]">
      <motion.div
        className="grid place-items-center"
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
        <Accordion>
          <Accordion.Title className="text-[5rem]">
            Our <span className="text-[#FF00F8]">Partners</span>
          </Accordion.Title>
          <motion.div
            className=" flex flex-row md:flex-row gap-20"
            variants={fromBottomAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
              delay: 0.7,
            }}
          >
            {renderCards}
          </motion.div>
        </Accordion>
      </motion.div>
    </section>
  )
}

export default OurPartner
