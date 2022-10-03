import { NextPage } from 'next'
import Image from 'next/image'
import BreadCrumb from '../../components/BreadCrumb'
import PageHeading from '../../components/PageHeading'
import ProductOverviewSection from '../../components/sections/ProductOverviewSection'
import type { CrumbType } from '../../interfaces'
import leftVector from '../../public/images/others/left_vector.png'
import rightVector from '../../public/images/others/right_vector.png'
import topVector from '../../public/images/others/top_vector.png'

const crumbData: CrumbType[] = [
  { name: 'home', route: '/' },
  { name: 'apex legends', route: '/collections' },
  { name: 'fuse', route: '/product/1' },
]

const ViewProductPage: NextPage = () => {
  return (
    <div className="min-h-screen p-4 pt-6 lg:px-16 mb-6">
      <BreadCrumb crumbs={crumbData} />
      <PageHeading name="apex legend" />
      <div className="mt-16">
        <div className="w-full h-[86px]">
          <Image src={topVector} alt="" />
        </div>
        <div className="grid grid-cols-12 ">
          <div className="col-span-1">
            <Image src={leftVector} alt="" />
          </div>
          <div className="col-span-10 flex justify-center">
            <ProductOverviewSection />
          </div>
          <div className="col-span-1 flex justify-end">
            <Image src={rightVector} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProductPage
