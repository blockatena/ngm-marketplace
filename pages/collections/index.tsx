import { motion } from 'framer-motion'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getCollections } from '../../api/queries'
import BreadCrumb from '../../components/BreadCrumb'
import CollectionCard from '../../components/CollectionCard'
import CustomSelect from '../../components/CustomSelect'
import PageHeading from '../../components/PageHeading'
import Pagination from '../../components/Pagination'
import type {
  CollectionCardType,
  CrumbType,
  selectDataType,
} from '../../interfaces'
import { handleAnimationDelay } from '../../utils'
import { opacityAnimation } from '../../utils/animations'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

const crumbData: CrumbType[] = [
  { name: 'home', route: '/' },
  { name: 'collections', route: '/collections' },
]

const selectData: selectDataType[] = [
  { name: 'Recently', value: 'recently' },
  { name: 'A-Z', value: 'a-z' },
  { name: 'Z-A', value: 'z-a' },
]

// const collectionsData: CollectionCardType[] = [
//   {
//     id: 1,
//     name: 'freefire',
//     imageFront: '/images/collections/freefire.jpg',
//     imageMiddle: '/images/collections/pubg.jpg',
//     imageBack: '/images/collections/apex_legend.jpg',
//   },
//   {
//     id: 2,
//     name: 'pubg',
//     imageFront: '/images/collections/pubg.jpg',
//     imageMiddle: '/images/collections/freefire.jpg',
//     imageBack: '/images/collections/apex_legend.jpg',
//   },
//   {
//     id: 3,
//     name: 'apex legend',
//     imageFront: '/images/collections/apex_legend.jpg',
//     imageMiddle: '/images/collections/pubg.jpg',
//     imageBack: '/images/collections/freefire.jpg',
//   },
//   {
//     id: 4,
//     name: 'pubg',
//     imageFront: '/images/collections/pubg.jpg',
//     imageMiddle: '/images/collections/freefire.jpg',
//     imageBack: '/images/collections/apex_legend.jpg',
//   },
//   {
//     id: 5,
//     name: 'apex legend',
//     imageFront: '/images/collections/apex_legend.jpg',
//     imageMiddle: '/images/collections/pubg.jpg',
//     imageBack: '/images/collections/freefire.jpg',
//   },
//   {
//     id: 6,
//     name: 'freefire',
//     imageFront: '/images/collections/freefire.jpg',
//     imageMiddle: '/images/collections/pubg.jpg',
//     imageBack: '/images/collections/apex_legend.jpg',
//   },
// ]

const CollectionsPage: NextPage = () => {
  const [selectedItem, setSelectedItem] = useState('recently')
  const [currentPage, setCurrentPage] = useState(1)
  const { width } = useWindowDimensions()
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const { isSuccess, isError, data, error, isLoading } = useQuery(
    'getCollections',
    () => getCollections()
  )
  const [collections, setCollections] = useState<CollectionCardType[]>([])
  const [dataAscending, setDataAscending] = useState<CollectionCardType[]>([])
  const [dataDescending, setDataDescending] = useState<CollectionCardType[]>([])
  const [dataUnsorted, setDataUnsorted] = useState<CollectionCardType[]>([])

  // const collectionsData: CollectionCardType[] = data?.data

  const compareAscending = (
    a: { collectionName: string },
    b: { collectionName: string }
  ) => {
    if (a.collectionName < b.collectionName) return -1
    if (a.collectionName > b.collectionName) return 1
    return 0
  }

  const compareDescending = (
    a: { collectionName: string },
    b: { collectionName: string }
  ) => {
    if (a.collectionName > b.collectionName) return -1
    if (a.collectionName < b.collectionName) return 1
    return 0
  }

  useEffect(() => {
    if (selectedItem === 'a-z') {
      setCollections(dataAscending)
    } else if (selectedItem === 'z-a') {
      setCollections(dataDescending)
    } else {
      setCollections(dataUnsorted)
    }
  }, [selectedItem, dataAscending, dataUnsorted, dataDescending])

  useEffect(() => {
    if (data?.data.length) {
      let unsortedData = data.data
      const newArr = [...unsortedData]
      const newArr2 = [...unsortedData]
      setDataUnsorted(unsortedData)
      const ascendingArr = newArr.sort(compareAscending)
      setDataAscending(ascendingArr)
      const descendingArr = newArr2.sort(compareDescending)
      setDataDescending(descendingArr)
    }
  }, [data?.data])

  return (
    <div className="min-h-screen p-4 pt-6 lg:px-16 mb-6">
      <BreadCrumb crumbs={crumbData} />
      <PageHeading name="collections" />
      <div className="h-16 flex justify-end mt-2 mb-5 lg:mb-[90px]">
        <div className="absolute z-40">
          <CustomSelect
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            selectData={selectData}
            label="Sorted by"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-8 lg:gap-y-16 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {collections?.length &&
          collections.map((collection, index) => (
            <motion.div
              key={index}
              className="flex justify-center"
              variants={opacityAnimation}
              initial="initial"
              whileInView="final"
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.6,
                delay: handleAnimationDelay(index, width),
              }}
            >
              <CollectionCard {...collection} />
            </motion.div>
          ))}
      </div>
      <div className="my-12 lg:my-20 flex justify-end">
        <Pagination
          itemsPerPage={18}
          totalItems={18}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default CollectionsPage
