import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import BreadCrumb from '../../../../components/BreadCrumb'
import PageHeading from '../../../../components/PageHeading'
import DescriptionBidHistorySection from '../../../../components/sections/DescriptionBidHistorySection'
import ExploreSection from '../../../../components/sections/ExploreSection'
import ProductOverviewSection from '../../../../components/sections/ProductOverviewSection'
import type { AvatarType, CrumbType } from '../../../../interfaces'
import leftVector from '../../../../public/images/others/left_vector.png'
import rightVector from '../../../../public/images/others/right_vector.png'
import { QUERIES } from '../../../../react-query/constants'
import { getSingleNft } from '../../../../react-query/queries'

const ViewAssetPage: NextPage = () => {
  const [contractAddress, setContractAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [name, setName] = useState('')
  const [nft, setNft] = useState<AvatarType>()
  const { data } = useQuery(
    [QUERIES.getSingleNft, contractAddress, tokenId],
    () => getSingleNft(contractAddress, tokenId)
  )
  const { asPath } = useRouter()

  const crumbData: CrumbType[] = [
    { name: 'home', route: '/' },
    {
      name: nft?.contract_details.collection_name || '',
      route: `/collections/${nft?.contract_address}`,
    },
    {
      name,
      route: `/assets/${contractAddress}/${tokenId}`,
    },
  ]

  useEffect(() => {
    setNft(data?.data)
    if (data?.data) {
      fetch(data.data.meta_data_url)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name)
        })
        .catch((err) => console.error(err))
    }
  }, [data?.data])

  useEffect(() => {
    if (asPath) {
      const routeArr = asPath.split('/')
      setContractAddress(routeArr[routeArr.length - 2])
      setTokenId(routeArr[routeArr.length - 1])
    }
  }, [asPath])

  return (
    <main className="min-h-screen p-2 pt-6 lg:px-16 mb-6">
      <div className="px-2 md:px-4 lg:px-0">
        <BreadCrumb crumbs={crumbData} />
      </div>
      <PageHeading name={name} />
      <div className="mt-16 mb-8">
        <div className="w-full h-[20px] md:h-[40px] flex mb-4">
          <Image
            src="/images/others/top_vector.png"
            alt=""
            height="30px"
            width="2000px"
          />
        </div>
        <div className="grid grid-cols-12 ">
          <div className="col-span-1 w-3 lg:w-7 flex">
            <Image src={leftVector} alt="" />
          </div>
          <div className="col-span-10 flex justify-center">
            <ProductOverviewSection nft={nft} name={name} />
          </div>
          <div className="col-span-1 flex justify-end ">
            <div className="w-3 lg:w-7 flex">
              <Image src={rightVector} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 md:px-4 lg:px-0">
        <DescriptionBidHistorySection nft={nft} />
        <ExploreSection />
      </div>
    </main>
  )
}

export default ViewAssetPage
