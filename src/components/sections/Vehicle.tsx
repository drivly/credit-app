import React from 'react'
import InputField from '../form-fields/InputField'
import { formatMiles, formatMoney } from '@/utils'
import { useFormContext } from 'react-hook-form'

export default function Vehicle(props: any) {
  const { errors, watchJoint } = props

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
          <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <InputField
              {...register('vehicleModelYear', {
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
              name='vehicleModelYear'
              type='text'
            />
            <InputField
              {...register('vehicleMake')}
              variant='sm:col-span-4'
              placeholder='Ford'
              name='vehicleMake'
              label='Make'
              type='text'
            />
            <InputField
              {...register('vehicleModel')}
              variant='sm:col-span-4'
              placeholder='F-150 Raptor'
              label='Model'
              name='vehicleModel'
              type='text'
            />

            <InputField
              {...register('vehiclePrice', {
                maxLength: { value: 8, message: 'Invalid Price' },
                onChange(event) {
                  event.target.value = formatMoney(event.target.value)
                },
              })}
              placeholder='$56,370'
              variant='sm:col-span-2'
              label='Price'
              name='vehiclePrice'
              type='text'
            />

            <InputField
              {...register('vehicleMileage', {
                onChange(event) {
                  event.target.value = formatMiles(event.target.value)
                },
              })}
              placeholder='28,052'
              variant='sm:col-span-2'
              label='Mileage'
              type='text'
              name='vehicleMileage'
            />
            <InputField
              {...register('vehicleVin')}
              placeholder='WBAGV2C04LCD51052'
              variant='sm:col-span-4'
              label='VIN'
              type='text'
              name='vehicleVin'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
