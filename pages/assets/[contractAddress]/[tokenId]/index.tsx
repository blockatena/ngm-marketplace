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
import type {
  AuctionType,
  AvatarType,
  BidType,
  CrumbType,
  NftContractType,
} from '../../../../interfaces'
import leftVector from '../../../../public/images/others/left_vector.png'
import rightVector from '../../../../public/images/others/right_vector.png'
import { QUERIES } from '../../../../react-query/constants'
import {
  getSingleNft,
} from '../../../../react-query/queries'

const initalNftState: AvatarType = {
  _id: '',
  contract_address: '',
  contract_type: '',
  token_id: '0',
  meta_data_url: '',
  is_in_auction: false,
  is_in_sale: false,
  token_owner: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
  meta_data: {
    name: '',
    image: '',
    description: '',
    external_uri: '',
    attributes: [{ name: '', value: '' }],
  },
}

const ViewAssetPage: NextPage = () => {
  const [contractAddress, setContractAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  // const [name, setName] = useState('')
  const [nft, setNft] = useState<AvatarType>(initalNftState)
  const [contractDetails, setContractDetails] = useState<NftContractType>()
  const [endTime, setEndTime] = useState('')
  const [bids, setBids] = useState<BidType[]>()
  const [auctionDetails, setAuctionDetails] = useState<AuctionType>()

  const { data } = useQuery(
    [QUERIES.getSingleNft, contractAddress, tokenId],
    () => getSingleNft(contractAddress, tokenId),
    {
      enabled: !!contractAddress && !!tokenId,
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
    }
  )
  const { asPath } = useRouter()

  const crumbData: CrumbType[] = [
    { name: 'home', route: '/' },
    {
      name: contractDetails?.collection_name || '',
      route: `/collections/${contractDetails?.contract_address}`,
    },
    {
      name: nft?.meta_data?.name,
      route: `/assets/${contractAddress}/${tokenId}`,
    },
  ]

  useEffect(() => {
    setEndTime(data?.data?.auction?.end_date)
    setNft(data?.data.nft)
    // setAvatars(DATA?.data?.data?.nfts)
    setContractDetails(data?.data?.contract_details)
    setBids(data?.data.bids)
    setAuctionDetails(data?.data.auction)
    
  }, [data?.data?.contract_details, data?.data.nft, data])

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
      <PageHeading name={nft?.meta_data?.name} />
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
            <ProductOverviewSection
              endTime={endTime}
              nft={nft}
              contractDetails={contractDetails}
              bids={bids}
              auction={auctionDetails}
            />
          </div>
          <div className="col-span-1 flex justify-end ">
            <div className="w-3 lg:w-7 flex">
              <Image src={rightVector} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 md:px-4 lg:px-0">
        <DescriptionBidHistorySection
          nft={nft}
          contractDetails={contractDetails}
          bids={bids}
          auction={auctionDetails}
        />
        <ExploreSection contractAddress={contractAddress} tokenId={tokenId} />
      </div>
    </main>
  )
}

export default ViewAssetPage
