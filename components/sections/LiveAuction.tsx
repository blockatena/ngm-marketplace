import { FC } from 'react'
import { CONTAINER_PADDING } from '../../utils/constants'
import OutlinedNftCard from '../OutlinedNftCard'

const LiveAuction: FC = () => {
  return (
    <section
      className={`${CONTAINER_PADDING}  text-[#EAD30C] bg-[#0A0A0A] py-40`}
    >
      <h2 className="text-center lg:text-[55px] lg:leading-[66.6496px] py-20">
        Live Auction
      </h2>

      <div className="flex justify-evenly flex-wrap gap-16">
        <OutlinedNftCard />
        <OutlinedNftCard />
        <OutlinedNftCard />
        <OutlinedNftCard />
        <OutlinedNftCard />
        <OutlinedNftCard />
      </div>
    </section>
  )
}

export default LiveAuction
