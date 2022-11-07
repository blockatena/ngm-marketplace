import { useRouter } from 'next/router'
import type { FC, ReactElement } from 'react'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

type withProtectionFn = (_Component: FC) => FC

const withProtection: withProtectionFn = (Component) => {
  const Authenticated: FC = (props): ReactElement | null => {
    const { isConnected } = useAccount()
    const router = useRouter()

    useEffect(() => {
      if (!isConnected) router.push('/connect-wallet')
    })

    return isConnected ? (
      <Component {...props} />
    ) : (
      <div className="min-h-screen text-white font-poppins text-center text-lg pt-8">
        Redirecting...
      </div>
    )
  }

  return Authenticated
}

export default withProtection
