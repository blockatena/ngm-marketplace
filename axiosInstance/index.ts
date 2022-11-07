import axios from 'axios'

const baseURL = 'https://ngm-api-tpnng.ondigitalocean.app'

export const axiosInstance = axios.create({
  baseURL,
})

export const nftInstance = axios.create({})