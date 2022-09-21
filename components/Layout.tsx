import { FC, ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-fixed bg-cover flex justify-center bg-gradient-to-r from-dark_mild to-dark_heavy">
      <div
        className="screen-container w-full bg-fixed bg-cover"
        style={{
          backgroundImage: "url('/img/background.png')",
        }}
      >
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
