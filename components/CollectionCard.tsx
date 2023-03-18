import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { CollectionCardType } from '../interfaces'

interface CollectionCardProps extends CollectionCardType {}

// PlaceHolder Image for collection
const placeholderImg = '/images/collections/placeholder.jpg'


// Collection card
const CollectionCard: FC<CollectionCardProps> = ({
  collection_name,
  contract_address,
  __v,
  _id,
  imageuri,
}) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`${
        router?.asPath == '/profile'
          ? 'h-[350px] w-[330px]'
          : 'w-[320px] h-[390px]'
      }  relative flex justify-center cursor-pointer 
    hover:-translate-y-8 transition-all`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/collections/${contract_address}`)}
    >
      <div
        className={`bg-transparent  w-[80%] absolute z-10 top-6 bottom-6 skew-y-6 -skew-x-6 ml-[10%]
      rounded-lg border-2 ${
        isHovered ? 'border-custom_yellow' : 'border-white'
      }`}
      >
        {imageuri?.[2] ? (
          <Image
            loader={() => imageuri[2]}
            src={imageuri[2]}
            alt="collection_img"
            layout="fill"
          />
        ) : (
          <Image src={placeholderImg} alt="collection_img" layout="fill" />
        )}
      </div>
      <div
        className={`bg-transparent  w-[80%] absolute z-20 top-8 bottom-6 skew-y-3 -skew-x-6 ml-[6%]
      rounded-lg border-2 ${
        isHovered ? 'border-custom_yellow' : 'border-white'
      }`}
      >
        {imageuri?.[1] ? (
          <Image
            loader={() => imageuri[1]}
            src={imageuri[1]}
            alt="collection_img"
            layout="fill"
          />
        ) : (
          <Image src={placeholderImg} alt="collection_img" layout="fill" />
        )}
      </div>
      <div
        className={`bg-transparent   w-[80%] absolute z-30 top-14 bottom-6 mr-[2%] 
      rounded-lg border-2 ${
        isHovered ? 'border-custom_yellow' : 'border-white'
      }`}
      >
        {imageuri?.[0] ? (
          <Image
            loader={() => imageuri[0]}
            src={imageuri[0]}
            alt="collection_img"
            layout="fill"
          />
        ) : (
          <Image src={placeholderImg} alt="collection_img" layout="fill" />
        )}
      </div>
      <div
        className={`h-[77px] absolute z-40 bottom-0 left-0 right-0 rounded-lg 
       bg-cover grid place-items-center border-2 ${
         isHovered
           ? 'border-custom_yellow bg-collectionCardActive'
           : 'border-white bg-collectionCard'
       }`}
      >
        <p
          className={`text-white font-medium font-poppins  ${
            router?.asPath == '/profile'
              ? 'text-base lg:text-[20px]'
              : 'text-lg lg:text-[29px]'
          } capitalize`}
        >
          {collection_name}
        </p>
      </div>
    </div>
  )
}

export default CollectionCard
