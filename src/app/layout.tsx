import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'
import { toastOptions } from '@drivly/ui'
import GlobalNav from './GlobalNav'
import Providers from './Providers'
import { HighlightInit } from '@highlight-run/next/client'
import { CONSTANTS } from './constants'

export const metadata = {
  title: 'Credit App',
  description: 'Generated by Driv.ly',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HighlightInit
        // excludedHostnames={['localhost']}
        projectId={CONSTANTS.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID}
        serviceName='credit-app'
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
        }}
      />
      <html lang='en'>
        <body className='bg-slate-50'>
          <main>
            <Providers>
              <GlobalNav />
              {children}
              <Toaster
                position='top-right'
                containerClassName='toast-container'
                toastOptions={toastOptions}
              />
            </Providers>
          </main>
        </body>
      </html>
    </>
  )
}
