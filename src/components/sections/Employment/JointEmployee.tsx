import FieldMap from '@/components/FieldMap'
import SelectField from '@/components/form-fields/SelectField'
import { jobStatus } from '@/lib/categories'
import { useFormContext } from 'react-hook-form'

export default function JointEmployee({ section }: any) {
  const prevFields = section.fields.filter((field: any) => field.name.includes('prev'))
  const currentFields = section.fields.filter((field: any) => !field.name.includes('prev'))

  const methods = useFormContext()
  const {
    control,
    watch,
    formState: { errors },
  } = methods

  const jointJobYrs = watch('co_timeOnJobYears')
  const watchJobStatus = watch('co_employmentStatusCode')
  const jobless = watchJobStatus === 'Not Applicable' || watchJobStatus === ''

  return (
    <>
      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-5 py-6 sm:p-8'>
          <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <SelectField
                variant='w-full sm:col-span-3'
                label='Employment Status*'
                name='co_employmentStatusCode'
                placeholder='Select'
                control={control}
                cats={jobStatus}
                errormsg={errors['co_employmentStatusCode']?.message!}
                rules={{ required: 'Required' }}
              />
            </div>
            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              {!jobless &&
                currentFields.map((field: any, i: number) => (
                  <FieldMap key={i} field={field} errors={errors} methods={methods} />
                ))}
            </div>
          </div>
        </div>
      </div>
      {jointJobYrs < 2 && (
        <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2'>
          <div className='px-4 py-6 sm:p-8'>
            <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
              <h4 className='font-medium text-gray-800'>Previous Employer</h4>
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
