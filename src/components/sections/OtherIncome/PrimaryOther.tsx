import InputField from '@/components/form-fields/InputField'
import RadioButton from '@/components/form-fields/RadioButton'
import { formatMoney } from '@/utils'
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
      <div className='px-5 py-6 sm:p-8'>
        <div className='flex max-w-2xl flex-col gap-x-4 gap-y-6'>
          <p className='mt-1 text-base font-medium leading-6 tracking-[0.02em] text-gray-900 sm:text-sm sm:leading-[22px]'>
            {section.description}
          </p>
          <div className='flex w-full flex-col items-start justify-start gap-x-8 gap-y-6 sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row'>
            <RadioButton
              {...register('otherIncomeSourceCode', { required: 'Required' })}
              errormsg={errors?.otherIncomeSourceCode?.message!}
              label='Yes, I have other income'
              id='otherIncome'
              value='OTHCSTM'
              variant='font-normal'
            />
            <RadioButton
              {...register('otherIncomeSourceCode', { required: 'Required' })}
              errormsg={errors?.otherIncomeSourceCode?.message!}
              label='No, I do not have other income'
              id='noOtherIncome'
              value=''
              variant='font-normal'
            />
          </div>
        </div>
        {hasOtherIncome && (
          <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 pt-8 sm:grid-flow-col sm:grid-cols-6'>
            <InputField
              {...register('otherIncomeAmount', {
                required: 'Required',
                onChange: (e: any) => {
                  e.target.value = formatMoney(e.target.value)
                },
              })}
              errormsg={errors?.otherIncomeAmount?.message!}
              variant='sm:col-span-2 whitespace-nowrap'
              placeholder='$2000'
              label='Monthly Amount*'
            />
            <InputField
              {...register('otherIncomeSourceDescription', {
                required: 'Required',
                maxLength: { value: 30, message: 'Must be less than 30' },
              })}
              errormsg={errors?.otherIncomeSourceDescription?.message!}
              variant='col-span-auto'
              placeholder='I move furniture on the weekends'
              label='Description*'
            />
            <input {...register('otherIncomeIntervalCode')} type='hidden' value='MO' />
          </div>
        )}
      </div>
    </div>
  )
}

export default PrimaryOther
