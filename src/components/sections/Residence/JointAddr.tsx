import FieldMap from '@/components/FieldMap'
import { useFormContext } from 'react-hook-form'

export default function JointAddr({ section }: any) {
  const prevFields = section.fields.filter((field: any) => field.name.includes('prev'))
  const currentFields = section.fields.filter((field: any) => !field.name.includes('prev'))

  const methods = useFormContext()
  const {
    watch,
    formState: { errors },
  } = methods
  const jointAddrYrs = watch('coAddressYears')

  return (
    <>
      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-4 py-6 sm:p-8'>
          <div className='flex max-w-2xl flex-col gap-y-8 gap-x-4'>
            <div className='flex max-w-2xl flex-col gap-y-8 gap-x-4'>
              <div className='flex w-full items-center justify-between rounded-b-[5px]'>
                <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  {currentFields.map((field: any, i: number) => (
                    <FieldMap key={i} field={field} errors={errors} methods={methods} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {jointAddrYrs < 2 && (
        <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2'>
          <div className='px-4 py-6 sm:p-8'>
            <div className='flex max-w-2xl flex-col gap-y-8 gap-x-4'>
              <div className='flex max-w-2xl flex-col gap-y-8 gap-x-4'>
                <h4 className='font-medium text-gray-800'>Previous Address</h4>
                <div className='flex w-full items-center justify-between rounded-b-[5px]'>
                  <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                    {prevFields.map((field: any, i: number) => (
                      <FieldMap key={i} field={field} errors={errors} methods={methods} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
