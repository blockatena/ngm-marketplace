import { FC, ReactNode } from 'react'

const ModalBase: FC<{
  children?: ReactNode
}> = ({ children }) => {
  return (
    <div>
      <div className="w-full max-w-full grid place-items-center px-8 absolute right-[1px] top-[200px] z-50">
        {children}
      </div>
      <div className="fixed top-0 bottom-0 left-0 right-0 opacity-50 z-40 bg-black"></div>
    </div>
  )
}

export default ModalBase
