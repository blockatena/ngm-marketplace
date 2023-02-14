import { motion } from 'framer-motion'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import BreadCrumb from '../../components/BreadCrumb'
import CollectionCard from '../../components/CollectionCard'
import CustomSelect from '../../components/CustomSelect'
import PageHeading from '../../components/PageHeading'
import Pagination from '../../components/Pagination'
import withProtection from '../../components/withProtection'
import type {
  CollectionCardType,
  CrumbType,
  selectDataType,
} from '../../interfaces'
import { QUERIES } from '../../react-query/constants'
import { getCollections } from '../../react-query/queries'
import { handleAnimationDelay } from '../../utils'
import { opacityAnimation } from '../../utils/animations'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

const crumbData: CrumbType[] = [
  { name: 'home', route: '/' },
  { name: 'collections', route: '/collections' },
]

const selectData: selectDataType[] = [
  { name: 'Recently', value: 'Recently' },
  {name: "Oldest", value:"Oldest"},
  { name: 'A - Z', value: 'A - Z' },
  { name: 'Z - A', value: 'Z - A' },
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
  const { width } = useWindowDimensions()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sort_by,setSortBy] = useState("NA")
  const { data, isSuccess, refetch } = useQuery(
    [QUERIES.getCollections, currentPage],
    () => getCollections(currentPage, 12, sort_by)
  )
  const [selectedItem, setSelectedItem] = useState('Sorted By')
  const [collections, setCollections] = useState<CollectionCardType[]>([])

  // const collectionsData: CollectionCardType[] = data?.data

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const handleSort = async (_value: any) => {
      // console.log(_value)
      if (_value) {
        await setSortBy(_value)
        return await refetch()
      }
      setSortBy('NA')
    }
  // const compareAscending = (
  //   a: { collection_name: string },
  //   b: { collection_name: string }
  // ) => {
  //   if (a.collection_name?.toLowerCase() < b.collection_name?.toLowerCase())
  //     return -1
  //   if (a.collection_name?.toLowerCase() > b.collection_name?.toLowerCase())
  //     return 1
  //   return 0
  // }

  // const compareDescending = (
  //   a: { collection_name: string },
  //   b: { collection_name: string }
  // ) => {
  //   if (a.collection_name?.toLowerCase() > b.collection_name?.toLowerCase())
  //     return -1
  //   if (a.collection_name?.toLowerCase() < b.collection_name?.toLowerCase())
  //     return 1
  //   return 0
  // }

  const handleSorts = (sort_by:any)=> {
    if(!sort_by) return;
    if (sort_by == 'A - Z') {
      handleSort('ATOZ')
    } else if (sort_by == 'Z - A') {
      handleSort('ZTOA')
    } else if (sort_by == 'Recently') {
      handleSort('NEWTOOLD')
    } else if (sort_by == 'Oldest') {
      handleSort('OLDTONEW')
    } else {
      handleSort('NA')
    }
    // if (selectedItem === 'A - Z') {
    //   handleSort('ATOZ')
    // } else if (selectedItem === 'Z - A') {
    //   handleSort('ZTOA')
    // } else if (selectedItem === 'Recently') {
    //   handleSort('NEWTOOLD')
    // } else if (selectedItem === 'Oldest') {
    //   handleSort('OLDTONEW')
    // } else {
    //   handleSort('NA')
    // }
  }
    // useEffect(() => {
    //   handleSorts()
    // })
  // useEffect(() => {
  //   if (selectedItem === 'a-z') {
  //     setCollections(dataAscending)
  //   } else if (selectedItem === 'z-a') {
  //     setCollections(dataDescending)
  //   } else if (selectedItem === 'recently') {
  //     setCollections(dataRecent)
  //   } else {
  //     setCollections(dataUnsorted)
  //   }
  // }, [selectedItem, dataAscending, dataUnsorted, dataDescending, dataRecent])
console.log(totalPages)
useEffect(()=> {
  setCollections(data?.data.collections)
  setTotalPages(data?.data?.totalpages)
  setCurrentPage(Number(data?.data?.currentPage))
},[data])
  // useEffect(() => {
  //   if (data?.data?.collections.length) {
  //     let unsortedData = data.data.collections
  //     const newArr = [...unsortedData]
  //     const newArr2 = [...unsortedData]
  //     const newArr3 = [...unsortedData]
  //     setDataUnsorted(unsortedData)
  //     setTotalPages(data?.data?.total_pages)
  //     setCurrentPage(Number(data?.data?.currentPage))
  //     const ascendingArr = newArr.sort(compareAscending)
  //     setDataAscending(ascendingArr)
  //     const descendingArr = newArr2.sort(compareDescending)
  //     setDataDescending(descendingArr)
  //     setDataRecent(newArr3.reverse())
  //   }
  // }, [data?.data])

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
            handleSorts={handleSorts}
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
        {isSuccess && collections?.length === 0 && (
          <p className="font-inter text-white text-lg text-center p-8">
            No Collections found
          </p>
        )}
      </div>
      <div className="my-12 lg:my-20 flex justify-end">
        <Pagination
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default withProtection(CollectionsPage)
