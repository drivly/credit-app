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
        projectId={CONSTANTS.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID}
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: ['http://localhost:3001/', 'http://localhost:3000/'],
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
