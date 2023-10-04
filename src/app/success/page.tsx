'use client'

import useCustomer from '../store'

const SuccessPage = ({ searchParams }: { searchParams: any }) => {
  const [customer, resetCustomer] = useCustomer((s) => [s.customer, s.resetCustomer])

  return (
    <div className='mx-auto -mt-[65px] flex h-screen min-h-full w-full max-w-2xl flex-1 flex-col items-center justify-center rounded-md px-4 py-4 sm:px-8'>
      <svg
        width='51'
        height='50'
        viewBox='0 0 51 50'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g id='Check'>
          <g clipPath='url(#clip0_637_554)'>
            <circle
              id='Ellipse 1037'
              cx='24.5'
              cy='25.5'
              r='37.5'
              fill='#00CAB9'
              fillOpacity='0.1'
            />
            <circle id='Ellipse 1036' cx='25.4993' cy='25.0001' r='20.8333' fill='white' />
            <path
              id='Vector'
              d='M25.391 31.1592L25.3912 31.1593L25.4002 31.1502L34.6288 21.9217H34.6292L34.7756 21.7752C35.5803 20.9706 35.5803 19.654 34.7756 18.8494C33.971 18.0447 32.6544 18.0447 31.8498 18.8494L31.8495 18.8497L23.9377 26.7762L19.1508 21.9749L19.1502 21.9744C18.3456 21.1697 17.029 21.1697 16.2244 21.9744C15.4197 22.779 15.4197 24.0956 16.2244 24.9002L22.4744 31.1502L22.4742 31.1503L22.4835 31.1592C22.8858 31.5413 23.3986 31.7498 23.9373 31.7498C24.476 31.7498 24.9888 31.5413 25.391 31.1592ZM4.125 25C4.125 13.2136 13.7136 3.625 25.5 3.625C37.2864 3.625 46.875 13.2136 46.875 25C46.875 36.7864 37.2864 46.375 25.5 46.375C13.7136 46.375 4.125 36.7864 4.125 25Z'
              fill='#00CAB9'
              stroke='#06C0B1'
            />
          </g>
        </g>
        <defs>
          <clipPath id='clip0_637_554'>
            <rect x='0.5' width='50' height='50' rx='25' fill='white' />
          </clipPath>
        </defs>
      </svg>
      <header className='mb-8 mt-6 text-gray-900'>
        <h2 className='flex flex-col items-center space-x-1 text-[28px] font-semibold leading-[42px]'>
          Thanks, {customer?.name}!
        </h2>
        <p className='text-center text-lg font-medium leading-7'>
          Your Credit Application has been successfully submitted.
        </p>
      </header>

      <div className='inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-6 py-4 shadow'>
        <span className='text-lg font-medium leading-relaxed tracking-tight text-gray-900 sm:text-base'>
          Your application ID:{' '}
          {customer?.applicationId ? customer?.applicationId : searchParams?.id}
        </span>
      </div>
    </div>
  )
}

export default SuccessPage
