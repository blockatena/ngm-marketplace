import { FC, ReactNode, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

// Nav Accordion
const NavAccordion: FC<{ children?: ReactNode; heading: string }> = ({
  children,
  heading,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="my-2">
      <h6
        className="bg-[#141414] text-[#F6F6F6] flex justify-between border-l-2 border-custom_yellow 
    px-4 py-2 font-oxygen cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-bold md:text-lg">{heading}</span>{' '}
        <button>
          {!isOpen ? (
            <FaAngleDown className="text-[#9D9D9D]" />
          ) : (
            <FaAngleUp className="text-[#9D9D9D]" />
          )}
        </button>
      </h6>
      <div
        className={`font-oxygen text-xs md:text-[15px] text-white ${
          isOpen && 'px-4'
        } ${isOpen && 'py-3'}
       flex flex-col gap-3 ${
         !isOpen && 'h-0'
       } overflow-hidden transition-all duration-300`}
      >
        {children}
        <hr className="opacity-10" />
      </div>
    </div>
  )
}

export default NavAccordion
