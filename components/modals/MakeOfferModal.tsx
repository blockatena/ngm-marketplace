import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction } from 'react'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'

const MakeOfferModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}> = ({ setIsOpen }) => {
  return (
    <ModalBase>
      <motion.div
        className="w-full max-w-[866px] lg:h-[482px] py-4 px-4 lg:px-10 
    rounded-lg skew-y-1 -skew-x-1 bg-gradient-to-b from-[#494A4A] via-[#222324] to-[#030507]"
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
          <div className="w-[66%] flex justify-between">
            <h2 className="font-poppins text-[20px] lg:text-[30px]">
              Make an Offer
            </h2>{' '}
            <p
              className="text-[#B2A4A4] font-thin cursor-pointer lg:text-[25px] font-poppins"
              onClick={() => setIsOpen(false)}
            >
              X
            </p>
          </div>
        </div>
        <div className="mt-8">
          <div className="font-poppins lg:text-[20px] flex justify-between mb-2">
            <label htmlFor="offer_amount" className="text-white">
              Offer Amount
            </label>
            <span className="text-[#AEA8A8]">Balance : 0.00ETH </span>
          </div>
          <div className="h-[47px] relative rounded-lg">
            <input
              type="text"
              id="offer_amount"
              className="outline-none w-full h-full bg-[#585858] pl-[25%] text-white rounded-lg"
            />
            <p className="text-white font-poppins font-semibold lg:text-[22px] absolute top-3 left-4">
              <Image
                src="/images/icons/eth.svg"
                width="15px"
                height="23px"
                alt="eth_logo"
              />{' '}
              <span>ETH</span>
            </p>
          </div>
          <p className="font-poppins text-xs lg:text-[17px] text-[#7C7C7C] mt-2">
            The next bid must be 5% more than the current bid
          </p>

          <div className="mt-10 ">
            <label
              htmlFor="expiration"
              className="font-poppins lg:text-[20px] text-white"
            >
              Offer Expiration{' '}
            </label>
            <div className="flex gap-4 justify-between mt-2">
              <select
                id="expiration"
                className="lg:w-[243px] lg:h-[47px] cursor-pointer bg-[#585858] outline-none rounded-lg
                font-poppins text-white text-center"
              >
                <option value={3}>3 days</option>
                <option value={2}>2 days</option>
                <option value={1}>1 day</option>
              </select>
              <input
                type="time"
                className="w-full bg-[#585858] outline-none rounded-lg text-white font-poppins px-2"
              />
            </div>
          </div>

          <div className="mt-10 flex gap-4 lg:pl-10">
            <input
              type="checkbox"
              id="terms"
              className="bg-[#585858] text-black cursor-pointer lg:text-[21px]"
            />
            <p className="font-poppins text-white text-xs md:text-base">
              By clicking this box, I agree to NGM{' '}
              <span className="text-[#4F95FF] cursor-pointer">
                terms of services
              </span>{' '}
            </p>
          </div>

          <div className="grid place-items-center mt-8">
            <button
              className="btn-primary w-[200px] h-[40px] lg:w-[375px] lg:h-[57px] rounded-lg font-poppins lg:text-[25px]
            "
            >
              Make Offer
            </button>
          </div>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default MakeOfferModal
