import { FC, ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center bg-gradient-to-r from-dark_mild to-dark_heavy">
      <div className=" w-full max-w-[2000px] bg-fixed bg-cover bg-market">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
