import { NextPage } from 'next'
import { useRouter } from 'next/router'

import WalletOptions from '../../components/WalletOptions'

const ConnectPage: NextPage = () => {
  const router = useRouter()
  return (
    <div>
      <main className="p-4 pt-6 lg:px-16">
        <h6 className="mb-4 text-sm md:text-lg font-poppins">
          <span
            className="text-gray-300 cursor-pointer hover:text-white hover:font-medium"
            onClick={() => router.push('/')}
          >
            Home
          </span>{' '}
          <span className="text-custom_yellow">|</span>{' '}
          <span className="text-white font-medium">connect wallet</span>
        </h6>
        <div
          className="placeholder:bg-fixed bg-cover mb-8  h-80 w-full text-white flex items-center px-8 lg:mb-14"
          style={{
            backgroundImage: "url('/img/connect_hero.png')",
          }}
        >
          <div className="h-56 rounded-lg bg-custom_purple opacity-70 w-full lg:w-2/5 grid place-items-center">
            <div className="border-l-4 border-custom_yellow px-2">
              <p className="text-custom_yellow font-inter font-light md:text-2xl lg:text-4xl">
                Welcome!
              </p>
              <p className="text-white font-semibold md:text-3xl lg:text-5xl font-poppins">
                Connect Wallet
              </p>
            </div>
          </div>
        </div>
        <WalletOptions />
      </main>
    </div>
  )
}

export default ConnectPage
