import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'
import { CrumbType } from '../interfaces'

interface BreadCrumbProps {
  crumbs: CrumbType[]
}

const BreadCrumb: FC<BreadCrumbProps> = ({ crumbs }) => {
  const router = useRouter()
  return (
    <div className="flex gap-2 lg:gap-4 text-[14px] md:text-base lg:text-[19px] font-poppins capitalize">
      {crumbs.map(({ name, route }, index) => {
        if (index + 1 === crumbs.length) {
          return (
            <p className="text-white" key={index}>
              {name}
            </p>
          )
        }
        return (
          <Fragment key={index}>
            <p
              className="text-[#929191] hover:text-white cursor-pointer"
              onClick={() => router.push(route)}
            >
              {name}
            </p>
            <p className="text-custom_yellow font-thin">|</p>
          </Fragment>
        )
      })}
    </div>
  )
}

export default BreadCrumb
