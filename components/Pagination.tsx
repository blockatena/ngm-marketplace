import { FC, Fragment, useEffect, useState } from 'react'

interface PaginationProps {
  paginate: (_pageNumber: number) => void
  currentPage: number
  totalPages: number
}

// handle Paginations for activities , nfts, collections 
const Pagination: FC<PaginationProps> = ({
  paginate,
  currentPage,
  totalPages,
}) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([])

  useEffect(() => {
    let pages: number[] = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    setPageNumbers(pages)
  }, [totalPages])

  return (
    <nav className="text-white">
      <ul className="flex gap-1">
        {pageNumbers?.length !== 0 &&
          pageNumbers.map((number) => {
            if (
              number === 1 ||
              number === currentPage ||
              number === pageNumbers.length ||
              number === currentPage + 1 ||
              number === currentPage - 1
            ) {
              return (
                <Fragment key={number}>
                  {number === pageNumbers.length &&
                    pageNumbers.length > 3 &&
                    '...'}
                  <li
                    onClick={() => paginate(number)}
                    className={` bg-[#333335] cursor-pointer py-1 px-2 rounded-sm font-inter text-sm lg:text-lg ${
                      currentPage === number
                        ? ' text-[#F4F4F4] shadow-inner shadow-[#f4f4f4]'
                        : 'text-[#949191]'
                    }`}
                  >
                    {number}
                  </li>
                </Fragment>
              )
            }
          })}
      </ul>
    </nav>
  )
}

export default Pagination
