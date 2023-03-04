import { FC, ReactNode } from 'react'

export const OUTER_BOX_STYLE =
  'grid place-items-center w-full px-[5%] lg:px-[8%] 2xl:px-6'
export const INNER_BOX_STYLE = 'max-w-[120rem] w-full px-[5.93rem]'

// section container
const SectionContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={OUTER_BOX_STYLE}>
      <div className={INNER_BOX_STYLE}> {children}</div>
    </div>
  )
}

export default SectionContainer
