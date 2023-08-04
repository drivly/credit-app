import FieldMap from '@/components/FieldMap'
import Checkbox from '@/components/form-fields/Checkbox'
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
      currentFields.forEach((field: Record<string, any>) => {
        methods.setValue('co_residenceTypeCode', methods.getValues('residenceTypeCode'))
        methods.setValue(field.name, methods.getValues(field.name.replace('co_', '')))
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sameAddress])

  return (
    <>
      <Checkbox
        {...register('sameAddress')}
        name='sameAddress'
        label='Same as above'
        className='px-5 pb-1.5 sm:px-0'
      />
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
            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              {currentFields.map((field: any, i: number) => (
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
