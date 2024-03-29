import { motion } from 'framer-motion'
import { Dispatch, FC, SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import { shortenString } from '../../utils'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'
import Spinner from '../Spinner'


// Account Create Confirmation Modal
const AccountConfirmationModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  user: { email: string; username: string }
  createUser: (
    _email: string,
    _wallet_address: string,
    _username: string
  ) => void
  isLoading: boolean
}> = ({ setIsOpen, user: { email, username }, createUser, isLoading }) => {
  const { address } = useAccount()

  // handle confirmation click
  const handleClick = () => {
    createUser(email, String(address), username)
  }

  return (
    <ModalBase>
      <motion.div
        className="w-full max-w-[866px] lg:h-[382px] py-4 px-4 lg:px-10 
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
        <p className="text-white text-right font-inter font-thin lg:text-2xl mb-6">
          <span
            className="cursor-pointer"
            role="buton"
            onClick={() => setIsOpen(false)}
          >
            x
          </span>
        </p>
        <h2 className="text-white font-poppins text-lg lg:text-xl text-center my-4">
          Are you sure you want to link{' '}
          <span className="text-custom_yellow">{email}</span> to{' '}
          <span className="text-custom_yellow">
            {address && shortenString(String(address), 4, 4)}
          </span>
          ?
        </h2>
        {/* {isLoading && (
          <div className="py-4 grid place-items-center">
            <Spinner />
          </div>
        )} */}

        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between gap-2 lg:gap-4 lg:pt-10">
            <button
              className="btn-secondary w-full md:w-1/2 h-[42px] md:h-16 text-sm lg:text-[21px]"
              onClick={() => setIsOpen(false)}
            >
              No
            </button>
            <button
              className="w-full btn-primary md:w-1/2 rounded-lg h-[42px] md:h-16 text-[18px] lg:text-[27px] font-poppins grid place-items-center"
              onClick={handleClick}
            >
              {isLoading ? <Spinner color="black" /> : 'Yes'}
            </button>
          </div>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default AccountConfirmationModal
