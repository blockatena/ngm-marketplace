import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { addresses } from '../../contracts/addresses'
import { NGM20ABI } from '../../contracts/nftabi'
import type { AvatarType, NftBidBodyType, NftType } from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { placeBid } from '../../react-query/queries'
import { fromTopAnimation } from '../../utils/animations'
import ModalBase from '../ModalBase'
import Spinner from '../Spinner'

// Place Bid Modal
const PlaceBidModal: FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  nft: AvatarType
  accountBalance: any
  status: string
  chainID: any
  nftType?: NftType
}> = ({ setIsOpen, nft, accountBalance, status, chainID, nftType }) => {
  const queryClient = useQueryClient()
  const { address } = useAccount()
  const [bidAmount, setBidAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [updateBalance, setAccountBalance] = useState('')
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [isChainCorrect, setIsChainCorrect] = useState(true)

  //  Api Call to Place a Bid
  const { mutate, data, isLoading, isSuccess } = useMutation(placeBid, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.getSingleNft)
    },
  })

  const DeployType =
    chainID == '80001' || chainID == '5'
      ? 'DEV'
      : chainID == '137' || chainID == '1'
      ? 'PROD'
      : ''
  const devMarkets = addresses.MARKETPLACE_CONTRACT.DEV
  const prodMarkets = addresses.MARKETPLACE_CONTRACT.PROD

  const NGMMarketAddress =
    DeployType == 'DEV' && chainID == '80001'
      ? devMarkets.MUMBAI
      : DeployType == 'DEV' && chainID == '5'
      ? devMarkets.GOERLI
      : DeployType == 'DEV' && chainID == '3141'
      ? devMarkets.HYPERSPACE
      : DeployType == 'PROD' && chainID == '137'
      ? prodMarkets.POLYGON
      : DeployType == 'PROD' && chainID == '1'
      ? prodMarkets.ETHEREUM
      : DeployType == 'PROD' && chainID == '314'
      ? prodMarkets.FILECOIN
      : ''

  const devTokens = addresses.ERC20_CONTRACT.DEV
  const prodTokens = addresses.ERC20_CONTRACT.PROD

  const NGM20Address =
    DeployType == 'DEV' && chainID == '80001'
      ? devTokens.MUMBAI
      : DeployType == 'DEV' && chainID == '5'
      ? devTokens.GOERLI
      : DeployType == 'DEV' && chainID == '3141'
      ? devTokens.HYPERSPACE
      : DeployType == 'PROD' && chainID == '137'
      ? prodTokens.POLYGON
      : DeployType == 'PROD' && chainID == '1'
      ? prodTokens.ETHEREUM
      : DeployType == 'PROD' && chainID == '314'
      ? prodTokens.FILECOIN
      : ''

  useEffect(() => {
    if (!chainID) return
    if (chain?.id === parseInt(chainID)) {
      setIsChainCorrect(true)
      return
    } else {
      setIsChainCorrect(false)
      return
    }
  }, [chain, chainID])

  // Netwok switch if not correct network detected
  const onSwitchNetwork = async () => {
    await switchNetwork?.(parseInt(chainID))
  }

  // function On place a bid
  const onBid = async () => {
    if (nft?.token_owner === address) {
      toast.dark('You own this NFT!', {
        type: 'error',
        hideProgressBar: true,
      })
      return
    }

    setLoading(true)
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    const provider = new ethers.providers.Web3Provider(ethereum, 'any')
    const walletAddress = accounts[0] // first account in MetaMask
    const signer = provider.getSigner(walletAddress)
    const wethcontract = new ethers.Contract(NGM20Address, NGM20ABI, signer)
    // const minimumBid = 0 // need to get data from api
    const bal = await wethcontract.balanceOf(walletAddress)
    let balanceInEth: any = ethers.utils.formatEther(bal)
    balanceInEth = parseFloat(balanceInEth).toFixed(7)
    setAccountBalance(balanceInEth)
    const inputAmt: any = await ethers.utils.parseUnits(
      bidAmount.toString(),
      'ether'
    )

    const bidData: NftBidBodyType = {
      bid_amount: bidAmount,
      bidder_address: address ? address : '',
      contract_address: nft?.contract_address,
      token_id: nft?.token_id,
      sign: '',
    }
    let rawMsg = `{
      "bid_amount":"${bidAmount}",
      "bidder_address":"${address ? address : ''}",
    "contract_address":"${nft?.contract_address}",
    "token_id":"${nft?.token_id}"
  }`

    if (parseInt(inputAmt.toString()) > parseInt(bal.toString())) {
      toast.dark(`Your bid is greater than your wallet balance`, {
        type: 'error',
        hideProgressBar: true,
      })
      setLoading(false)
      return
    } else if (parseInt(inputAmt.toString()) <= 0) {
      toast.dark(`Can't Bid less than 0`, {
        type: 'error',
        hideProgressBar: true,
      })
      setLoading(false)
      return
    } else {
      const Offer = ethers.utils.parseUnits(bidAmount.toString(), 'ether')
      const approvedAmt = await wethcontract.allowance(
        signer._address,
        NGMMarketAddress
      )

      if (parseInt(approvedAmt.toString()) > parseInt(Offer.toString())) {
        let hashMessage = await ethers.utils.hashMessage(rawMsg)
        // console.log(hashMessage)
        await signer
          .signMessage(
            `Signing to Place Bid\n${rawMsg}\n Hash: \n${hashMessage}`
          )
          .then(async (sign) => {
            // console.log(sign)
            bidData['sign'] = sign
          })
          .catch((e) => {
            console.log(e.message)
            setIsOpen(false)
            return
          })
        if (bidData['sign']) {
          mutate(bidData)
          setLoading(false)
        } else return setLoading(false)
      } else {
        // const approvedtokens: any = ethers.utils.formatEther(approvedAmt)
        const amt = 1000
        const amount = ethers.utils.parseUnits(amt.toString(), 'ether')
        await wethcontract
          .approve(NGMMarketAddress, amount)
          .then((tx: any) => {
            toast.dark('Processing Transaction!')
            provider.waitForTransaction(tx.hash).then(async () => {
              let hashMessage = await ethers.utils.hashMessage(rawMsg)
              // console.log(hashMessage)
              await signer
                .signMessage(
                  `Signing to Place Bid\n${rawMsg}\n Hash: \n${hashMessage}`
                )
                .then(async (sign) => {
                  // console.log(sign)
                  bidData['sign'] = sign
                })
                .catch((e) => {
                  console.log(e.message)
                  setIsOpen(false)
                  return
                })
              if (bidData['sign']) {
                mutate(bidData)
                setLoading(false)
              } else return setLoading(false)
            })
          })
          .catch(() => {
            toast.dark(String('User Rejected Request'), { type: 'error' })
            setLoading(false)
          })
      }
    }
  }
  // handle Amount
  const handleBidAmount = (value: number) => {
    if (value > 0) {
      setBidAmount(value)
    } else {
      setBidAmount(0)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      let msg = data?.data?.message
        ? data?.data?.message
        : (data?.data && status === 'update' && 'Bid Updated Successfully') ||
          (data?.data && status === 'place' && 'Bid Placed Successfully') ||
          ''

      toast(msg, {
        hideProgressBar: true,
        autoClose: 3000,
        type: data?.data?.message ? 'error' : 'success',
        position: 'top-right',
        theme: 'dark',
      })
      setIsOpen(false)
      data?.data?.status === 'started' && setIsOpen(false)
    }
  }, [isSuccess, data?.data, setIsOpen, status])

  return (
    <ModalBase>
      <motion.div
        className="w-full max-w-[866px] lg:h-[400px] py-4 px-4 lg:px-10 
    rounded-lg skew-y-1 -skew-x-1 bg-gradient-to-b from-[#494A4A] via-[#222324] to-[#030507]"
        variants={fromTopAnimation}
        initial="initial"
        animate="final"
        exit="initial"
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <div className="text-white flex justify-end">
          <div className="w-[66%] flex justify-between">
            <h2 className="font-poppins text-[20px] lg:text-[30px]">
              Place a Bid
            </h2>{' '}
            <p
              className="text-[#B2A4A4] font-thin cursor-pointer lg:text-[25px] font-poppins"
              onClick={() => setIsOpen(false)}
            >
              X
            </p>
          </div>
        </div>
        <div className="mt-8">
          <div className="font-poppins lg:text-[20px] flex justify-between mb-2">
            <label htmlFor="offer_amount" className="text-white">
              Bid Amount
            </label>
            <span className="text-[#AEA8A8]">{`Balance : ${
              updateBalance !== '' ? updateBalance : accountBalance
            } WETH `}</span>
          </div>
          <div className="h-[47px] relative rounded-lg">
            <input
              onChange={(e) => handleBidAmount(Number(e.target.value))}
              type="text"
              id="offer_amount"
              className="outline-none w-full h-full bg-[#585858] pl-[25%] text-white rounded-lg"
            />
            <p className="text-white font-poppins font-semibold lg:text-[22px] absolute top-3 left-4 lg:top-[0.5rem]">
              <Image
                src="/images/icons/eth.svg"
                width="15px"
                height="23px"
                alt="eth_logo"
              />{' '}
              <span>WETH</span>
            </p>
          </div>
          <p className="font-poppins text-xs lg:text-[17px] text-[#7C7C7C] mt-2">
            The next bid must be 5% more than the current bid
          </p>

          {nftType === 'NGM1155' && (
            <>
              <div className="font-poppins lg:text-[20px] flex justify-between my-2">
                <label htmlFor="quantity" className="text-white">
                  Quantity
                </label>
              </div>
              <div className="h-[47px] relative rounded-lg">
                <input
                  // onChange={() => null }
                  type="number"
                  id="quantity"
                  className="outline-none w-full h-full bg-[#585858] px-[5%] text-white rounded-lg"
                />
              </div>
            </>
          )}
          <div className="grid place-items-center mt-8">
            <button
              className="btn-primary w-[200px] h-[40px] lg:w-[375px] lg:h-[57px] rounded-lg font-poppins lg:text-[25px]
            grid place-items-center"
              onClick={() => (isChainCorrect ? onBid() : onSwitchNetwork())}
              disabled={isLoading || loading}
            >
              {isLoading || loading ? (
                <Spinner color="black" />
              ) : !isChainCorrect ? (
                'Switch Network'
              ) : status === 'update' ? (
                'Update Bid'
              ) : (
                'Place Bid'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </ModalBase>
  )
}

export default PlaceBidModal
