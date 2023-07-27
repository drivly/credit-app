import React from 'react'
import { useFormContext } from 'react-hook-form'
import FieldMap from './FieldMap'

export default function FormCard({ section, type }: any) {
  const methods = useFormContext()

  const {
    formState: { errors },
  } = methods
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
      <h2 className='font-mont px-4 text-lg font-semibold leading-7 text-gray-900 sm:px-0 sm:text-base'>
        {section.title}
      </h2>

      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2'>
        <div className='px-4 py-6 sm:p-8'>
          <div className='grid max-w-2xl grid-cols-1 gap-y-8 sm:!grid-cols-6 sm:gap-x-6'>
            {section.fields.map((field: any, i: number) => (
              <FieldMap key={i} field={field} errors={errors} methods={methods} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
