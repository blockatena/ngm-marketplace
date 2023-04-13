import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaDiscord } from 'react-icons/fa'
import join_community_image from '../../public/images/others/join_community_image.svg'
import {
  fromLeftAnimation,
  fromRightAnimation,
  opacityAnimation,
} from '../../utils/animations'
import useIsMounted from '../../utils/hooks/useIsMounted'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

// Join Community section
const JoinCommunitySection: React.FC = () => {
  const discordOnClick = () => {
    console.log('JOIN DISCORD')
  }

  const { width } = useWindowDimensions()
  const isMounted = useIsMounted()

  let discordSize: number
  if (isMounted && width < 768) {
    discordSize = 28
  } else if (isMounted && width < 1024) {
    discordSize = 32
  } else {
    discordSize = 38
  }

  return (
    <section className="w-full min-h-[50vh] flex justify-center items-center relative before:top-0 before:bottom-0 before:left-0 before:right-0 before:absolute before:bg-black before:opacity-70 before:z-20">
      <motion.div
        variants={opacityAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          delay: 0.6,
        }}
      >
        <Image src={join_community_image} alt="" />
      </motion.div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 w-full">
        <motion.h3
          variants={fromLeftAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.9,
          }}
          className="text-white text-[34px] md:text-[38px] lg:text-[50px] xl:text-[60px] font-popins text-center"
        >
          Join Our Community
        </motion.h3>
        <motion.p
          variants={opacityAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 1.2,
          }}
          className="text-white max-w-[90%] md:max-w-[660px] text-center mx-auto font-popins font-light  text-[18px] md:text-[26px] lg:text-[30px]"
        >
          We the community at NFTZone have our own discord group consisting of
          150+ members. Be part of it.
        </motion.p>
        <motion.div
          variants={fromRightAnimation}
          initial="initial"
          whileInView="final"
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 1.5,
          }}
          className="w-fit mx-auto"
        >
          <button
            className="btn-primary w-[200px] md:w-[230px] lg:w-[250px] h-[54px] md:h-[60px] lg:h-[69px] text-[20px] md:text-[24px] lg:text-[27px] rounded-xl mt-8"
            onClick={discordOnClick}
          >
            <div className="w-full flex flex-row items-center justify-center">
              <FaDiscord fontSize={discordSize} />
              <p className="ml-4">Discord</p>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default JoinCommunitySection

//
