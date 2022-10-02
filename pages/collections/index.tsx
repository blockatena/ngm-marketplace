import { NextPage } from 'next'
import { useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import CollectionCard from '../../components/CollectionCard'
import CustomSelect from '../../components/CustomSelect'
import PageHeading from '../../components/PageHeading'
import Pagination from '../../components/Pagination'
import { CollectionCardType, CrumbType, selectDataType } from '../../interfaces'

const crumbData: CrumbType[] = [
  { name: 'home', route: '/' },
  { name: 'collections', route: '/collections' },
]

const selectData: selectDataType[] = [
  { name: 'Recently', value: 'recently' },
  { name: 'A-Z', value: 'a-z' },
  { name: 'Z-A', value: 'z-a' },
]

const collectionsData: CollectionCardType[] = [
  {
    name: 'freefire',
    imageFront: '/images/collections/freefire.jpg',
    imageMiddle: '/images/collections/pubg.jpg',
    imageBack: '/images/collections/apex_legend.jpg',
  },
  {
    name: 'pubg',
    imageFront: '/images/collections/pubg.jpg',
    imageMiddle: '/images/collections/freefire.jpg',
    imageBack: '/images/collections/apex_legend.jpg',
  },
  {
    name: 'apex legend',
    imageFront: '/images/collections/apex_legend.jpg',
    imageMiddle: '/images/collections/pubg.jpg',
    imageBack: '/images/collections/freefire.jpg',
  },
  {
    name: 'pubg',
    imageFront: '/images/collections/pubg.jpg',
    imageMiddle: '/images/collections/freefire.jpg',
    imageBack: '/images/collections/apex_legend.jpg',
  },
  {
    name: 'apex legend',
    imageFront: '/images/collections/apex_legend.jpg',
    imageMiddle: '/images/collections/pubg.jpg',
    imageBack: '/images/collections/freefire.jpg',
  },
  {
    name: 'freefire',
    imageFront: '/images/collections/freefire.jpg',
    imageMiddle: '/images/collections/pubg.jpg',
    imageBack: '/images/collections/apex_legend.jpg',
  },
]

const CollectionsPage: NextPage = () => {
  const [selectedItem, setSelectedItem] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen p-4 pt-6 lg:px-16 mb-6">
      <BreadCrumb crumbs={crumbData} />
      <div className="flex justify-center mt-10">
        <PageHeading name="collections" />
      </div>
      <div className="flex justify-end mt-8 mb-32 relative">
        <CustomSelect
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          selectData={selectData}
          label="Sorted by"
        />
      </div>
      <div className="grid grid-cols-1 gap-y-8 lg:gap-y-16 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {collectionsData.map((data, index) => (
          <div key={index} className="flex justify-center">
            <CollectionCard {...data} />
          </div>
        ))}
      </div>
      <div className="my-12 lg:my-20 flex justify-end">
        <Pagination
          itemsPerPage={6}
          totalItems={18}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default CollectionsPage
