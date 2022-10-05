import { NextPage } from 'next'
import Image from 'next/image'
import BreadCrumb from '../../components/BreadCrumb'
import PageHeading from '../../components/PageHeading'
import ProductOverviewSection from '../../components/sections/ProductOverviewSection'
import type { CrumbType } from '../../interfaces'
// import topVector from '../../public/images/others/top_vector.png'
import leftVector from '../../public/images/others/left_vector.png'
import rightVector from '../../public/images/others/right_vector.png'

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
        <div className="w-full h-[40px] flex mb-4">
          <Image
            src="/images/others/top_vector.png"
            alt=""
            height="30px"
            width="2000px"
          />
        </div>
        <div className="grid grid-cols-12 ">
          <div className="col-span-1 w-7 flex">
            {<Image src={leftVector} alt="" />}
          </div>
          <div className="col-span-10 flex justify-center">
            <ProductOverviewSection />
          </div>
          <div className="col-span-1 flex justify-end ">
            <div className="w-7 flex">
              <Image src={rightVector} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProductPage
