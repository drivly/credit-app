import Checkbox from '@/components/form-fields/Checkbox'
import InputField from '@/components/form-fields/InputField'
import RadioButton from '@/components/form-fields/RadioButton'
import SelectField from '@/components/form-fields/SelectField'
import { states, timeMonths, timeYears } from '@/lib/categories'
import { zipReg } from '@/lib/patterns'
import { formatMoney } from '@/utils'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

type JointAddrProps = {
  section: {
    title: string
  }
}

const currentFields = [
  'co_residenceTypeCode',
  'co_addressLine1',
  'co_addressLine2',
  'co_city',
  'co_state',
  'co_zipCode',
  'co_addressYears',
  'co_addressMonths',
  'co_rentMortgagePaymentAmount',
]

export default function JointAddr({ section }: JointAddrProps) {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()

  const jointAddrYrs = watch('co_addressYears')
  const sameAddress = watch('sameAddress')

  useEffect(() => {
    if (sameAddress) {
      currentFields.forEach((field: string) => {
        setValue(field, getValues(field.replace('co_', '')))
      })
    }
  }, [getValues, sameAddress, setValue])

  return (
    <>
      <h2 className='font-mont flex flex-row items-center gap-x-5 gap-y-4 px-5 text-lg font-semibold leading-7 text-gray-900 sm:flex-col sm:items-start sm:px-0 sm:text-base'>
        {section.title}
        <Checkbox
          {...register('sameAddress')}
          name='sameAddress'
          label='Same as above'
          className='px-5 font-medium sm:px-0'
        />
      </h2>
      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-5 py-6 sm:p-8'>
          <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
            <div className='flex w-full items-center justify-start gap-x-5 sm:gap-x-8'>
              <RadioButton
                {...register('co_residenceTypeCode', { required: 'Required' })}
                name='co_residenceTypeCode'
                errormsg={errors?.co_residenceTypeCode?.message!}
                label='Own'
                id='coOwn'
                value='1'
              />
              <RadioButton
                {...register('co_residenceTypeCode', { required: 'Required' })}
                errormsg={errors?.co_residenceTypeCode?.message!}
                name='co_residenceTypeCode'
                label='Rent'
                id='coRent'
                value='2'
              />
              <RadioButton
                {...register('co_residenceTypeCode', { required: 'Required' })}
                errormsg={errors?.co_residenceTypeCode?.message!}
                name='co_residenceTypeCode'
                label='Live with Others'
                id='coLiveWithOthers'
                value='3'
              />
            </div>
            <div className='col-span-full grid gap-y-3'>
              <InputField
                {...register('co_addressLine1', {
                  required: 'Required',
                  maxLength: { value: 200, message: 'Max 200 chars' },
                })}
                errormsg={errors?.co_addressLine1?.message!}
                placeholder='123 Main St'
                label='Street Address*'
              />
              <InputField
                {...register('co_addressLine2', {
                  maxLength: { value: 200, message: 'Max 200 chars' },
                })}
                errormsg={errors?.co_addressLine2?.message!}
                placeholder='APT, Suite, PO Box'
              />
            </div>
            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <InputField
                {...register('co_city', {
                  required: 'Required',
                  maxLength: { value: 30, message: 'Max 30 chars' },
                })}
                maxLength={30}
                errormsg={errors?.co_city?.message!}
                variant='sm:col-span-2'
                placeholder='New York'
                label='City*'
              />
              <SelectField
                {...register('co_state', { required: 'Required' })}
                variant='sm:col-span-2'
                label='State*'
                placeholder='Select'
                defaultValue=''
                cats={states}
                errormsg={errors?.co_state?.message!}
              />
              <InputField
                {...register('co_zipCode', {
                  required: 'Required',
                  pattern: { value: zipReg, message: 'Invalid Zip' },
                })}
                maxLength={5}
                errormsg={errors?.co_zipCode?.message!}
                variant='sm:col-span-2'
                placeholder='12345'
                label='Zipcode*'
              />
              <SelectField
                {...register('co_addressYears', { required: 'Required' })}
                variant='whitespace-nowrap sm:col-span-2'
                label='Time at Address*'
                defaultValue=''
                cats={timeYears}
                errormsg={errors?.co_addressYears?.message!}
              />
              <SelectField
                {...register('co_addressMonths')}
                variant='sm:col-span-2 whitespace-nowrap'
                defaultValue=''
                cats={timeMonths}
              />
              <InputField
                {...register('co_rentMortgagePaymentAmount', {
                  required: 'Required',
                  onChange: (e: any) => {
                    e.target.value = formatMoney(e.target.value)
                  },
                })}
                errormsg={errors?.co_rentMortgagePaymentAmount?.message!}
                variant='sm:col-span-2 whitespace-nowrap'
                placeholder='Enter $0, if no Payment/Rent'
                label='Monthly Payment*'
              />
            </div>
          </div>
        </div>
      </div>
      {jointAddrYrs < 2 && jointAddrYrs !== '' && (
        <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2'>
          <div className='px-4 py-6 sm:p-8'>
            <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
              <h4 className='font-medium text-gray-800'>Previous Address</h4>
              <div className='col-span-full grid gap-y-3'>
                <InputField
                  {...register('co_prevAddressLine1', {
                    required: 'Required',
                    maxLength: { value: 200, message: 'Max 200 chars' },
                  })}
                  errormsg={errors?.prevAddressLine1?.message!}
                  placeholder='123 Main St'
                  label='Street Address*'
                />
                <InputField
                  {...register('co_prevAddressLine2', {
                    maxLength: { value: 200, message: 'Max 200 chars' },
                  })}
                  errormsg={errors?.prevAddressLine2?.message!}
                  placeholder='APT, Suite, PO Box'
                />
              </div>
              <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <InputField
                  {...register('co_prevCity', {
                    required: 'Required',
                    maxLength: { value: 30, message: 'Max 30 chars' },
                  })}
                  maxLength={30}
                  errormsg={errors?.co_prevCity?.message!}
                  variant='sm:col-span-2'
                  placeholder='New York'
                  label='City*'
                />
                <SelectField
                  {...register('co_prevState', { required: 'Required' })}
                  variant='sm:col-span-2'
                  label='State*'
                  placeholder='Select'
                  defaultValue=''
                  cats={states}
                  errormsg={errors?.co_prevState?.message!}
                />
                <InputField
                  {...register('co_prevZipCode', {
                    required: 'Required',
                    pattern: { value: zipReg, message: 'Invalid Zip' },
                  })}
                  maxLength={5}
                  errormsg={errors?.co_prevZipCode?.message!}
                  variant='sm:col-span-2'
                  placeholder='12345'
                  label='Zipcode*'
                />
                <SelectField
                  {...register('co_prevAddressYears', { required: 'Required' })}
                  variant='whitespace-nowrap sm:col-span-2'
                  label='Time at Address*'
                  defaultValue=''
                  cats={timeYears}
                  errormsg={errors?.co_prevAddressYears?.message!}
                />
                <SelectField
                  {...register('co_prevAddressMonths')}
                  variant='sm:col-span-2 whitespace-nowrap'
                  defaultValue=''
                  cats={timeMonths}
                />
                <InputField
                  {...register('co_prevRentMortgagePaymentAmount', {
                    required: 'Required',
                    onChange: (e: any) => {
                      e.target.value = formatMoney(e.target.value)
                    },
                  })}
                  errormsg={errors?.co_prevRentMortgagePaymentAmount?.message!}
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
