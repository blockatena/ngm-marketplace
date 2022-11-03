export type CrumbType = { name: string; route: string }

export type CollectionCardType = {
  chain: string
  collectionName: string
  contractaddress: string
  ownerAddress: string
  symbol: string
  transactionhash: string
  type: string
  __v: number
  _id: string
  baseuri: string
  imageuri: string[]
}

export type CollectionCardTypes = {
  chain: string
  collectionName: string
  contractaddress: string
  ownerAddress: string
  symbol: string
  transactionhash: string
  createdAt: string
  type: string
  description:string
  __v: number
  _id: string
  baseuri: string
  imageuri: string[]
}
// export type CollectionCardType = {
//   chain: number
//   name: string
//   imageFront: string
//   imageMiddle: string
//   imageBack: string
// }

export type selectDataType = {
  name: string
  value: string
}

// export type AvatarType = {
//   name: string
//   img: string
//   tokenId: number
//   contractAddress: string
//   isOnAuction: boolean
// }

export type AvatarType = {
  name: string
  img: string
  contract_address: string
  contract_type: string
  createdAt: string
  is_in_auction: boolean
  is_in_sale: boolean
  meta_data_url: string
  token_id: any
  token_owner: string
  updatedAt: string
  __v: any
  _id:string
}