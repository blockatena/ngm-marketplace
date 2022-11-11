import { FC } from 'react'

interface SpinnerProps {
  color?: 'black' | 'primary'
  size?: 'sm' | 'md' | 'lg'
}
const Spinner: FC<SpinnerProps> = ({ color = 'primary' }) => {
  let borderColor = 'border-custom_yellow'
  let dimensions = 'w-4 h-4 lg:w-8 lg:h-8'

  if (color === 'black') {
    borderColor = 'border-black'
  }

  return (
    <span
      className={`block border-2 ${borderColor} border-dashed ${dimensions}
        rounded-full animate-spin`}
    ></span>
  )
}

export default Spinner
