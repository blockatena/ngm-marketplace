import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { AvatarType } from '../../interfaces'
import { opacityAnimation } from '../../utils/animations'
import AvatarCard from '../AvatarCard'
import { useQuery } from 'react-query'
import { QUERIES } from '../../react-query/constants'
import { getCollectionNFTs } from '../../react-query/queries'
import { FC, useEffect, useState } from 'react'

// const avatars: AvatarType[] = [
//   {
//     _id: '',
//     contract_address: '',
//     contract_type: '',
//     token_id: '0',
//     meta_data_url: '',
//     is_in_auction: false,
//     is_in_sale: false,
//     token_owner: '',
//     createdAt: '',
//     updatedAt: '',
//     __v: 0,
//     meta_data: {
//       name: '',
//       image: '',
//       description: '',
//       external_uri: '',
//       attributes: [{ name: '', value: '' }],
//     },
//   },
//   {
//     _id: '',
//     contract_address: '',
//     contract_type: '',
//     token_id: '0',
//     meta_data_url: '',
//     is_in_auction: false,
//     is_in_sale: false,
//     token_owner: '',
//     createdAt: '',
//     updatedAt: '',
//     __v: 0,
//     meta_data: {
//       name: '',
//       image: '',
//       description: '',
//       external_uri: '',
//       attributes: [{ name: '', value: '' }],
//     },
//   },
//   {
//     _id: '',
//     contract_address: '',
//     contract_type: '',
//     token_id: '0',
//     meta_data_url: '',
//     is_in_auction: false,
//     is_in_sale: false,
//     token_owner: '',
//     createdAt: '',
//     updatedAt: '',
//     __v: 0,
//     meta_data: {
//       name: '',
//       image: '',
//       description: '',
//       external_uri: '',
//       attributes: [{ name: '', value: '' }],
//     },
//   },
// ]

const ExploreSection: FC<{contractAddress:string;tokenId:string}> = ({contractAddress,tokenId}) => {
  const router = useRouter()
  const [Avatars, setAvatars] = useState<AvatarType[]>([])
  const [explore, setExplore] = useState<AvatarType[]>([])

  const { data, refetch } = useQuery(
    [QUERIES.getCollectionNFTs, contractAddress],
    () => getCollectionNFTs(contractAddress)
  )

  useEffect(() => {
    if (contractAddress === undefined) {
      window.setTimeout(refetch, 1500)
    } else {
      // refetch
    }
  }, [contractAddress, refetch])

  useEffect(() => {
    if(explore?.length>0){
      //
    }
    else if (Avatars?.length > 0) {
      filter2(Avatars)
    } 
  }, [Avatars])

  const filter2 = (Avatars:any) => {
    if (Avatars?.length > 0) {
      var newItems = []
      for (var i = 0; i < 3; i) {
        var idx = Math.floor(Math.random() * Avatars.length)
        if (Avatars[idx].token_id !== tokenId) {
          newItems.push(Avatars[idx])
          Avatars.splice(idx, 1)
          i++
        }
      }
      setExplore(newItems)
    }
  }

  const openCollection = () =>{
    router.push(`/collections/${contractAddress}`)
  }

// console.log(explore)
  useEffect(() => {
    setAvatars(data?.data.nfts)
    // filternfts()
    filter2(Avatars)
  }, [data?.data.nfts])

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
        <p className="font-poppins text-white font-semibold cursor-pointer border-b border-custom_yellow px-1" onClick={()=>{openCollection()}}>
          Explore more
        </p>
      </div>
    </section>
  )
}

export default ExploreSection
