import { axiosInstance, nftInstance } from '../axiosInstance'
import type {
  CollectionNftsBodyType,
  nftAuctionBodyType,
  NftBidBodyType,
  nftCancelbidType,
  NftOfferBodyType,
  NftSaleBodyType,
  NftCancelOfferBodyType
} from '../interfaces'


export const getCollections = (
  page_number: number,
  items_per_page: number = 12
) => {
  return axiosInstance.get(
    `/nft/get-collections/${page_number}/${items_per_page}`
  )
}

// export const getCollectionNFTs = (ContractAddress: any) => {
//   return axiosInstance.get(`/nft/collection/${ContractAddress}`)
// }

export const getCollectionInfo = (ContractAddress: any) => {
  return axiosInstance.get(`/deployment/contract-Details/${ContractAddress}`)
}

export const getNft = (metadata: any) => {
  return nftInstance.get(metadata)
}

export const getAllNFts = (
  page_number: number,
  items_per_page: number = 12
) => {
  return axiosInstance.get(`/nft/Get-all-nfts/${page_number}/${items_per_page}`)
}

export const getSingleNft = (contractAddress: string, tokenId: string) =>
  axiosInstance.get(`/nft/get-nft/${contractAddress}/${tokenId}`)

export const createNftAuction = (data: nftAuctionBodyType) => {
  return axiosInstance.post('/nft-marketplace/create-nft-auction', data)
}

export const cancelAuction = (data: {
  contract_address: string
  token_id: string
}) => {
  return axiosInstance.post('/nft-marketplace/cancel-auction', data)
}

export const placeBid = (data: NftBidBodyType) => {
  return axiosInstance.post('/nft-marketplace/place-nft-bid', data)
}

export const cancelBid = (data: nftCancelbidType) => {
  return axiosInstance.post('/nft-marketplace/cancel-bid', data)
}

export const getCollectionNfts = (data: CollectionNftsBodyType) =>
  axiosInstance.post(`/nft/get-nfts-listed-collection`, data)

export const createNftSale = (data: NftSaleBodyType) => {
  return axiosInstance.post('/nft-marketplace/create-sale', data)
}

export const cancelSale = (data: {
  contract_address: string
  token_id: string
}) => {
  return axiosInstance.post('/nft-marketplace/cancel-sale', data)
}

export const getCollectionDetails = (contractAddress: string) => {
  return axiosInstance.get(`/nft/collection/${contractAddress}`)
}

export const makeOffer = (data: NftOfferBodyType) => {
  return axiosInstance.post('/nft-marketplace/make-offer-to-nft', data)
}


export const cancelOffer = (data:NftCancelOfferBodyType) => {
  return axiosInstance.post('/nft-marketplace/cancel-offer',data)
}