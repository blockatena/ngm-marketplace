import { useRouter } from 'next/router'
import type { FC, ReactElement } from 'react'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import useIsMounted from '../utils/hooks/useIsMounted'

type withProtectionFn = (_Component: FC) => FC

const withProtection: withProtectionFn = (Component) => {
  const Authenticated: FC = (props): ReactElement | null => {
    const { isConnected } = useAccount()
    const router = useRouter()
    const isMounted = useIsMounted()

    useEffect(() => {
      if (isMounted && !isConnected) router.push('/connect-wallet')
    })

    return isConnected && isMounted ? (
      <Component {...props} />
    ) : isMounted ? (
      <div className="min-h-screen text-white font-poppins text-center text-lg pt-8">
        Redirecting...
      </div>
    ) : null
  }

  return Authenticated
}

export default withProtection
