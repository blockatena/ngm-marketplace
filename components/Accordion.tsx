import { motion } from 'framer-motion'
import {
  createContext,
  DetailedHTMLProps,
  Dispatch,
  FC,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface IItemContext {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

// *** CONTEXT  STARTS***
// item-context.ts
const ItemContext = createContext<IItemContext>({} as IItemContext)

const ItemContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const value = { isOpen, setIsOpen }

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
}

const useItemContext = () => {
  const itemContext = useContext(ItemContext)

  if (itemContext === undefined) {
    throw new Error(
      'useItemContext must be used within an ItemContext Provider'
    )
  }

  return itemContext
}

export { ItemContextProvider, useItemContext }
// *** CONTEXT  ENDS***

interface IContainer
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
}

//title
const Title: FC<IContainer> = ({ children, className, ...restProps }) => (
  <div
    role="heading"
    aria-level={2}
    {...restProps}
    className={`${
      className || ''
    } font-inter text-3xl lg:text-[3rem] lg:leading-[3.6rem] text-white text-center mb-8 lg:mb-16`}
  >
    {children}
  </div>
)

//frame

const Frame: FC<IContainer> = ({ children, ...restProps }) => (
  <div {...restProps}>{children}</div>
)

interface IHeader extends IContainer {
  openIcon?: ReactNode
  closeIcon?: ReactNode
}

// Header
const Header: FC<IHeader> = (props) => {
  const { children, className, openIcon, closeIcon, ...restProps } = props
  const { isOpen, setIsOpen } = useItemContext()
  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className={`${
        className ? className : ''
      } cursor-pointer flex items-center justify-between bg-gradient-to-tr to-[#EB7202] from-[#F1CB00] text-black min-h-[3.5625rem] p-4 
        rounded-lg font-poppins text-[1.3125rem] leading-[1.575rem] font-semibold ${
          isOpen ? 'mb-0' : 'mb-2'
        }`}
      {...restProps}
    >
      <div>{children} </div>
      <div className="text-white">{!isOpen ? openIcon : closeIcon}</div>
    </div>
  )
}

//Body
const Body: FC<IContainer> = ({ children, className, ...restProps }) => {
  const { isOpen } = useItemContext()
  return (
    <motion.div
      layout
      className={` ${!isOpen ? 'h-0 p-0' : 'h-fit p-4 '} overflow-hidden`}
    >
      <div
        {...restProps}
        className={`${
          className || ''
        } text-white font-inter text-[1.0625rem] leading-[1.4875rem]`}
      >
        {children}
      </div>
    </motion.div>
  )
}

//Item
const Item: FC<IContainer> = ({ children }) => {
  return <ItemContextProvider>{children}</ItemContextProvider>
}

function Accordion({
  children,
  className,
  ...restProps
}: IContainer): ReactElement {
  return (
    <div className={`${className || ''} max-w-[45.9375rem]`} {...restProps}>
      {children}
    </div>
  )
}

Accordion.Title = Title
Accordion.Frame = Frame
Accordion.Header = Header
Accordion.Body = Body
Accordion.Item = Item

export default Accordion
