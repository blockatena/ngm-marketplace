import { ReactElement } from 'react'
import { useIsFetching, useIsMutating } from 'react-query'

// Loading function
export default function Loading(): ReactElement {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const display = isFetching || isMutating ? 'block' : 'hidden'

  return (
    <div
      className={`${display} fixed left-[50%] top-[50%] border-2 border-custom_yellow border-dashed h-5 w-5 lg:h-10 lg:w-10 rounded-full animate-spin`}
    ></div>
  )
}
