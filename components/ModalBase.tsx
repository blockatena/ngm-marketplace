import { FC, ReactNode } from 'react'

const ModalBase: FC<{
  children?: ReactNode
}> = ({ children }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 bg-black/20">
      <div className="w-full max-w-full h-full grid place-items-center px-8 relative z-50 backdrop-blur-sm">
        {children}
      </div>
    </div>
  )
}

export default ModalBase
