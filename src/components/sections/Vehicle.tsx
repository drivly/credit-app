import React from 'react'
import InputField from '../form-fields/InputField'
import { formatMiles, formatMoney } from '@/utils'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'next/navigation'

export default function Vehicle(props: any) {
  const { errors, watchJoint } = props
  const params = useParams()

  const { register } = useFormContext()
  return (
    <div
      className={`${
        watchJoint ? 'mb-10 mt-20 border-y py-20' : 'my-10 border-b py-10 pb-20'
      }  grid grid-cols-1 gap-x-8 gap-y-8   border-DRIVLY/10 md:grid-cols-3`}>
      <div className='px-4 sm:px-0'>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>Vehicle of Interest</h2>
      </div>

      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-4 py-6 sm:p-8'>
          <fieldset
            disabled={params?.vin ? true : false}
            className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <InputField
              {...register('year', {
                onChange: (event) =>
                  (event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4)),
                minLength: { value: 4, message: 'Invalid Year' },
                pattern: { value: /\d/g, message: 'Invalid Year' },
              })}
              errormsg={errors.vehicleModelYear?.message!}
              variant='sm:col-span-2 whitespace-nowrap'
              placeholder='2016'
              label='Model Year'
              maxLength={4}
            />
            <InputField
              {...register('make')}
              variant='sm:col-span-4'
              placeholder='Ford'
              label='Make'
            />
            <InputField
              {...register('model')}
              variant='sm:col-span-4'
              placeholder='F-150 Raptor'
              label='Model'
            />
            <InputField
              {...register('price', {
                maxLength: { value: 8, message: 'Invalid Price' },
                onChange(event) {
                  event.target.value = formatMoney(event.target.value)
                },
              })}
              placeholder='$56,370'
              variant='sm:col-span-2'
              label='Price'
            />
            <InputField
              {...register('miles', {
                onChange(event) {
                  event.target.value = formatMiles(event.target.value)
                },
              })}
              placeholder='28,052'
              variant='sm:col-span-2'
              label='Mileage'
            />
            <InputField
              {...register('vin')}
              placeholder='WBAGV2C04LCD51052'
              variant='sm:col-span-4'
              label='VIN'
            />
          </fieldset>
        </div>
      </div>
    </div>
  )
}
