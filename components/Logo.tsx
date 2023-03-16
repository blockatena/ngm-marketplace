import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { fromLeftAnimation } from '../utils/animations'
import useWindowDimensions from '../utils/hooks/useWindowDimensions'


//LOGO Website
const Logo: FC = () => {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const [clientWidth, setClientWidth] = useState(0)

  useEffect(() => {
    setClientWidth(width)
  }, [width])

  return (
    <motion.div
      variants={fromLeftAnimation}
      initial="initial"
      animate="final"
      transition={{
        ease: 'easeInOut',
        duration: 0.6,
        delay: 0.4,
      }}
    >
      <Image
        src="/images/icons/logo.svg"
        alt="nftzone_logo"
        width={clientWidth > 768 ? '188px' : '100px'}
        height={clientWidth > 768 ? '64px' : '46px'}
        className="cursor-pointer"
        onClick={() => router.push('/')}
      />
    </motion.div>
  )
}

export default Logo
