'use client'

import FormCard from './FormCard'
import Employment from './sections/Employment'
import Residence from './sections/Residence'

type ApplicantType = 'Primary' | 'Joint'

interface CreditAppProps {
  type: ApplicantType
  app: any
  vin?: string
}

export default function CreditApp({ type, app, vin }: CreditAppProps) {
  return (
    <div className='space-y-10'>
      {type === 'Primary' ? (
        <header className='px-4  sm:px-0 md:mt-0'>
          <h1 className='text-2xl font-semibold leading-7 tracking-[0.02em] text-gray-900'>
            Primary Credit Applicant
          </h1>
          {vin && <p className='extralight pt-2 text-lg text-gray-600'>{vin}</p>}
        </header>
      ) : null}

      {app.sections.map((section: any, index: number) => {
        switch (section.title) {
          case 'Employment History':
            return <Employment key={index} type={type} section={section} />
          case 'Residence':
            return <Residence key={index} type={type} section={section} />
          default: {
            return <FormCard key={index + type} section={section} type={type} />
          }
        }
      })}
    </div>
  )
}
