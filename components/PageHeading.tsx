import { FC } from 'react'

const PageHeading: FC<{ name: string }> = ({ name }) => {
  return (
    <h1
      className="font-poppins text-2xl md:text-4xl lg:text-[50px] border-0 border-l-4 border-l-custom_yellow
  lg:pl-6 pl-4 text-white font-semibold capitalize"
    >
      {name}
    </h1>
  )
}

export default PageHeading
