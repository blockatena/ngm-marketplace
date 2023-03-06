import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction } from 'react'
import { shortenString } from '../../utils'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'

// The function view owners one by one
const Owner: FC<{ owner: any; isLast?: boolean }> = ({ owner, isLast }) => {
  const router = useRouter()
  return (
    <div
      className={`flex justify-between ${
        !isLast && 'border-b'
      } border-gray-300 text-white font-poppins lg:text-xl py-4`}
    >
      <div>
        <p>
          <span
            className="cursor-pointer hover:text-custom_yellow"
            onClick={() => router.push(`/profile/${owner?.token_owner}`)}
          >
            {shortenString(owner?.token_owner || '', 6, 4)}
          </span>
        </p>
      </div>
      <div>
        <p>{`${owner?.number_of_tokens} items`}</p>
      </div>
    </div>
  )
}


// View Owners Modal
const ViewOwnersModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  owners?: any[]
}> = ({ setIsOpen, owners }) => {
  return (
    <ModalBase>
      <motion.div
        className="w-full max-w-[866px] lg:h-[400px] py-4 px-4 lg:px-10 overflow-y-auto 
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
        <div className="text-white flex justify-end mb-4">
          <div className="w-[66%] flex justify-between">
            <h2 className="font-poppins text-[20px] lg:text-[30px]">
              Owned By
            </h2>{' '}
            <p
              className="text-[#B2A4A4] font-thin cursor-pointer lg:text-[25px] font-poppins"
              onClick={() => setIsOpen(false)}
            >
              X
            </p>
          </div>
        </div>
        <div>
          {owners?.map((owner, index) => (
            <Owner
              key={index}
              owner={owner}
              isLast={owners.length === index + 1}
            />
          ))}
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default ViewOwnersModal
