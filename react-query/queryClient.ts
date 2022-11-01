import { QueryClient } from 'react-query'

const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
    //   mutations: {
    //     onError: queryErrorHandler,
    //   },
  },
}

export function generateQueryClient(): QueryClient {
  return new QueryClient(queryClientConfig)
}

export const queryClient = generateQueryClient()
