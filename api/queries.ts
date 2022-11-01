import axios from 'axios'

const baseURL = 'https://ngm-api-tpnng.ondigitalocean.app'

export const api = axios.create({
  baseURL,
})

export const getCollections = () => {
  return api.get('/nft/get-collections')
}
