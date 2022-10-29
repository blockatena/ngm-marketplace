import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'
import useWalletConnect from '../utils/hooks/useWalletConnect'
import Footer from './Footer'

import Header from './Header'

interface LayoutProps {
  children: ReactNode
}

const Buffer = () => {
  const router = useRouter()
  if (router.asPath === '/') {
    return null
  }
  return <div className="bg-transparent w-full h-[100px]"></div>
}

const CurrentFooter = () => {
  const router = useRouter()
  if (router.asPath === '/') {
    return null
  }
  return <Footer />
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { handleConnect } = useWalletConnect()

  useEffect(() => {
    if (sessionStorage.getItem('isConnected') === 'yes') handleConnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex justify-center bg-gradient-to-r from-dark_mild to-dark_heavy">
      <div className=" w-full max-w-[2000px] bg-fixed bg-cover bg-market">
        <Header />
        <Buffer />
        {children}
        <CurrentFooter />
      </div>
    </div>
  )
}

export default Layout
