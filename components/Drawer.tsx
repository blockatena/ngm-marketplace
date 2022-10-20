import { Dispatch, FC, ReactNode, SetStateAction } from 'react'

const Drawer: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children?: ReactNode
}> = ({ setIsOpen, children }) => {
  return (
    <div className="min-h-screen absolute top-0 right-4 left-4 p-4 bg-[#1F2021] rounded-lg">
      <div className="text-right font-light">
        <span className="cursor-pointer" onClick={() => setIsOpen(false)}>
          X
        </span>
      </div>
      {children}
    </div>
  )
}

export default Drawer
