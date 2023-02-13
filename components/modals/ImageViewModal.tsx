import { motion } from 'framer-motion'
import { Dispatch, FC, MouseEvent, SetStateAction } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'
// const NGMMarketAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || ''
// const NGM20Address = process.env.NEXT_PUBLIC_NGM20_ADDRESS || ''
const ImageViewModal: FC<{
  setIsOpen: Dispatch<SetStateAction<{ isOpen: boolean; img: string }>>
  isOpen: boolean
  img: string
}> = ({ setIsOpen, img }) => {
  const handleClose = (e: MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation()
    setIsOpen((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <ModalBase>
      <motion.div
        className="w-[100vw] px-1
    rounded-lg skew-y-1 -skew-x-1  bg-[#030507]/20 fixed top-0 bottom-0"
        variants={fromTopAnimation}
        initial="initial"
        animate="final"
        exit="initial"
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <div className="text-white flex justify-end">
          <p
            className="text-[#B2A4A4] font-thin cursor-pointer lg:text-[25px] font-poppins px-4 pt-1"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </p>
        </div>
        <div className="mt-8 text-white max-h-full grid place-items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt="nft_image"
            className="h-full 2xl:h-[125rem] w-auto object-cover object-center lg:max-h-[43.75rem] xl:max-h-[46.875rem] 2xl:max-h-[125rem]"
          />
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default ImageViewModal
