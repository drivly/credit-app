import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'
import { toastOptions } from '@drivly/ui'
import GlobalNav from './GlobalNav'

export const metadata = {
  title: 'Credit App',
  description: 'Generated by Driv.ly',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-slate-50'>
        <main>
          <GlobalNav />
          {children}
          <Toaster
            position='top-right'
            containerClassName='toast-container'
            toastOptions={toastOptions}
          />
        </main>
      </body>
    </html>
  )
}
