import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import AvatarCard from '../../../../components/AvatarCard'
import BreadCrumb from '../../../../components/BreadCrumb'
import ListingSuccessModal from '../../../../components/modals/ListingSuccessModal'
import PageHeading from '../../../../components/PageHeading'
import type { AvatarType, CrumbType } from '../../../../interfaces'
import {
  fromLeftAnimation,
  opacityAnimation,
} from '../../../../utils/animations'
import { QUERIES } from '../../../../react-query/constants'
import { getSingleNft } from '../../../../react-query/queries'
import { useQuery } from 'react-query'
import { NGMTINY721ABI } from '../../../../contracts/nftabi'
import { NGM1155ABI } from '../../../../contracts/nftabi'
import { NGM721PSIABI } from '../../../../contracts/nftabi'
import { ethers } from 'ethers'
import { NGMMarketAddress } from '../../../../contracts/nftabi'
const crumbData: CrumbType[] = [
  { name: 'home', route: '/' },
  { name: 'apex legends', route: '/collections/3' },
  {
    name: 'fuse',
    route: '/assets/0xfd3b3561630c02b8047B911c22d3f3bfF3ad64Ce/1',
  },
]

const initalNftState: AvatarType = {
  _id: '',
  contract_address: '',
  contract_type: '',
  token_id: '0',
  meta_data_url: '',
  is_in_auction: false,
  is_in_sale: false,
  token_owner: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
  meta_data: {
    name: '',
    image: '',
    description: '',
    external_uri: '',
    attributes: [{ name: '', value: '' }],
  },
}

