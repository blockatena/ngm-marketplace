import { axiosInstance, nftInstance } from '../axiosInstance'

export const getCollections = () => {
  return axiosInstance.get('/nft/get-collections')
}

export const getCollectionNFTs = (ContractAddress: any) => {
  return axiosInstance.get(`/nft/collection/${ContractAddress}`)
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
