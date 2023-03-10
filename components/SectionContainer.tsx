import { FC, ReactNode } from 'react'
// 'grid place-items-center w-full px-[5%] lg:px-[8%] 2xl:px-6'

export const OUTER_BOX_STYLE =
  'grid place-items-center w-full px-[5%] lg:px-[2%] xl:px-[6%]'
export const INNER_BOX_STYLE =
  'max-w-[120rem]  w-full xl:scale-90 origin-center'
// 'max-w-[62.5rem] xl:max-w-[120rem]  w-full lg:px-[5.93rem]  px-[.1rem] xl:scale-90 origin-center'

// section container
const SectionContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={OUTER_BOX_STYLE}>
      <div className={INNER_BOX_STYLE}> {children}</div>
    </div>
  )
}

export default SectionContainer
