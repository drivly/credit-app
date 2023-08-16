'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from '@highlight-run/next/client'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
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

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default Providers
