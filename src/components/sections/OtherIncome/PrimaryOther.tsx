import FieldMap from '@/components/FieldMap'
import RadioButton from '@/components/form-fields/RadioButton'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const PrimaryOther = ({ section }: { section: any }) => {
  const methods = useFormContext()
  const {
    register,
    watch,
    formState: { errors },
  } = methods

  const otherIncome = watch('otherIncomeSourceCode')
  const hasOtherIncome = otherIncome === 'OTHCSTM'

  return (
    <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
      <div className='px-4 py-6 sm:p-8'>
        <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
          <p className='mt-1 text-base leading-6 tracking-[0.02em] text-gray-900 sm:text-sm sm:leading-[22px]'>
            {section.description}
          </p>
          <div className='flex w-full items-center justify-start gap-x-8'>
            <RadioButton
              {...register('otherIncomeSourceCode', { required: 'Required' })}
              label='Yes, I have other income'
              id='otherIncome'
              value='OTHCSTM'
            />
            <RadioButton
              {...register('otherIncomeSourceCode', { required: 'Required' })}
              label='No, I do not have other income'
              id='noOtherIncome'
              value=''
            />
          </div>
          <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            {hasOtherIncome &&
              section.fields.map((field: any, i: number) => (
                <React.Fragment key={i}>
                  <FieldMap field={field} errors={errors} methods={methods} />
                  <input {...register('otherIncomeIntervalCode')} type='hidden' value='MO' />
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrimaryOther
