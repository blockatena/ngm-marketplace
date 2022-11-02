import { axiosInstance } from '../axiosInstance'

export const getCollections = () => {
  return axiosInstance.get('/nft/get-collections')
}
