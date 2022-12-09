import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { AvatarType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { getAllCollectionNfts } from '../../react-query/queries'
import { opacityAnimation } from '../../utils/animations'
import AvatarCard from '../AvatarCard'
// const baseURL = process.env.NEXT_PUBLIC_API_URL || ''

const NUMBER_TO_DISPLAY = 3

const ExploreSection: FC<{
  contractAddress: string
  tokenId: string
}> = ({ contractAddress, tokenId }) => {
  const [explore, setExplore] = useState<AvatarType[]>([])
  // const [Avatars, setAvatars] = useState<AvatarType[]>([])
  // const [token, settToken] = useState<Number>()
  const [nfts, setNfts] = useState<AvatarType[]>()

  const { data } = useQuery(
    [QUERIES.getAllCollectionNfts, contractAddress],
    () => getAllCollectionNfts(contractAddress),
    { enabled: !!contractAddress }
  )

  useEffect(() => {
    setNfts(data?.data?.nfts)
  }, [data?.data?.nfts])

  const handleFilter = useCallback(
    (unfilteredNfts: AvatarType[]) => {
      if (!unfilteredNfts?.length) return

      const randomIndexes: number[] = []

      if (unfilteredNfts.length > NUMBER_TO_DISPLAY) {
        while (randomIndexes.length < NUMBER_TO_DISPLAY) {
          let randomIndex = Math.floor(Math.random() * unfilteredNfts.length)

          if (
            unfilteredNfts[randomIndex].token_id !== tokenId &&
            !randomIndexes.some((index) => index === randomIndex)
          ) {
            randomIndexes.push(randomIndex)
            // setExplore((prev) => [...prev, unfilteredNfts[randomIndex]])
          }
        }
        const exploreData = []
        for (let i = 0; i < NUMBER_TO_DISPLAY; i++) {
          exploreData.push(unfilteredNfts[randomIndexes[i]])
        }
        setExplore(exploreData)
      }

      if (
        unfilteredNfts.length < NUMBER_TO_DISPLAY + 1 &&
        randomIndexes.length < NUMBER_TO_DISPLAY
      ) {
        setExplore(unfilteredNfts.filter((nft) => nft.token_id !== tokenId))
      }
    },
    [tokenId]
  )

  useEffect(() => {
    nfts && handleFilter(nfts)
  }, [nfts, handleFilter])

  // const getNFTs = () => {
  //   if (Avatars?.length > 0) {
  //     return
  //   } else {
  //     let url = `${baseURL}/nft/collection/${contractAddress}`
  //     // console.log(url)
  //     if (contractAddress) {
  //       fetch(url)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (Avatars?.length > 0) {
  //             //
  //           } else {
  //             setAvatars(data.nfts)
  //           }
  //         })
  //     }
  //   }
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   if (token !== parseInt(tokenId)) {
  //     filter2(Avatars)
  //     let tok = parseInt(tokenId)
  //     settToken(tok)
  //   } else if (token == 0 && tokenId) {
  //     let tok = parseInt(tokenId)
  //     settToken(tok)
  //   }
  // })

  // useEffect(() => {
  //   if (explore[2] === undefined) {
  //     filter2(Avatars)
  //   } else if (explore?.length > 0) {
  //     return
  //   } else {
  //     filter2(Avatars)
  //   }
  // })

  // useEffect(() => {
  //   if (Avatars?.length > 0) {
  //     return
  //   } else {
  //     getNFTs()
  //   }
  // })

  // const filter2 = (Avatars: any) => {
  //   if (Avatars?.length > 0) {
  //     var newItems = []
  //     for (var i = 0; i < 3; i++) {
  //       var idx = Math.floor(Math.random() * Avatars.length)
  //       if (Avatars?.[idx]?.token_id !== tokenId || Avatars?.[idx]?.token_id) {
  //         newItems.push(Avatars[idx])
  //         Avatars.splice(idx, 1)
  //       } else {
  //         i--
  //       }
  //     }
  //     setExplore(newItems)
  //   }
  // }

  const router = useRouter()
  const openCollection = () => {
    router.push(`/collections/${contractAddress}`)
  }

  return (
    <section className="mt-8 mb-12">
      <h3 className="font-poppins text-lg lg:text-[40px] text-center text-white mb-10">
        You may also like
      </h3>
      <div
        className="pb-20 md:px-4  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3
      gap-20 w-full  max-w-full mx-auto px-6 py-9"
      >
        {explore?.map((cardData, index) => (
          <motion.div
            className="flex justify-center"
            key={index}
            variants={opacityAnimation}
            initial="initial"
            whileInView="final"
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.6,
              delay: index * 0.4,
            }}
          >
            <AvatarCard {...cardData} />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center">
        <p
          className="font-poppins text-white font-semibold cursor-pointer border-b border-custom_yellow px-1"
          onClick={() => {
            openCollection()
          }}
        >
          Explore more
        </p>
      </div>
    </section>
  )
}

export default ExploreSection
