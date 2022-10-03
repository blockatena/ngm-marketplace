import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { CollectionCardType } from '../interfaces'

interface CollectionCardProps extends CollectionCardType {}

const CollectionCard: FC<CollectionCardProps> = ({
  name,
  imageFront,
  imageMiddle,
  imageBack,
}) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="w-[352px] h-[430px]  relative flex justify-center cursor-pointer 
    hover:-translate-y-8 transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push('/product/1')}
    >
      <div
        className={`bg-transparent  w-[80%] absolute z-10 top-6 bottom-6 skew-y-6 -skew-x-6 ml-[10%]
      rounded-lg border-2 ${
        isHovered ? 'border-custom_yellow' : 'border-white'
      }`}
      >
        <Image src={imageBack} alt="collection_img" layout="fill" />
      </div>
      <div
        className={`bg-transparent  w-[80%] absolute z-20 top-8 bottom-6 skew-y-3 -skew-x-6 ml-[6%]
      rounded-lg border-2 ${
        isHovered ? 'border-custom_yellow' : 'border-white'
      }`}
      >
        <Image src={imageMiddle} alt="collection_img" layout="fill" />
      </div>
      <div
        className={`bg-transparent   w-[80%] absolute z-30 top-14 bottom-6 mr-[2%] 
      rounded-lg border-2 ${
        isHovered ? 'border-custom_yellow' : 'border-white'
      }`}
      >
        <Image src={imageFront} alt="collection_img" layout="fill" />
      </div>
      <div
        className={`h-[77px] absolute z-40 bottom-0 left-0 right-0 rounded-lg 
       bg-cover grid place-items-center border-2 ${
         isHovered
           ? 'border-custom_yellow bg-collectionCardActive'
           : 'border-white bg-collectionCard'
       }`}
      >
        <p className="text-white font-medium font-poppins text-lg lg:text-[29px] capitalize">
          {name}
        </p>
      </div>
    </div>
  )
}

export default CollectionCard
