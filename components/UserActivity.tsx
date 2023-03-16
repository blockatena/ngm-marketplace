import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useAccount } from 'wagmi'
import { ActivityType, UserType } from '../interfaces'
import { QUERIES } from '../react-query/constants'
import { getUser, getUserActivity } from '../react-query/queries'
import { shortenString } from '../utils'
import { opacityAnimation } from '../utils/animations'
import Pagination from './Pagination'

// user Activities for user profiles 
const ActivityItem: FC<{
  activity: ActivityType
  index: number
  address: string | undefined
}> = ({ activity, index, address }) => {
  const router = useRouter()
  const { address: connectedAddress } = useAccount()

  // APi call to get User info
  const { data: userData } = useQuery(
    [QUERIES.getUser, address],
    () => getUser(String(address)),
    {
      enabled: !!address,
    }
  )

  const user: UserType | undefined = userData?.data

  let timePlaced = ''
  if (activity?.createdAt) {
    let d = new Date(activity.createdAt)
    timePlaced = d.toLocaleString()
  }

  const isTo = activity?.to !== '----'
  // const isTx = activity?.transaction_hash
  const isTx = undefined
  const price = activity?.price

  // set activity data in array with [key, value] pair
  const activityData = [
    {
      name: 'Type',
      value: activity?.event,
    },
    { name: 'Asset Name', value: activity?.item?.name, item: activity?.item },
    {
      name: 'Price',
      value:
        activity?.event === 'Transfer'
          ? `${price} ETH`
          : `${activity?.price} ETH`,
    },
    {
      name: 'Quantity',
      value: activity?.quantity,
    },
    // {
    //   name: 'From',
    //   value:
    //     activity?.from === address &&
    //     String(connectedAddress) === String(address)
    //       ? 'You'
    //       : activity?.from === address
    //       ? user?.username || shortenString(activity?.from, 4, 4)
    //       : shortenString(activity?.from, 3, 3),
    // },
    {
      name: 'From',
      value:
        String(connectedAddress) === activity?.from
          ? 'You'
          : activity?.from === address
          ? user?.username || shortenString(activity?.from, 4, 4)
          : shortenString(activity?.from, 3, 3),
    },
    {
      name: 'To',
      value:
        // activity?.to !== '----'
        activity?.to === String(connectedAddress)
          ? 'You'
          : activity?.to === address
          ? user?.username || shortenString(activity?.to, 3, 3)
          : activity?.to !== '----'
          ? shortenString(activity?.to, 3, 3)
          : '-',
    },
    // {
    //   name: 'To',
    //   value:
    //     activity?.to !== '----'
    //       ? activity?.to === address
    //         ? 'User'
    //         : shortenString(activity?.to, 3, 3)
    //       : '-',
    // },
    { name: 'Time', value: timePlaced },
  ]

  // on click address , redirect to user's profile
  const onClickAddress = (user: string) => {
    let profile = user === connectedAddress ? `/profile` : `/profile/${user}`
    router.push(profile)
  }

  // when click on assets name : redirect to asset / nft page
  const handleAssetNameClick = (contractAddress: string, id: string) => {
    router.push(`/assets/${contractAddress}/${id}`)
  }

  return (
    <motion.tr
      className={`${
        index % 2 === 0 ? 'bg-[#070707]' : 'bg-transparent'
      } font-poppins text-[#D7D7D7] lg:text-lg py-2 h-16`}
      variants={opacityAnimation}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      transition={{
        ease: 'easeInOut',
        duration: 0.4,
        delay: index < 6 ? 0.1 * index : 0,
      }}
    >
      {activityData?.map((activityData, index) => (
        <td
          key={index}
          className={
            activityData?.name === 'From' ||
            (isTo && activityData?.name === 'To') ||
            (isTx && activityData?.name === 'Time') ||
            activityData?.name === 'Asset Name'
              ? 'cursor-pointer underline hover:text-sky-500'
              : 'h-16'
          }
          onClick={() =>
            activityData?.name === 'From'
              ? onClickAddress(activity?.from)
              : isTo && activityData?.name === 'To'
              ? onClickAddress(activity?.to)
              : isTx && activityData?.name === 'Time'
              ? // ? onClickTx(activity?.transaction_hash)
                ''
              : activityData?.name === 'Asset Name'
              ? activityData?.item?.contract_address &&
                activityData?.item?.token_id &&
                handleAssetNameClick(
                  activityData.item.contract_address,
                  activityData.item.token_id
                )
              : ''
          }
        >
          {activityData?.value}
        </td>
      ))}
    </motion.tr>
  )
}

type InitialActivityStateType = {
  activity: ActivityType[] | undefined
  totalPages: number
  currentPage: number
}

const INITIAL_ACTIVITY_STATE: InitialActivityStateType = {
  activity: undefined,
  totalPages: 1,
  currentPage: 1,
}

// User Activities : and send one by one to ActivityItem Section
const UserActivity: FC<{ address: string | undefined }> = ({ address }) => {
  const [{ activity, totalPages, currentPage }, setActivityState] = useState(
    INITIAL_ACTIVITY_STATE
  )

  // Api call to get user's All activities
  const { data } = useQuery(
    [QUERIES.getUserActivity, address, currentPage],
    () => getUserActivity(String(address), currentPage),
    {
      enabled: !!address,
    }
  )

  const handlePaginate = (pageNumber: number) => {
    setActivityState((prev) => ({ ...prev, currentPage: pageNumber }))
  }

  useEffect(() => {
    if (!data?.data) return
    setActivityState((prev) => ({
      ...prev,
      activity: data?.data?.activity_data,
      totalPages: data?.data?.total_pages,
      currentPage: +data?.data?.current_page,
    }))
  }, [data?.data])

  const tableHeadings = [
    { name: 'Type' },
    { name: 'Asset Name' },
    { name: 'Price' },
    { name: 'Quantity' },
    { name: 'From' },
    { name: 'To' },
    { name: 'Time' },
  ]

  return (
    <>
      <div
        className="pb-20 md:px-4 bg-[#1F2021] rounded-lg
  gap-20 w-full  max-w-full mx-auto px-2 lg:px-6 py-9 lg:h-[928px] scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021] overflow-y-scroll"
      >
        <div
          className="w-full font-poppins text-[#D7D7D7] lg:text-lg px-0 max-h-full 
      overflow-y-scroll scrollbar-thin scrollbar-thumb-[#5A5B61] scrollbar-thumb-rounded-lg scrollbar-track-[#1F2021]"
        >
          {activity?.length ? (
            <table className="w-full overflow-x-auto text-center">
              <thead>
                <tr className="h-16">
                  {tableHeadings.map((heading) => (
                    <th key={heading.name} className="h-16">
                      {heading.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activity?.length &&
                  activity.map((activity, index) => {
                    return (
                      <ActivityItem
                        key={index}
                        activity={activity}
                        index={index}
                        address={address}
                      />
                    )
                  })}
                {/* {activity?.length === 0 && <td>Activites</td>} */}
              </tbody>
            </table>
          ) : (
            ''
          )}
          {activity?.length === 0 && (
            <p className="text-center b text-3xl p-12">- No Activities yet -</p>
          )}
        </div>
      </div>
      <div className="flex justify-end p-4 pb-10">
        <Pagination
          totalPages={totalPages}
          paginate={handlePaginate}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}

export default UserActivity
