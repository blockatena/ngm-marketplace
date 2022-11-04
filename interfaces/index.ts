export type CrumbType = { name: string; route: string }

export type CollectionCardType = {
  chain: string
  collection_name: string
  contract_address: string
  owner_address: string
  symbol: string
  transactionhash: string
  type: string
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

export type AvatarType = {
  name: string
  img: string
  tokenId: number
  contractAddress: string
  isOnAuction: boolean
}
