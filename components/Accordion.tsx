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
import { IoAdd, IoRemove } from 'react-icons/io5'

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

const Title: FC<IContainer> = ({ children, className, ...restProps }) => (
  <div
    role="heading"
    aria-level={2}
    {...restProps}
    className={`${
      className || ''
    } font-inter text-3xl lg:text-[3rem] lg:leading-[3.6rem] font-bold text-white text-center mb-8 lg:mb-16`}
  >
    {children}
  </div>
)

const Frame: FC<IContainer> = ({ children, ...restProps }) => (
  <div {...restProps}>{children}</div>
)

const Header: FC<IContainer> = ({ children, className, ...restProps }) => {
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
      <div className="text-white">{!isOpen ? <IoAdd /> : <IoRemove />}</div>
    </div>
  )
}

const Body: FC<IContainer> = ({ children, className, ...restProps }) => {
  const { isOpen } = useItemContext()
  return (
    <div
      {...restProps}
      className={`${className || ''} ${
        !isOpen ? 'h-0 p-0' : 'h-fit p-4'
      } bg-[#0A0A0A] text-white font-inter text-[1.0625rem] leading-[1.4875rem] transition-all duration-300 overflow-hidden`}
    >
      {children}
    </div>
  )
}

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
