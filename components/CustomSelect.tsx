import { Dispatch, FC, SetStateAction, useState } from 'react'
import { selectDataType } from '../interfaces'

interface CustomSelectProps {
  selectedItem: string
  setSelectedItem: Dispatch<SetStateAction<string>>
  selectData: selectDataType[]
  label: string
}

const CustomSelect: FC<CustomSelectProps> = ({
  selectedItem,
  setSelectedItem,
  selectData,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (item: string) => {
    setSelectedItem(item)
    setIsOpen(false)
  }

  return (
    <div className="grid place-items-center font-inter relative">
      <div className="bg-[#101213] top-2 right-6 px-1 my-0 text-[10px] text-white relative ">
        {label}
      </div>
      <button
        className="w-[150px] h-[45px] text-white bg-[#101213] border border-[#E5E5E5] capitalize
            font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex justify-between items-center"
        type="button"
        data-dropdown-toggle="dropdown"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedItem}</span>
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 6.20693L0 0.639709H12L6 6.20693Z" fill="white" />
        </svg>
      </button>
      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="relative w-[116px] bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-2"
          id="dropdown"
        >
          <ul className="py-1 bg-[#1B1B1E] " aria-labelledby="dropdown">
            {selectData?.map(({ name, value }, index) => {
              return (
                <li key={index}>
                  <a
                    href="#"
                    className="text-[11px] hover:bg-custom_yellow hover:text-black text-[#E5E5E5] block px-4 py-1"
                    onClick={() => handleSelect(value)}
                  >
                    {name}
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="triangle bg-[#1B1B1E] w-3 h-3 left-2 absolute -top-2 z-20"></div>
        </div>
      )}
    </div>
  )
}

export default CustomSelect
