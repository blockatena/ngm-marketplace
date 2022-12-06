import { ethers } from 'ethers'
import { AnimatePresence, motion } from 'framer-motion'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { AiFillCheckSquare, AiOutlineClockCircle } from 'react-icons/ai'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import AvatarCard from '../../../../components/AvatarCard'
import BreadCrumb from '../../../../components/BreadCrumb'
import ListingSuccessModal from '../../../../components/modals/ListingSuccessModal'
import PageHeading from '../../../../components/PageHeading'
import Spinner from '../../../../components/Spinner'
import {
  NGM1155ABI,
  NGM721PSIABI,
  // NGMMarketAddress,
  NGMTINY721ABI,
} from '../../../../contracts/nftabi'
import type {
  AvatarType,
  CrumbType,
  nftAuctionBodyType,
  NftContractType,
  NftSaleBodyType,
} from '../../../../interfaces'
import { QUERIES } from '../../../../react-query/constants'
import {
  createNftAuction,
  createNftSale,
  getSingleNft,
} from '../../../../react-query/queries'
import {
  fromLeftAnimation,
  opacityAnimation,
} from '../../../../utils/animations'
import useCurrentDateTime from '../../../../utils/hooks/useCurrentDateTime'

const NGMMarketAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || ''
const CHAINID: string = process.env.NEXT_PUBLIC_CHAIN_ID || ''

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
  const { asPath } = useRouter()
  const { date, time } = useCurrentDateTime()
  const initialFormState = {
    start_date: `${date}T${time}`,
    end_date: '',
    min_price: 0,
  }
  const [contractAddress, setContractAddress] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [NFTABI, setNFTABI] = useState<any>()
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [nft, setNft] = useState<AvatarType>(initalNftState)
  const [contractDetails, setContractDetails] = useState<NftContractType>()
  const [formData, setFormData] = useState(initialFormState)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState<'fixed' | 'auction'>('auction')

  const { data } = useQuery(
    [QUERIES.getSingleNft, contractAddress, tokenId],
    () => getSingleNft(contractAddress, tokenId),
    { enabled: !!contractAddress && !!tokenId }
  )

  const { mutate, isSuccess } = useMutation(createNftAuction)

  const { mutate: createSale, isSuccess: isSaleSuccess } =
    useMutation(createNftSale)

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const crumbData: CrumbType[] = [
    { name: 'home', route: '/' },
    {
      name: `${contractDetails?.collection_name || ''}`,
      route: `/collections/${contractAddress}`,
    },
    {
      name: `${nft?.meta_data?.name || ''}`,
      route: `/assets/${contractAddress}/${tokenId}`,
    },
  ]

  const onlisting = async () => {
    if (!formData.end_date || !formData.min_price) {
      toast('Please fill all required fields', {
        hideProgressBar: true,
        autoClose: 3000,
        type: 'error',
        position: 'top-right',
        theme: 'dark',
      })
      return
    }

    let date = new Date(formData.end_date).getTime()
    let now = Date.now()
    if (date < now) {
      toast('End Time must be greater than current time', {
        hideProgressBar: true,
        autoClose: 3000,
        type: 'error',
        position: 'top-right',
        theme: 'dark',
      })
      return
    }

    if (nft?.is_in_auction) {
      toast('NFT already listed!', {
        hideProgressBar: true,
        autoClose: 3000,
        type: 'error',
        position: 'top-right',
        theme: 'dark',
      })
      return
    }
    setIsLoading(true)
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    const provider = new ethers.providers.Web3Provider(ethereum)
    const { chainId } = await provider.getNetwork()
    let chain = parseInt(CHAINID)
    if (chainId !== chain) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(chain) }], // chainId must be in hexadecimal numbers
      })
    }
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)

    // console.log(signer)
    const nftcontract = new ethers.Contract(contractAddress, NFTABI, signer)

    const isApproved = await nftcontract.isApprovedForAll(
      signer._address,
      NGMMarketAddress
    )
    // console.log(isApproved)

    let startDate = new Date(formData.start_date).toISOString()
    let endDate = new Date(formData.end_date).toISOString()

    const requestData: nftAuctionBodyType = {
      contract_address: nft?.contract_address,
      token_id: nft?.token_id,
      token_owner: nft?.token_owner,
      start_date: startDate,
      end_date: endDate,
      min_price: formData.min_price,
      sign:''
    }

    const saleBody: NftSaleBodyType = {
      contract_address: nft?.contract_address,
      token_id: nft?.token_id,
      token_owner: nft?.token_owner,
      start_date: startDate,
      end_date: endDate,
      price: formData.min_price,
      sign:''
    }

    let rawMsg = `{"contract_address":"${nft?.contract_address}","token_id":"${nft?.token_id}","token_owner":"${nft?.token_owner}","start_date":"${startDate}","end_date":"${endDate}","min_price":"${formData.min_price}"}`
    let rawMsgSale = `{"contract_address":"${nft?.contract_address}","token_id":"${nft?.token_id}","token_owner":"${nft?.token_owner}","start_date":"${startDate}","end_date":"${endDate}","price":"${formData.min_price}"}`
    if (isApproved === true) {
      // POST DATA
      // console.log(type === 'auction' ? rawMsg : rawMsgSale)
      let hashMessage = await ethers.utils.hashMessage(
        type === 'auction' ? rawMsg : rawMsgSale
      )
      // console.log(hashMessage)
      await signer
        .signMessage(hashMessage)
        .then(async (sign) => {
          // console.log(sign)
          if (type === 'auction') {
            requestData['sign'] = sign
          } else {
            saleBody['sign'] = sign
          }
        })
        .catch((e) => {
          console.log(e.message)
          return
        })
      type === 'auction' && mutate(requestData)
      type === 'fixed' && createSale(saleBody)
      setIsLoading(false)
      // if (isSuccess) {
      //   setIsSuccessModalOpen(true)
      // }
    } else {
      // console.log(formData)
      await nftcontract
        .setApprovalForAll(NGMMarketAddress, true)
        .then((tx: any) => {
          console.log('processing')
          provider.waitForTransaction(tx.hash).then(async () => {
            // console.log(tx.hash)
            //Axios data:POST
            let hashMessage = await ethers.utils.hashMessage(
              type === 'auction' ? rawMsg : rawMsgSale
            )
            // console.log(hashMessage)
            await signer
              .signMessage(hashMessage)
              .then(async (sign) => {
                // console.log(sign)
                if (type === 'auction') {
                  requestData['sign'] = sign
                } else {
                  saleBody['sign'] = sign
                }
              })
              .catch((e) => {
                console.log(e.message)
                return
              })
            type === 'auction' && mutate(requestData)
            type === 'fixed' && createSale(saleBody)
            // setIsSuccessModalOpen(true)
            setIsLoading(false)
          })
        })
        .catch((e: any) => {
          setIsLoading(false)
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

  useEffect(() => {
    if (data?.data?.nft) {
      setNFTABI(
        data.data.nft.contract_type === 'NGMTINY721'
          ? NGMTINY721ABI
          : data.data.nft.contract_type === 'NGM721PSI'
          ? NGM721PSIABI
          : data.data.nft.contract_type === 'NGM1155'
          ? NGM1155ABI
          : ''
      )
      setNft(data?.data?.nft)
      setContractDetails(data?.data?.contract_details)
    }
  }, [data])

  useEffect(() => {
    // if (response?.status === 201) {
    //   toast(String(response?.data), {
    //     hideProgressBar: true,
    //     autoClose: 3000,
    //     type: 'error',
    //     position: 'top-right',
    //     theme: 'dark',
    //   })
    //   return
    // }
    ;(isSuccess || isSaleSuccess) && setIsSuccessModalOpen(true)
  }, [isSuccess, isSaleSuccess])

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
              <AvatarCard variant="xs" noCta {...nft} />
              <div className="grid place-items-center">
                <div className=" capitalize border-l-[4px] border-custom_yellow pl-2 ">
                  <p className="text-custom_yellow lg:text-[30px] font-play mb-2">
                    {contractDetails?.collection_name || ''}
                  </p>
                  <p className="text-white text-2xl lg:text-[47px] font-josefin">
                    {nft?.meta_data?.name || ''}
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
                className="w-full h-[68px] rounded-lg text-white font-poppins 
            lg:text-[28px] flex p-1 border border-[#4D4D49] shadow-inner"
              >
                <div
                  className={`flex items-center justify-center gap-2 w-1/2  cursor-pointer transition-all duration-500
                ${
                  type === 'auction' &&
                  'rounded-l-2xl rounded-r-2xl bg-[#4D4D49]'
                }`}
                  onClick={() => setType('auction')}
                >
                  <p>
                    {/* <Image
                      src="/images/icons/clock.svg"
                      alt="icon"
                      width="24px"
                      height="24px"
                    /> */}
                    <AiOutlineClockCircle fontSize={24} />
                  </p>
                  <p>Time Auction</p>
                </div>
                <div
                  // className={`flex items-center justify-center gap-2 w-1/2 cursor-pointer`}
                  className={`flex items-center justify-center gap-2 w-1/2  cursor-pointer 
                ${
                  type === 'fixed' && 'rounded-l-2xl rounded-r-2xl bg-[#4D4D49]'
                }`}
                  onClick={() => setType('fixed')}
                >
                  <p>
                    <AiFillCheckSquare fontSize={24} />
                  </p>
                  <p>Fixed Sale</p>
                </div>
              </div>
            </motion.div>

            {type === 'auction' && (
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
            )}
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
                {type === 'auction' && 'Starting'} Price
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
                  type="number"
                  id="starting_price"
                  name="min_price"
                  className="w-full bg-[#585858] outline-none rounded-lg text-white font-poppins 
                  px-2 lg:pl-8 border border-[#E5E4E4]"
                  onChange={handleUserInput}
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
                    name="start_date"
                    className="bg-[#4D4D49] text-white"
                    onChange={handleUserInput}
                    value={`${date}T${time}`}
                    disabled
                  />
                </div>
                <p className="text-lg text-white"> - </p>
                <div>
                  <input
                    type="datetime-local"
                    id="end_date"
                    name="end_date"
                    className="bg-[#4D4D49] text-white"
                    onChange={handleUserInput}
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
                className="btn-primary grid place-items-center w-[200px] h-[40px] lg:w-[618px] lg:h-[57px] 
                rounded-lg font-poppins lg:text-[25px]"
                // onClick={() => setIsSuccessModalOpen(true)}
                onClick={() => onlisting()}
                disabled={isLoading}
              >
                {!isLoading ? 'Complete Listing' : <Spinner color="black" />}
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
                  contract_address={
                    data?.data.contract_details.contract_address
                  }
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
