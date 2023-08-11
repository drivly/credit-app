import FieldMap from '@/components/FieldMap'
import Checkbox from '@/components/form-fields/Checkbox'
import InputField from '@/components/form-fields/InputField'
import RadioButton from '@/components/form-fields/RadioButton'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export default function JointAddr({ section }: any) {
  const prevFields = section.fields.filter((field: any) => field.name.includes('prev'))
  const currentFields = section.fields.filter((field: any) => !field.name.includes('prev'))

  const methods = useFormContext()
  const {
    register,
    watch,
    formState: { errors },
  } = methods
  const jointAddrYrs = watch('co_addressYears')
  const sameAddress = watch('sameAddress')

  useEffect(() => {
    if (sameAddress) {
      console.log('currentFeilds', currentFields)
      currentFields.forEach((field: Record<string, any>) => {
        methods.setValue('co_residenceTypeCode', methods.getValues('residenceTypeCode'))
        methods.setValue(field.name, methods.getValues(field.name.replace('co_', '')))
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sameAddress])

  const filteredCurrent = currentFields.filter((field: Record<string, any>) => !field.name?.includes('addressLine') )

  return (
    <>
      <h2 className='font-mont flex flex-row items-center gap-x-5 gap-y-4 px-5 text-lg font-semibold leading-7 text-gray-900 sm:flex-col sm:items-start sm:px-0 sm:text-base'>
        {section.title}
        <Checkbox
          {...register('sameAddress')}
          name='sameAddress'
          label='Same as above'
          className='px-5 sm:px-0'
        />
      </h2>
      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2'>
        <div className='px-5 py-6 sm:p-8'>
          <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
            <div className='flex w-full items-center justify-start gap-x-8'>
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
                errormsg={errors.co_addressLine1?.message!}
                placeholder='123 Main St'
                label='Street Address*'
              />
              <InputField
                {...register('co_addressLine2', {
                  maxLength: { value: 200, message: 'Max 200 chars' },
                })}
                errormsg={errors.co_addressLine2?.message!}
                placeholder='APT, Suite, PO Box'
              />
            </div>
            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              {filteredCurrent.map((field: any, i: number) => (
                <FieldMap key={i} field={field} errors={errors} methods={methods} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {jointAddrYrs < 2 && (
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
                  errormsg={errors.co_prevAddressLine1?.message!}
                  placeholder='123 Main St'
                  label='Street Address*'
                />
                <InputField
                  {...register('co_prevAddressLine2', {
                    maxLength: { value: 200, message: 'Max 200 chars' },
                  })}
                  errormsg={errors.co_prevAddressLine2?.message!}
                  placeholder='APT, Suite, PO Box'
                />
              </div>
              <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                {prevFields.map((field: any, i: number) => (
                  <FieldMap key={i} field={field} errors={errors} methods={methods} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
