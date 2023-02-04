import {
  axiosInstance,
  createAxiosInstance,
  nftInstance,
} from '../axiosInstance'
import type {
  Accept1155Offer,
  Cancel1155Offer,
  CollectionNftsBodyType,
  Make1155Offer,
  Nft1155SaleBodyType,
  NftAcceptOfferBodyType,
  nftAuctionBodyType,
  NftBidBodyType,
  nftCancelbidType,
  NftCancelOfferBodyType,
  NftOfferBodyType,
  NftSaleBodyType,
  NftType,
} from '../interfaces'

const axiosFileInstance = createAxiosInstance('form-data')

export const getCollections = (
  page_number: number,
  items_per_page: number = 12
) => {
  return axiosInstance.get(
    `/nft/get-collections/${page_number}/${items_per_page}`
  )
}

export const getAllCollectionNfts = (contractAddress: string) => {
  return axiosInstance.get(`/nft/collection/${contractAddress}`)
}

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

export const getSingleNft = (
  contractAddress: string,
  tokenId: string,
  nftType?: NftType
) => {
  if (nftType === 'NGM1155') {
    // return axiosInstance.get(`/nft/g2w3-1155/${contractAddress}/${tokenId}`)
    return axiosInstance.get(`/nft/get-1155-nft/${contractAddress}/${tokenId}`)
  }
  return axiosInstance.get(`/nft/get-nft/${contractAddress}/${tokenId}`)
}

export const createNftAuction = (data: nftAuctionBodyType) => {
  return axiosInstance.post('/nft-marketplace/create-nft-auction', data)
}

export const cancelAuction = (data: {
  contract_address: string
  token_id: string
  sign: string
}) => {
  return axiosInstance.post('/nft-marketplace/cancel-auction', data)
}

export const placeBid = (data: NftBidBodyType) => {
  return axiosInstance.post('/nft-marketplace/place-nft-bid', data)
}

export const cancelBid = (data: nftCancelbidType) => {
  return axiosInstance.post('/nft-marketplace/cancel-bid', data)
}

export const getCollectionNfts = (data: CollectionNftsBodyType) => {
  if (data.nftType === 'NGM1155') {
    return axiosInstance.post(`/nft/get-nfts-1155-collection`, data)
  }
  return axiosInstance.post(`/nft/get-nfts-listed-collection`, data)
}

export const createNftSale = (data: NftSaleBodyType) => {
  return axiosInstance.post('/nft-marketplace/create-sale', data)
}

export const create1155NftSale = (data: Nft1155SaleBodyType) => {
  return axiosInstance.post('/nft-marketplace/create-sale-1155', data)
}

export const cancelSale = (data: {
  contract_address: string
  token_id: string
  sign: string
}) => {
  return axiosInstance.post('/nft-marketplace/cancel-sale', data)
}

export const cancel1155Sale = (data: {
  contract_address: string
  token_id: string
  token_owner: string
}) => {
  return axiosInstance.post('/nft-marketplace/cancel-sale-1155', data)
}

export const getCollectionDetails = (contractAddress: string) => {
  return axiosInstance.get(`/nft/collection/${contractAddress}`)
}

export const makeOffer = (data: NftOfferBodyType) => {
  return axiosInstance.post('/nft-marketplace/make-offer-to-nft', data)
}

export const cancelOffer = (data: NftCancelOfferBodyType) => {
  return axiosInstance.post('/nft-marketplace/cancel-offer', data)
}

export const acceptOffer = (data: NftAcceptOfferBodyType) => {
  return axiosInstance.post('/nft-marketplace/accept-offer', data)
}

export const make1155Offer = (data: Make1155Offer) => {
  return axiosInstance.post('/nft-marketplace/make-offer-1155', data)
}

export const cancel1155Offer = (data: Cancel1155Offer) => {
  return axiosInstance.post('/nft-marketplace/cancel-offer-1155', data)
}

export const accept1155Offer = (data: Accept1155Offer) => {
  return axiosInstance.post('/nft-marketplace/accept-offer-1155', data)
}

export const createUser = (data: {
  username: string
  email: string
  wallet_address: string
}) => {
  return axiosInstance.post('/users/create-user', data)
}

export const getUser = (wallet_address: string) => {
  return axiosInstance.get(`/users/get-user/${wallet_address}`)
}

export const uploadProfileImg = (data: FormData) => {
  return axiosFileInstance.post('/users/uploadFile', data)
}

export const updateUser = (data: {
  username: string
  wallet_address: string
}) => {
  return axiosInstance.patch('/users/update-user', data)
}

export const getUserActivity = (
  wallet_address: string,
  page_number: number,
  items_per_page: number = 12
) => {
  return axiosInstance.get(
    `/activity/get-user-activity/${wallet_address}/${page_number}/${items_per_page}`
  )
}

export const getNftActivity = (
  contract_address: string,
  token_id: string,
  page_number: number,
  items_per_page: number
) => {
  return axiosInstance.get(
    `/activity/get-item-activity/${contract_address}/${token_id}/${page_number}/${items_per_page}`
  )
}

export const getUserCollections = (
  address: string,
  page_number: number,
  items_per_page: number
) => {
  return axiosInstance.get(
    `/nft/collections-owned/${address}/${page_number}/${items_per_page}`
  )
}

export const getNumberOfTokensForAddress = (
  token_owner: string,
  contract_address: string,
  token_id: string
) => {
  return axiosInstance.get(
    `/nft/g2w3-1155/get-tokens/${token_owner}/${contract_address}/${token_id}`
  )
}

export const getCollectionType = (contract_address: string) => {
  return axiosInstance.get(`/nft/get-type-of-nft/${contract_address}`)
}

export const getUserTokenNumber = (
  token_owner: string,
  contract_address: string,
  token_id: string
) => {
  return axiosInstance.get(
    `/nft/get-1155-usertokens/${contract_address}/${token_id}/${token_owner}`
  )
}

export const getUser1155Nfts = (
  owner_address: string,
  page_number: number,
  items_per_page: number = 12
) => {
  return axiosInstance.get(
    `/nft/g2w3-1155/${owner_address}/${page_number}/${items_per_page}`
  )
}
