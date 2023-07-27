'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import navLogo from '../../public/DrivlyLogo.svg'

const GlobalNav = () => {
  return (
    <nav className='sticky top-0 z-20 flex h-[65px] border-b border-zinc-200 bg-white'>
      <div className='mx-auto block h-full w-screen max-w-[1200px]'>
        <div className='flex h-full items-center justify-between px-0 md:px-10'>
          <Link
            href='/get-started'
            className='focus-visible:ring-primary ml-4 w-fit cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 md:ml-0'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='w-fit flex-shrink-0'>
              <Image
                className='inline-block h-8 w-auto sm:h-9'
                src={navLogo}
                alt='Drivly and Rocket Auto Logo'
                priority
              />
            </motion.div>
          </Link>
          <a
            href='tel:+18007306420'
            className='mr-4 inline-flex items-center justify-center rounded-[5px] border border-neutral-300 bg-white px-[10px] py-2 hover:bg-neutral-100'>
            Contact us
          </a>
        </div>
      </div>
    </nav>
  )
}

export default GlobalNav
