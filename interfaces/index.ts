export type CrumbType = { name: string; route: string }

export type CollectionCardType = {
  id: number
  name: string
  imageFront: string
  imageMiddle: string
  imageBack: string
}

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
