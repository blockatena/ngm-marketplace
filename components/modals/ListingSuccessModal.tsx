import { motion } from 'framer-motion'
import { Dispatch, FC, SetStateAction } from 'react'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'
import { useRouter } from 'next/router'

const ListingSuccessModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  nftname: string
  collection_name: string
  contract_address:string
  token_id:string
}> = ({ setIsOpen, nftname, collection_name,contract_address,token_id }) => {

  const router = useRouter()

  const viewListing =()=>{
    router.push(`/assets/${contract_address}/${token_id}`)
  }
  return (
    <ModalBase>
      <motion.div
        className="w-full max-w-[886px] lg:h-[582px] bg-[#2f2f2f] py-4 px-4 lg:px-10 
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
        <h2 className="text-white flex justify-end">
          <span
            className="text-[#B2A4A4] font-thin cursor-pointer lg:text-[35px] font-poppins"
            onClick={() => setIsOpen(false)}
          >
            X
          </span>
        </h2>
        <div>
          <p className="font-poppins text-white text-xl lg:text-[30px] text-center">
            Your Item has been Listed
          </p>
          <p
            className="font-poppins font-medium text-2xl lg:text-[47px] text-custom_yellow my-8
          text-center lg:my-12"
          >
            Congratulations!!
          </p>
          <div
            className="font-poppins text-white text-base lg:text-[19px] lg:leading-[27px] text-center
          font-semi flex justify-center"
          >
            <p className="max-w-[500px]">
              Your Item {nftname} from {collection_name} Collections has been
              listed for Sale
            </p>
          </div>
          <p className="mt-28">
            <button
              className="btn-primary w-full rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins"
              onClick={() => viewListing()}
            >
              View Listing
            </button>
          </p>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default ListingSuccessModal
