import { NextPage } from 'next'
import Image from 'next/image'

import BreadCrumb from '../../components/BreadCrumb'
import PageHeading from '../../components/PageHeading'
import DescriptionBidHistorySection from '../../components/sections/DescriptionBidHistorySection'
import ExploreSection from '../../components/sections/ExploreSection'
import ProductOverviewSection from '../../components/sections/ProductOverviewSection'
import type { CrumbType } from '../../interfaces'
import leftVector from '../../public/images/others/left_vector.png'
import rightVector from '../../public/images/others/right_vector.png'

const crumbData: CrumbType[] = [
  { name: 'home', route: '/' },
  { name: 'apex legends', route: '/collections' },
  { name: 'fuse', route: '/product/1' },
]

const ViewAssetPage: NextPage = () => {
  return (
    <main className="min-h-screen p-2 pt-6 lg:px-16 mb-6">
      <div className="px-2 md:px-4 lg:px-0">
        <BreadCrumb crumbs={crumbData} />
      </div>
      <PageHeading name="apex legend" />
      <div className="mt-16 mb-8">
        <div className="w-full h-[20px] md:h-[40px] flex mb-4">
          <Image
            src="/images/others/top_vector.png"
            alt=""
            height="30px"
            width="2000px"
          />
        </div>
        <div className="grid grid-cols-12 ">
          <div className="col-span-1 w-3 lg:w-7 flex">
            <Image src={leftVector} alt="" />
          </div>
          <div className="col-span-10 flex justify-center">
            <ProductOverviewSection />
          </div>
          <div className="col-span-1 flex justify-end ">
            <div className="w-3 lg:w-7 flex">
              <Image src={rightVector} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 md:px-4 lg:px-0">
        <DescriptionBidHistorySection />
        <ExploreSection />
      </div>
    </main>
  )
}

export default ViewAssetPage
