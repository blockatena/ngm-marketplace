export type CrumbType = { name: string; route: string }

export type addressType = `0x${string}`

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

export type CollectionCardTypes = {
  chain: string
  collection_name: string
  contract_address: string
  owner_address: string
  symbol: string
  transactionhash: string
  createdAt: string
  type: string
  description: string
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

// export type AvatarType = {
//   name: string
//   img: string
//   contract_address: string
//   contract_type: string
//   createdAt: string
//   is_in_auction: boolean
//   is_in_sale: boolean
//   meta_data_url: string
//   token_id: string
//   token_owner: string
//   updatedAt: string
//   __v: number
//   _id: string
//   contract_details: {
//     _id: string
//     symbol: string
//     chain: string
//     type: string
//     transactionhash: string
//     baseuri: string
//     createdAt: string
//     updatedAt: string
//     __v: number
//     description: string
//     imageuri: string[]
//     owner_address: string
//     collection_name: string
//     contract_address: string
//   }
// }

// export type AvatarType = {
//   contract_details: {
//     _id: string
//     symbol: string
//     owner_address: string
//     collection_name: string
//     chain: string
//     type: string
//     transactionhash: string
//     contract_address: string
//     description: string
//     baseuri: string
//     imageuri: string[]
//     createdAt: string
//     updatedAt: string
//     __v: number
//   }
//   nft: {
//     _id: string
//     contract_address: string
//     contract_type: string
//     token_id: string
//     meta_data_url: string
//     is_in_auction: boolean
//     is_in_sale: boolean
//     token_owner: string
//     createdAt: string
//     updatedAt: string
//     __v: number
//   }
// }

export type AvatarType = {
  _id: string
  contract_address: string
  contract_type: string
  token_id: string
  meta_data_url: string
  is_in_auction: boolean
  is_in_sale: boolean
  token_owner: string
  createdAt: string
  updatedAt: string
  __v: number
  meta_data: {
    name: string
    image: string
    description: string
    external_uri: string
    attributes: { name: string; value: string }[]
  }
}

export type NftContractType = {
  _id: string
  symbol: string
  owner_address: string
  collection_name: string
  chain: string
  type: string
  transactionhash: string
  contract_address: string
  description: string
  baseuri: string
  imageuri: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

export type nftAuctionBodyType = {
  token_owner: string
  contract_address: string
  token_id: string
  start_date: string
  end_date: string
  min_price: number
}

export type NftBidBodyType = {
  bidder_address: string
  contract_address: string
  token_id: string
  bid_amount: number
}

export type BidType = {
  _id: string
  auction_id: string
  bidder_address: string
  contract_address: string
  token_id: string
  bid_amount: number
  is_auction_ended: boolean
  createdAt: string
  updatedAt: string
  status: string
  __v: number
}

export type AuctionType = {
  _id: string
  token_owner: string
  contract_address: string
  token_id: string
  start_date: string
  end_date: string
  min_price: string
  createdAt: string
  updatedAt: string
  status: string
  __v: number
}

export type nftCancelbidType = {
  bidder_address: string
  token_id: string
  contract_address: string
}

export type CollectionNftsBodyType = {
  contract_address?: string
  token_owner?: `0x${string}` | undefined
  listed_in?: string
  page_number: number
  items_per_page: number
  order: 'NewToOld' | 'OldToNew'
  alphabetical_order: 'AtoZ' | 'ZtoA'
}

export type NftSaleBodyType = {
  token_owner: string
  contract_address: string
  token_id: string
  start_date: string
  end_date: string
  price: string
}

export type NftOfferBodyType = {
  contract_address: string
  token_id: string
  offer_price: string
  offer_person_address: string
}
