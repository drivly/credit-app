'use client'

import FormCard from './FormCard'
import Applicant from './sections/Applicant'
import Employment from './sections/Employment'
import OtherIncome from './sections/OtherIncome'
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
        <header className='px-5 sm:px-0 md:mt-0'>
          <h1 className='mt-10 text-[28px] font-bold tracking-[0.02em] sm:text-2xl'>
            Primary Applicant
          </h1>
          {vin && <p className='extralight pt-2 text-xl sm:text-lg text-gray-600 tracking-wide'>{vin}</p>}
        </header>
      ) : null}

      {app.sections.map((section: any, index: number) => {
        switch (section.title) {
          case 'Personal Information':
            return <Applicant key={index} type={type} section={section} />
          case 'Employment History':
            return <Employment key={index} type={type} section={section} />
          case 'Residence':
            return <Residence key={index} type={type} section={section} />
          case 'Other Income Source':
            return <OtherIncome key={index} type={type} section={section} />
          default: {
            return <FormCard key={index + type} section={section} type={type} />
          }
        }
      })}
    </div>
  )
}
