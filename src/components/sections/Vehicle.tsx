import useVehicleQuery from '@/hooks/useVehicleQuery'
import useCustomer from '@/store'
import { cn, formatMiles, formatMoney, vinChecksum } from '@/utils'
import { useParams } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import InputField from '../form-fields/InputField'

export default function Vehicle(props: any) {
  const [customer, setCustomer] = useCustomer((s) => [s.customer, s.setCustomer])
  const { hasMounted, isFetching } = useVehicleQuery()
  const { register } = useFormContext()
  const params = useParams()

  const { errors, watchJoint } = props

  if (!hasMounted.current) return null

  return (
    <div
      className={cn(
        'my-10 grid grid-cols-1 gap-x-8 gap-y-8 border-b border-DRIVLY/10 py-10 pb-20 md:grid-cols-3',
        {
          'mb-10 mt-20 border-y py-20': watchJoint,
        }
      )}>
      <h2 className='font-mont px-5 text-lg font-semibold leading-7 text-gray-900 sm:px-0 sm:text-base'>
        Vehicle of Interest
      </h2>

      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-5 py-6 sm:p-8'>
          <fieldset
            disabled={isFetching}
            className='group grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 disabled:opacity-80 peer-disabled:cursor-not-allowed sm:grid-cols-10'>
            <InputField
              {...register('vehicleVin', {
                validate: (value: string) => vinChecksum(value) || 'Invalid VIN',
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase() as string
                  setCustomer({ vin: e.target.value })
                },
              })}
              disabled={params.vin ? true : false}
              errormsg={errors.vehicleVin?.message!}
              placeholder='WBAGV2C04LCD51052'
              variant='sm:col-span-5'
              label='VIN*'
            />
            <InputField
              {...register('vehicleCashDown', {
                onChange: (e: any) => {
                  e.target.value = formatMoney(e.target.value)
                },
              })}
              errormsg={errors.cashDown?.message!}
              placeholder='Enter $0, if no Cash Down'
              variant='sm:col-span-5'
              label='Cash Down*'
            />
            <InputField
              {...register('vehicleYear', {
                onChange: (event) =>
                  (event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4)),
                minLength: { value: 4, message: 'Invalid Year' },
                pattern: { value: /\d/g, message: 'Invalid Year' },
              })}
              disabled={customer?.vehicleYear ? true : false}
              errormsg={errors.vehicleModelYear?.message!}
              variant='whitespace-nowrap sm:col-span-2 flex-shrink-0'
              placeholder='2016'
              label='Year*'
              maxLength={4}
            />
            <InputField
              {...register('vehicleMake')}
              variant='sm:col-span-3'
              placeholder='Ford'
              label='Make*'
              disabled={customer?.vehicleMake ? true : false}
            />
            <InputField
              {...register('vehicleModel')}
              variant='sm:col-span-5'
              placeholder='F-150 Raptor'
              label='Model*'
              disabled={customer?.vehicleModel ? true : false}
            />

            <InputField
              {...register('vehiclePrice', {
                required: 'Required',
                maxLength: { value: 8, message: 'Invalid Price' },
                onChange(event) {
                  event.target.value = formatMoney(event.target.value)
                },
              })}
              disabled={customer?.vehiclePrice ? true : false}
              errormsg={errors.vehiclePrice?.message!}
              placeholder='$56,370'
              variant='sm:col-span-5'
              label='Price*'
            />

            <InputField
              {...register('vehicleMileage', {
                required: 'Required',
                onChange(event) {
                  event.target.value = formatMiles(event.target.value)
                },
              })}
              disabled={customer?.vehicleMileage ? true : false}
              errormsg={errors.vehicleMileage?.message!}
              placeholder='28,052'
              variant='sm:col-span-5'
              label='Mileage*'
              required={customer?.vehicleMileage ? true : false}
            />
          </fieldset>
        </div>
      </div>
    </div>
  )
}
