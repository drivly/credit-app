import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry(failureCount, error: any) {
            if (error.status === 404) return false
            else if (failureCount < 2) return true
            else return false
          },
        },
      },
    })
)

export default getQueryClient
