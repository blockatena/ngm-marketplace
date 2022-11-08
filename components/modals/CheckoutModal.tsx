import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction } from 'react'
import AvatarCard from '../../components/AvatarCard'
import { AvatarType } from '../../interfaces'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'

const CheckoutModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  nft: AvatarType
}> = ({ setIsOpen, nft }) => {
  return (
    <ModalBase>
      <motion.div
        className="w-full max-w-[1017px] lg:h-[646px] bg-[#2f2f2f] py-4 px-4 lg:px-10 
    rounded-lg skew-y-1 -skew-x-1"
        variants={fromTopAnimation}
        initial="initial"
        animate="final"
        exit="initial"
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <h2 className="text-white flex justify-between">
          <span className="font-poppins font-semibold text-[35px] lg:text-[50px]">
            Checkout
          </span>{' '}
          <span
            className="text-[#B2A4A4] font-thin cursor-pointer lg:text-[35px] font-poppins"
            onClick={() => setIsOpen(false)}
          >
            X
          </span>
        </h2>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 flex justify-center md:block">
            <AvatarCard
              // name="Wraith"
              // img="/images/auction/auction_img_1.svg"
              variant="xs"
              noCta
              {...nft}
              // token_id={1}
              // contract_address="0xfd3b3575630c02b8047B911c22d3f3bfF3ad64Ce" contract_type={''} createdAt={''} meta_data_url={''} token_owner={''} updatedAt={''} __v={undefined} _id={''}
            />
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className=" capitalize border-l-[4px] border-custom_yellow pl-2">
              <p className="text-custom_yellow lg:text-[36px] font-play mb-2">
                Apex Legend
              </p>
              <p className="text-white text-2xl lg:text-[49px] font-josefin">
                Fuse
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <p className="text-white font-poppins font-light lg:text-[28px]">
                Price
              </p>
              <p className="text-white font-poppins font-medium lg:text-[30px]">
                <Image
                  src="/images/icons/eth.svg"
                  width="21px"
                  height="21px"
                  alt="eth_logo"
                />{' '}
                10.89 WETH
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-white font-poppins font-light lg:text-[23px]">
            Tx Fee
          </p>
          <p className="text-white font-poppins font-medium lg:text-[20px]">
            <Image
              src="/images/icons/eth.svg"
              width="16px"
              height="15px"
              alt="eth_logo"
            />{' '}
            1.89 WETH
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-white font-poppins font-medium lg:text-[36px]">
            You Pay
          </p>
          <p className="text-white font-poppins font-bold lg:text-[28px] ">
            <Image
              src="/images/icons/eth.svg"
              width="21px"
              height="23px"
              alt="eth_logo"
            />{' '}
            11.89 WETH
          </p>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between gap-2 lg:gap-4">
          <button
            className="btn-tertiary w-full md:w-1/2 h-[42px] md:h-16 text-sm lg:text-[21px]"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button className="btn-primary w-full md:w-1/2 rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins">
            Buy Now
          </button>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default CheckoutModal
