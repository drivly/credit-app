import React from 'react'
import InputField from '../form-fields/InputField'
import { cn, formatMiles, formatMoney, vinChecksum } from '@/utils'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'next/navigation'
import useCustomer from '@/app/store'

export default function Vehicle(props: any) {
  const { errors, watchJoint } = props
  const setCustomer = useCustomer((s) => s.setCustomer)
  const params = useParams()
  const methods = useFormContext()
  const { register } = methods

  return (
    <div
      className={cn(
        'my-10 grid grid-cols-1 gap-x-8 gap-y-8 border-b border-DRIVLY/10 py-10 pb-20 md:grid-cols-3',
        {
          'mb-10 mt-20 border-y py-20': watchJoint,
        }
      )}>
      <h2 className='font-mont px-5 text-lg font-semibold leading-7 text-gray-900 sm:px-0 sm:text-base'>
        Vehcile of Interest
      </h2>

      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-5 py-6 sm:p-8'>
          <fieldset
            disabled={params?.vin ? true : false}
            className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10'>
            <InputField
              {...register('vehicleVin', {
                validate: (value: string) => vinChecksum(value) || 'Invalid VIN',
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase() as string
                  setCustomer({ vin: e.target.value })
                },
              })}
              errormsg={errors.vehicleVin?.message!}
              placeholder='WBAGV2C04LCD51052'
              variant='sm:col-span-full'
              label='VIN'
              type='text'
              name='vehicleVin'
            />
            <InputField
              {...register('vehicleYear', {
                onChange: (event) =>
                  (event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4)),
                minLength: { value: 4, message: 'Invalid Year' },
                pattern: { value: /\d/g, message: 'Invalid Year' },
              })}
              errormsg={errors.vehicleModelYear?.message!}
              variant='whitespace-nowrap sm:col-span-2 flex-shrink-0'
              placeholder='2016'
              label='Year'
              maxLength={4}
              name='vehicleYear'
              type='text'
            />
            <InputField
              {...register('vehicleMake')}
              variant='sm:col-span-3'
              placeholder='Ford'
              name='vehicleMake'
              label='Make'
              type='text'
            />
            <InputField
              {...register('vehicleModel')}
              variant='sm:col-span-5'
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
              variant='sm:col-span-5'
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
              variant='sm:col-span-5'
              label='Mileage'
              type='text'
              name='vehicleMileage'
            />
          </fieldset>
        </div>
      </div>
    </div>
  )
}