const ListAssetPage: NextPage = () => {
  const [contractAddress, setContractAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [NFTABI, setNFTABI] = useState<any>()
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const { asPath } = useRouter()

  const [nft, setNft] = useState<AvatarType>(initalNftState)

  const { data } = useQuery(
    [QUERIES.getSingleNft, contractAddress, tokenId],
    () => getSingleNft(contractAddress, tokenId)
  )


  const onlisting = async ()=>{
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    const provider = new ethers.providers.Web3Provider(ethereum)
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    
    console.log(signer)
    const nftcontract = new ethers.Contract(contractAddress, NFTABI, signer)

    const isApproved = await nftcontract.isApprovedForAll(signer._address,NGMMarketAddress)
    console.log(isApproved)

    if(isApproved===true){
    // Axios data:POST
    setIsSuccessModalOpen(true)
    } else {
      await nftcontract
        .setApprovalForAll(NGMMarketAddress, true)
        .then((tx: any) => {
          console.log('processing')
          provider.waitForTransaction(tx.hash).then(() => {
            console.log(tx.hash)
            //Axios data:POST
            setIsSuccessModalOpen(true)
          })
        })
        .catch((e: any) => {
          console.log(e.message)
        })
      
    }
    
  }
  


  useEffect(() => {
    if (asPath) {
      const routeArr = asPath.split('/')
      setContractAddress(routeArr[routeArr.length - 3])
      setTokenId(routeArr[routeArr.length - 2])
    }
  }, [asPath])

  useEffect(()=>{
    if (data?.data?.nft) {
      setNFTABI(
        data.data.nft.contract_type === 'NGMTINY721'
          ? NGMTINY721ABI
          : data.data.nft.contract_type === 'NGM721PSI'
          ? NGM721PSIABI
          : data.data.nft.contract_type === 'NGM1155'
          ? NGM1155ABI
          :''
      )
      setNft(data?.data.nft)
    }
  },[data])



  return (
    <main className="min-h-screen p-2 pt-6 lg:px-16 mb-6">
      <div className="px-2 md:px-4 lg:px-0">
        <BreadCrumb crumbs={crumbData} />
      </div>
      <PageHeading name="list item for sale" />
      <div className="mt-16 mb-8">
        <div className="rounded-lg bg-gradient-to-bl from-[#0A0B0C] to-[#2C2C2D]">
          <section className="p-4 xl:p-8 ">
            <motion.div
              className="flex gap-6"
              variants={fromLeftAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.4,
                delay: 0.6,
              }}
            >
              <AvatarCard
                // name="Wraith"
                // img="/images/auction/auction_img_1.svg"
                variant="xs"
                noCta
                {...nft}
                // token_id={1}
                // contract_address="0xfd3b3561630c02b8047B911c22d3f3bfF3ad64Ce"
                // contract_type={''}
                // createdAt={''}
                // meta_data_url={''}
                // token_owner={''}
                // updatedAt={''}
                // __v={undefined}
                // _id={''}
              />
              <div className="grid place-items-center">
                <div className=" capitalize border-l-[4px] border-custom_yellow pl-2 ">
                  <p className="text-custom_yellow lg:text-[30px] font-play mb-2">
                    {data?.data.contract_details.collection_name
                      ? data?.data.contract_details.collection_name
                      : 'collection'}
                  </p>
                  <p className="text-white text-2xl lg:text-[47px] font-josefin">
                    {data?.data.nft.meta_data.name
                      ? data?.data.nft.meta_data.name
                      : 'collection'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-8"
              variants={opacityAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.4,
              }}
            >
              <h5
                className="text-[#F6F6F6] lg:text-[31px] font-medium font-poppins lg:leading-[24px]
            mb-6"
              >
                Type
              </h5>
              <div
                className="w-full h-[68px] rounded-lg bg-[#4D4D49] text-white font-poppins 
            lg:text-[28px] flex items-center justify-center gap-2"
              >
                <p>
                  <Image
                    src="/images/icons/clock.svg"
                    alt="icon"
                    width="24px"
                    height="24px"
                  />
                </p>
                <p>Time Auction</p>
              </div>
            </motion.div>

            <motion.div
              className="mt-8"
              variants={opacityAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.4,
              }}
            >
              <h5
                className="text-[#F6F6F6] lg:text-[31px] font-medium font-poppins lg:leading-[24px]
            mb-6"
              >
                Method
              </h5>
              <div
                className="w-full h-[59px] rounded-lg bg-[#4D4D49] text-white font-poppins 
            lg:text-[26px] flex items-center gap-6 lg:gap-10 px-4"
              >
                <p>
                  <Image
                    src="/images/icons/call_made.svg"
                    alt="icon"
                    width="24px"
                    height="24px"
                  />
                </p>
                <p>Set has highest Bidder </p>
              </div>
            </motion.div>

            <motion.div
              className="mt-10 "
              variants={opacityAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.4,
              }}
            >
              <label
                htmlFor="starting_price"
                className="font-poppins lg:text-[31px] text-white"
              >
                Starting Price
              </label>
              <div className="flex gap-4 justify-between mt-2">
                <div
                  className="lg:w-[243px] lg:h-[47px] bg-[#585858] outline-none rounded-lg
                font-poppins text-white text-center flex items-center justify-center gap-2 font-semibold"
                >
                  <Image
                    src="/images/icons/eth.svg"
                    width="15px"
                    height="23px"
                    alt="eth_logo"
                  />{' '}
                  <p>WETH</p>
                </div>
                <input
                  type="text"
                  id="starting_price"
                  className="w-full bg-[#585858] outline-none rounded-lg text-white font-poppins 
                  px-2 lg:pl-8 border border-[#E5E4E4]"
                />
              </div>
              <p className="font-poppins lg:text-[21px] text-white text-end mt-2">
                0.0001 ETH{' '}
              </p>
            </motion.div>

            <motion.div
              className="mt-8"
              variants={opacityAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.4,
              }}
            >
              <h5
                className="text-[#F6F6F6] lg:text-[31px] font-medium font-poppins lg:leading-[24px]
            mb-6"
              >
                Duration
              </h5>
              <div
                className="flex flex-col md:flex-row items-center gap-4 h-[47px] rounded-lg bg-[#4D4D49] text-white 
            font-poppins pl-4"
              >
                <div>
                  <input
                    type="datetime-local"
                    id="start_date"
                    className="bg-[#4D4D49] text-white"
                  />
                </div>
                <p className="text-lg text-white"> - </p>
                <div>
                  <input
                    type="datetime-local"
                    id="end_date"
                    className="bg-[#4D4D49] text-white"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-8"
              variants={opacityAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.4,
              }}
            >
              <select
                className="bg-[#969696] font-poppins text-black w-[299px] h-[59px] text-center
            rounded-lg"
              >
                <option>More Options</option>
              </select>
            </motion.div>

            <motion.div
              className="font-poppins text-white mt-8"
              variants={opacityAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.4,
              }}
            >
              <p className="text-[31px] font-semibold">Fees</p>
              <p className="text-[21px]">0.0001 WETH </p>
              <p className="text-[21px]">0.0001 WETH </p>
            </motion.div>

            <motion.div
              className="grid place-items-center mt-8"
              variants={opacityAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.4,
              }}
            >
              <button
                className="btn-primary w-[200px] h-[40px] lg:w-[618px] lg:h-[57px] rounded-lg font-poppins lg:text-[25px]
            "
                // onClick={() => setIsSuccessModalOpen(true)}
                onClick={() => onlisting()}
              >
                Complete Listing
              </button>
            </motion.div>

            <AnimatePresence>
              {isSuccessModalOpen && (
                <ListingSuccessModal
                  isOpen={isSuccessModalOpen}
                  setIsOpen={setIsSuccessModalOpen}
                  nftname={data?.data?.nft.meta_data.name}
                  collection_name={data?.data.contract_details.collection_name}
                  token_id={data?.data?.nft.token_id}
                  contract_address={data?.data.contract_details.contract_address}
                />
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  )
}

export default ListAssetPage
