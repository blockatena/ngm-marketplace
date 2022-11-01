import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const getCollections = () => {
  return api.get('/nft/get-collections')
}
