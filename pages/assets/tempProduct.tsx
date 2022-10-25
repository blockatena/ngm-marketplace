type Avatar = {
  name: string
  img: string
  id: number
  isOnAuction:boolean
  contract:string
  tokenId:number
  topbid:number
  owner:string
}

const avatars: Avatar[] = [
  {
    id: 1,
    name: 'Wraith',
    img: '/images/auction/auction_img_1.svg',
    isOnAuction: false,
    contract:"0x01",
    tokenId:7,
    topbid:0.5,
    owner:"0xOwner",
  },
  {
    id: 2,
    name: 'Horizon',
    img: '/images/auction/auction_img_2.svg',
    isOnAuction: true,
    contract:"0x04",
    tokenId:5,
    topbid:0.5,
    owner:"0xOwner",
  },
  {
    id: 3,
    name: 'Lifeline',
    img: '/images/auction/auction_img_3.svg',
    isOnAuction: false,
    contract:"0x06",
    tokenId:6,
    topbid:0.5,
    owner:"0xOwner",
  },
  {
    id: 4,
    name: 'Fuse',
    img: '/images/auction/auction_img_4.svg',
    isOnAuction: true,
    contract:"0x01",
    tokenId:1,
    topbid:0.5,
    owner:"0xOwner",
  },
  {
    id: 5,
    name: 'Fortune',
    img: '/images/auction/auction_img_5.svg',
    isOnAuction: true,
    contract:"0x04",
    tokenId:3,
    topbid:0.5,
    owner:"0xOwner",
  },
  {
    id: 6,
    name: 'Crypto',
    img: '/images/auction/auction_img_6.svg',
    isOnAuction: false,
    contract:"0x02",
    tokenId:1,
    topbid:0.5,
    owner:"0xOwner",
  },
  {
    id: 7,
    name: 'Wraith',
    img: '/images/auction/auction_img_1.svg',
    isOnAuction: true,
    contract:"0x01",
    tokenId:3,
    topbid:0.5,
    owner:"0xOwner3",
  },
  {
    id: 8,
    name: 'Horizon',
    img: '/images/auction/auction_img_2.svg',
    isOnAuction: false,
    contract:"0x06",
    tokenId:2,
    topbid:0.5,
    owner:"0xOwner2",
  },
  {
    id: 9,
    name: 'Lifeline',
    img: '/images/auction/auction_img_3.svg',
    isOnAuction: true,
    contract:"0x05",
    tokenId:58,
    topbid:0.5,
    owner:"0xOwner1",
  },
  {
    id: 10,
    name: 'Fuse',
    img: '/images/auction/auction_img_4.svg',
    isOnAuction: false,
    contract:"0x02",
    tokenId:32,
    topbid:0.5,
    owner:"0xOwner2",
  },
  {
    id: 11,
    name: 'Fortune',
    img: '/images/auction/auction_img_5.svg',
    isOnAuction: true,
    contract:"0x04",
    tokenId:63,
    topbid:0.5,
    owner:"0xOwner1",
  },
  {
    id: 12,
    name: 'Crypto',
    img: '/images/auction/auction_img_6.svg',
    isOnAuction: false,
    contract:"0x01",
    tokenId:52,
    topbid:0.5,
    owner:"0xOwner2",
  },
]

export default avatars;