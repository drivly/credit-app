import FieldMap from '@/components/FieldMap'
import InputField from '@/components/form-fields/InputField'
import RadioButton from '@/components/form-fields/RadioButton'
import { useFormContext } from 'react-hook-form'

export default function PrimaryAddr({ section }: any) {
  const prevFields = section.fields.filter((field: any) => field.name.includes('prev'))
  const currentFields = section.fields.filter((field: any) => !field.name.includes('prev'))

  const methods = useFormContext()
  const {
    register,
    watch,
    formState: { errors },
  } = methods

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
                name='residenceTypeCode'
                errormsg={errors?.residenceTypeCode?.message!}
                label='Own'
                id='own'
                value='1'
              />
              <RadioButton
                {...register('residenceTypeCode', { required: 'Required' })}
                errormsg={errors?.residenceTypeCode?.message!}
                name='residenceTypeCode'
                label='Rent'
                id='rent'
                value='2'
              />
              <RadioButton
                {...register('residenceTypeCode', { required: 'Required' })}
                errormsg={errors?.residenceTypeCode?.message!}
                name='residenceTypeCode'
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
                errormsg={errors.addressLine1?.message!}
                placeholder='123 Main St'
                label='Street Address*'
              />
              <InputField
                {...register('addressLine2', {
                  maxLength: { value: 200, message: 'Max 200 chars' },
                })}
                errormsg={errors.addressLine2?.message!}
                placeholder='APT, Suite, PO Box'
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
      {addressYears < 2 && (
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
                  errormsg={errors.prevAddressLine1?.message!}
                  placeholder='123 Main St'
                  label='Street Address*'
                />
                <InputField
                  {...register('prevAddressLine2', {
                    maxLength: { value: 200, message: 'Max 200 chars' },
                  })}
                  errormsg={errors.prevAddressLine2?.message!}
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
