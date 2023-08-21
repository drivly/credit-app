import InputField from '@/components/form-fields/InputField'
import RadioButton from '@/components/form-fields/RadioButton'
import SelectField from '@/components/form-fields/SelectField'
import { states, timeMonths, timeYears } from '@/lib/categories'
import { zipReg } from '@/lib/patterns'
import { formatMoney } from '@/utils'
import { useFormContext } from 'react-hook-form'

type PrimaryAddrProps = {
  section: {
    title: string
  }
}

export default function PrimaryAddr({ section }: PrimaryAddrProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()

  const addressYears = watch('addressYears')

  return (
    <>
      <h2 className=' font-mont flex justify-start gap-x-14 px-5 text-lg font-semibold leading-7 text-gray-900 sm:px-0 sm:text-base'>
        {section.title}
      </h2>
      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-5 py-6 sm:p-8'>
          <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
            <div className='flex w-full items-center justify-start gap-x-5 sm:gap-x-8'>
              <RadioButton
                {...register('residenceTypeCode', { required: 'Required' })}
                errormsg={errors?.residenceTypeCode?.message!}
                label='Own'
                id='own'
                value='1'
              />
              <RadioButton
                {...register('residenceTypeCode', { required: 'Required' })}
                errormsg={errors?.residenceTypeCode?.message!}
                label='Rent'
                id='rent'
                value='2'
              />
              <RadioButton
                {...register('residenceTypeCode', { required: 'Required' })}
                errormsg={errors?.residenceTypeCode?.message!}
                label='Live With Others'
                id='liveWithOthers'
                value='3'
              />
            </div>
            <div className='col-span-full grid gap-y-3'>
              <InputField
                {...register('addressLine1', {
                  required: 'Required',
                  maxLength: { value: 200, message: 'Max 200 chars' },
                })}
                errormsg={errors?.addressLine1?.message!}
                placeholder='123 Main St'
                label='Street Address*'
              />
              <InputField
                {...register('addressLine2', {
                  maxLength: { value: 200, message: 'Max 200 chars' },
                })}
                errormsg={errors?.addressLine2?.message!}
                placeholder='APT, Suite, PO Box'
              />
            </div>
            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <InputField
                {...register('city', {
                  required: 'Required',
                  maxLength: { value: 30, message: 'Max 30 chars' },
                })}
                maxLength={30}
                errormsg={errors?.city?.message!}
                variant='sm:col-span-2'
                placeholder='New York'
                label='City*'
              />
              <SelectField
                {...register('state', { required: 'Required' })}
                variant='sm:col-span-2'
                label='State*'
                placeholder='Select'
                defaultValue=''
                cats={states}
                errormsg={errors?.state?.message!}
              />
              <InputField
                {...register('zipCode', {
                  required: 'Required',
                  pattern: { value: zipReg, message: 'Invalid Zip' },
                })}
                maxLength={5}
                errormsg={errors?.zipCode?.message!}
                variant='sm:col-span-2'
                placeholder='12345'
                label='Zipcode*'
              />
              <SelectField
                {...register('addressYears', { required: 'Required' })}
                variant='whitespace-nowrap sm:col-span-2'
                label='Time at Address*'
                defaultValue=''
                cats={timeYears}
                errormsg={errors?.addressYears?.message!}
              />
              <SelectField
                {...register('addressMonths')}
                variant='sm:col-span-2 whitespace-nowrap'
                defaultValue=''
                cats={timeMonths}
              />
              <InputField
                {...register('rentMortgagePaymentAmount', {
                  required: 'Required',
                  onChange: (e: any) => {
                    e.target.value = formatMoney(e.target.value)
                  },
                })}
                errormsg={errors?.rentMortgagePaymentAmount?.message!}
                variant='sm:col-span-2 whitespace-nowrap'
                placeholder='Enter $0, if no Payment/Rent'
                label='Monthly Payment*'
              />
            </div>
          </div>
        </div>
      </div>
      {addressYears < 2 && addressYears !== '' && (
        <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2'>
          <div className='px-4 py-6 sm:p-8'>
            <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
              <h4 className='font-medium text-gray-800'>Previous Address</h4>
              <div className='col-span-full grid gap-y-3'>
                <InputField
                  {...register('prevAddressLine1', {
                    required: 'Required',
                    maxLength: { value: 200, message: 'Max 200 chars' },
                  })}
                  errormsg={errors?.prevAddressLine1?.message!}
                  placeholder='123 Main St'
                  label='Street Address*'
                />
                <InputField
                  {...register('prevAddressLine2', {
                    maxLength: { value: 200, message: 'Max 200 chars' },
                  })}
                  errormsg={errors?.prevAddressLine2?.message!}
                  placeholder='APT, Suite, PO Box'
                />
              </div>
              <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <InputField
                  {...register('prevCity', {
                    required: 'Required',
                    maxLength: { value: 30, message: 'Max 30 chars' },
                  })}
                  maxLength={30}
                  errormsg={errors?.prevCity?.message!}
                  variant='sm:col-span-2'
                  placeholder='New York'
                  label='City*'
                />
                <SelectField
                  {...register('prevState', { required: 'Required' })}
                  variant='sm:col-span-2'
                  label='State*'
                  placeholder='Select'
                  defaultValue=''
                  cats={states}
                  errormsg={errors?.prevState?.message!}
                />
                <InputField
                  {...register('prevZipCode', {
                    required: 'Required',
                    pattern: { value: zipReg, message: 'Invalid Zip' },
                  })}
                  maxLength={5}
                  errormsg={errors?.prevZipCode?.message!}
                  variant='sm:col-span-2'
                  placeholder='12345'
                  label='Zipcode*'
                />
                <SelectField
                  {...register('prevAddressYears', { required: 'Required' })}
                  variant='whitespace-nowrap sm:col-span-2'
                  label='Time at Address*'
                  defaultValue=''
                  cats={timeYears}
                  errormsg={errors?.prevAddressYears?.message!}
                />
                <SelectField
                  {...register('prevAddressMonths')}
                  variant='sm:col-span-2 whitespace-nowrap'
                  defaultValue=''
                  cats={timeMonths}
                />
                <InputField
                  {...register('prevRentMortgagePaymentAmount', {
                    required: 'Required',
                    onChange: (e: any) => {
                      e.target.value = formatMoney(e.target.value)
                    },
                  })}
                  errormsg={errors?.prevRentMortgagePaymentAmount?.message!}
                  variant='sm:col-span-2 whitespace-nowrap'
                  placeholder='Enter $0, if no Payment/Rent'
                  label='Monthly Payment*'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
