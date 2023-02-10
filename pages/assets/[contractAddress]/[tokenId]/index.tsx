import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'
import BreadCrumb from '../../../../components/BreadCrumb'
import PageHeading from '../../../../components/PageHeading'
import Pagination from '../../../../components/Pagination'
import DescriptionBidHistorySection from '../../../../components/sections/DescriptionBidHistorySection'
import ExploreSection from '../../../../components/sections/ExploreSection'
import ProductOverviewSection from '../../../../components/sections/ProductOverviewSection'
import withProtection from '../../../../components/withProtection'
import type {
  ActivityType,
  AuctionType,
  AvatarType,
  BidType,
  CrumbType,
  ListingType,
  NftContractType,
  NftType,
  OfferType,
  SaleType,
  UserType,
} from '../../../../interfaces'
import leftVector from '../../../../public/images/others/left_vector.png'
import rightVector from '../../../../public/images/others/right_vector.png'
import { QUERIES } from '../../../../react-query/constants'
import {
  getCollectionType,
  getNftActivity,
  getNumberOfTokensForAddress,
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

const initialActivity: any = [
  {
    _id: ' ',
    event: ' ',
    item: {
      name: ' ',
      contract_address: ' ',
      token_id: ' ',
      image: ' ',
    },
    price: ' ',
    quantity: ' ',
    from: ' ',
    to: ' ',
    read: ' ',
    createdAt: ' ',
    updatedAt: ' ',
    __v: 0,
  },
  {
    _id: ' ',
    event: ' ',
    item: {
      name: ' ',
      contract_address: ' ',
      token_id: ' ',
      image: ' ',
    },
    price: ' ',
    quantity: ' ',
    from: ' ',
    to: ' ',
    read: ' ',
    createdAt: ' ',
    updatedAt: ' ',
    __v: 0,
  },
  {
    _id: ' ',
    event: ' ',
    item: {
      name: ' ',
      contract_address: ' ',
      token_id: ' ',
      image: ' ',
    },
    price: ' ',
    quantity: ' ',
    from: ' ',
    to: ' ',
    read: ' ',
    createdAt: ' ',
    updatedAt: ' ',
    __v: 0,
  },
  {
    _id: ' ',
    event: ' ',
    item: {
      name: ' ',
      contract_address: ' ',
      token_id: ' ',
      image: ' ',
    },
    price: ' ',
    quantity: ' ',
    from: ' ',
    to: ' ',
    read: ' ',
    createdAt: ' ',
    updatedAt: ' ',
    __v: 0,
  },
  {
    _id: ' ',
    event: ' ',
    item: {
      name: ' ',
      contract_address: ' ',
      token_id: ' ',
      image: ' ',
    },
    price: ' ',
    quantity: ' ',
    from: ' ',
    to: ' ',
    read: ' ',
    createdAt: ' ',
    updatedAt: ' ',
    __v: 0,
  },
]

const ViewAssetPage: NextPage = () => {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  // const [name, setName] = useState('')
  const [nft, setNft] = useState<AvatarType>(initalNftState)
  const [contractDetails, setContractDetails] = useState<NftContractType>()
  const [endTime, setEndTime] = useState('')
  const [bids, setBids] = useState<BidType[]>()
  const [auctionDetails, setAuctionDetails] = useState<AuctionType>()
  const [offers, setOffers] = useState<OfferType[]>()
  const [ownerDetails, setOwnerDetails] = useState<UserType>()
  const [saleDetails, setSaleDetails] = useState<SaleType>()
  const [sales, setSales] = useState<ListingType[]>()
  const [activityDetails, setActivityDetails] = useState<ActivityType>()
  const [currentTab, setCurrenttab] = useState<any>()
  const [totalPages, setTotalpges] = useState<any>()
  const [section, setSection] = useState<boolean>()
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const [page_number, setCurrentPage] = useState<number>(1)
  const refetchtime: number = 10000

  const { data: contractType } = useQuery(
    [QUERIES.getCollectionType, contractAddress],
    () => getCollectionType(contractAddress),
    { enabled: !!contractAddress }
  )
  const nftType: NftType | undefined = contractType?.data?.type

  const activities = useQuery(
    [QUERIES.getNftActivity, contractAddress, tokenId, page_number],
    () => getNftActivity(contractAddress, tokenId, page_number, 10),
    {
      enabled: !!contractAddress && !!tokenId && !!nftType,
      refetchInterval: refetchtime,
      refetchIntervalInBackground: true,
    }
  )

  const { data } = useQuery(
    [QUERIES.getSingleNft, contractAddress, tokenId, nftType],
    () => getSingleNft(contractAddress, tokenId, nftType),
    {
      enabled: !!contractAddress && !!tokenId && !!nftType,
      refetchInterval: refetchtime,
      refetchIntervalInBackground: true,
    }
  )

  const { data: userTokenNumber } = useQuery(
    [QUERIES.getUserTokenNumber, contractAddress, tokenId, address],
    () => getNumberOfTokensForAddress(`${address}`, contractAddress, tokenId),
    { enabled: !!contractAddress && !!tokenId && !!address }
  )

  const numberOfTokensOwned: number | null = userTokenNumber?.data
    ?.number_of_tokens?.tokens
    ? userTokenNumber.data.number_of_tokens.tokens
    : null

  const state = () => {
    setSection(true)
  }

  const states = () => {
    setSection(false)
  }
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
    setEndTime(
      data?.data?.auction?.end_date
        ? data?.data?.auction?.end_date
        : data?.data?.sale?.end_date
        ? data?.data?.sale?.end_date
        : ''
    )
    setNft(data?.data?.nft || data?.data?.nft1155)
    // setAvatars(DATA?.data?.data?.nfts)
    setContractDetails(data?.data?.contract_details || data?.data?.collection)
    setBids(data?.data?.bids)
    setAuctionDetails(data?.data.auction)
    setOffers(data?.data?.offers)
    setOwnerDetails(data?.data?.token_owner_info)
    setSaleDetails(data?.data?.sale)
    setSales(data?.data?.sales)
    setActivityDetails(activities.data?.data.activity_data)
    setTotalpges(activities.data?.data?.total_pages)
    if (activities.isLoading) {
      setActivityDetails(initialActivity)
    }
  }, [data, activities])

  const owners: any[] | undefined = data?.data?.owners

  useEffect(() => {
    if (asPath) {
      const routeArr = asPath.split('/')
      setContractAddress(routeArr[routeArr.length - 2])
      setTokenId(routeArr[routeArr.length - 1])
    }
  }, [asPath])

  const handleTabs = () => {
    if (currentTab === 0) {
      setCurrenttab('')
    } else if (currentTab === '') {
      return
    } else {
      setCurrenttab(0)
    }
  }

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
          <div className="col-span-10 flex justify-left">
            <ProductOverviewSection
              offers={offers}
              endTime={endTime}
              nft={nft}
              contractDetails={contractDetails}
              bids={bids}
              auction={auctionDetails}
              sale={saleDetails}
              sales={sales}
              setActiveTabIndex={handleTabs}
              owner={ownerDetails}
              nftType={nftType}
              owners={owners}
              tokensOwned={numberOfTokensOwned}
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
          offers={offers}
          sale={saleDetails}
          activity={activityDetails}
          currentTab={currentTab}
          owners={owners}
          nftType={nftType}
          handleTabs={handleTabs}
          state={state}
          states={states}
          sales={sales}
        />
        {section && (
          <div className="flex justify-end mb-12">
            <Pagination
              totalPages={totalPages}
              paginate={paginate}
              currentPage={page_number}
            />
          </div>
        )}
        <ExploreSection contractAddress={contractAddress} tokenId={tokenId} />
      </div>
    </main>
  )
}

export default withProtection(ViewAssetPage)
