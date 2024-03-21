import InputField from '@/components/form-fields/InputField'
import RadioButton from '@/components/form-fields/RadioButton'
import SelectField from '@/components/form-fields/SelectField'
import usePayoffLenders from '@/hooks/usePayoffLenders'
import usePayoffQuery from '@/hooks/usePayoffQuery'
import useTradeQuery from '@/hooks/useTradeQuery'
import useCustomer from '@/store'
import { formatMoney, vinChecksum } from '@/utils'
import { cn } from '@drivly/ui'
import { useState } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'

type TradeInfoProps = {
  errors: FieldErrors
  isSubmitting: boolean
}

const TradeInfo = ({ errors, isSubmitting }: TradeInfoProps) => {
  const [payload, setPayload] = useState<any>({})
  const { lenders, lenderCats, isTrade, setTrade } = usePayoffLenders()
  const { watchTradeInVin } = useTradeQuery(setPayload)
  const { tradeRef, isLienOther, isLoading } = usePayoffQuery({
    watchTradeInVin,
    lenders,
    payload,
    setPayload,
    isSubmitting,
  })
  const customer = useCustomer((s) => s.customer)
  const methods = useFormContext()
  const { register, watch, setValue, setFocus } = methods
  const watchLien = watch('tradeInLienIndicator')
  const islien = watchLien === 'Y'

  return (
    <div
      ref={tradeRef}
      className={cn(
        'my-10 grid grid-cols-1 gap-x-8 gap-y-8 border-b border-DRIVLY/10 py-10 pb-20 md:grid-cols-3'
      )}>
      <h2 className='font-mont px-5 text-lg font-semibold leading-7 text-gray-900 sm:px-0 sm:text-base'>
        Trade Information
      </h2>

      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-5 py-6 sm:p-8'>
          <fieldset
            disabled={isLoading}
            className='group grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 disabled:opacity-80 peer-disabled:cursor-not-allowed sm:grid-cols-10'>
            <div className='col-span-full grid gap-y-6'>
              <p className='col-span-full mt-1 text-base font-medium leading-6 tracking-[0.02em] text-gray-900 sm:text-sm sm:leading-[22px]'>
                Do you have a trade-in vehicle to be considered?
              </p>
              <div className='flex w-full flex-col items-start justify-start gap-x-8 gap-y-6 sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row'>
                <RadioButton
                  onClick={() => setTrade(true)}
                  {...register('tradeInVehicleIndicator')}
                  label='Yes, I have a trade'
                  id='yesTradeIn'
                  value='Y'
                  variant='font-normal'
                />
                <RadioButton
                  onClick={() => setTrade(false)}
                  {...register('tradeInVehicleIndicator')}
                  label='No, I do not have a trade'
                  id='noTradeIn'
                  value=''
                  variant='font-normal'
                />
              </div>
            </div>
            {isTrade && (
              <>
                <InputField
                  {...register('tradeInVin', {
                    validate: (value: string) => vinChecksum(value) || 'Invalid VIN',
                    onChange: (e) => {
                      e.target.value = e.target.value.toUpperCase() as string
                    },
                  })}
                  errormsg={errors.tradeInVin?.message!}
                  placeholder='WBAGV2C04LCD51052'
                  variant='sm:col-span-5'
                  label='Trade-in VIN*'
                />

                <InputField
                  {...register('tradeInAllowance', {
                    required: 'Required',
                    maxLength: { value: 8, message: 'Invalid Price' },
                    onChange(event) {
                      event.target.value = formatMoney(event.target.value)
                    },
                  })}
                  disabled={customer?.tradeInfo?.tradeInAllowance ? true : false}
                  errormsg={errors.tradeInAllowance?.message!}
                  placeholder='$30,000 (Estimate if unknown)'
                  variant='sm:col-span-5'
                  label='Trade Value*'
                />
                <InputField
                  {...register('tradeInYear', {
                    onChange: (event) =>
                      (event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4)),
                    minLength: { value: 4, message: 'Invalid Year' },
                    pattern: { value: /\d/g, message: 'Invalid Year' },
                  })}
                  disabled={customer?.tradeInfo?.year ? true : false}
                  errormsg={errors.tradeInYear?.message!}
                  variant='whitespace-nowrap sm:col-span-2 flex-shrink-0'
                  placeholder='2016'
                  label='Year*'
                  maxLength={4}
                />
                <InputField
                  {...register('tradeInMake')}
                  variant='sm:col-span-3'
                  placeholder='Ford'
                  label='Make*'
                  disabled={customer?.tradeInfo?.make ? true : false}
                />
                <InputField
                  {...register('tradeInModel')}
                  variant='sm:col-span-5'
                  placeholder='F-150 Raptor'
                  label='Model*'
                  disabled={customer?.tradeInfo?.model ? true : false}
                />
                <div className='col-span-6 grid gap-y-6 sm:col-span-full'>
                  <p className='col-span-full mt-1 text-base font-medium leading-6 tracking-[0.02em] text-gray-900 sm:text-sm sm:leading-[22px]'>
                    Is there an existing loan on your trade-in vehicle?
                  </p>
                  <div className='col-span-full flex w-full items-center justify-start gap-x-8'>
                    <RadioButton
                      {...register('tradeInLienIndicator', { required: 'Required' })}
                      errormsg={errors?.lienIndicator?.message!}
                      label='Yes'
                      id='yesLien'
                      value='Y'
                      variant='font-normal'
                    />
                    <RadioButton
                      {...register('tradeInLienIndicator', { required: 'Required' })}
                      errormsg={errors?.lienIndicator?.message!}
                      label='No'
                      id='noLien'
                      value='N'
                      variant='font-normal'
                    />
                  </div>
                </div>
              </>
            )}
            {islien && (
              <div className='col-span-6 grid grid-flow-row grid-cols-6 gap-x-6 gap-y-8 sm:col-span-full'>
                <SelectField
                  {...register('tradeInLienHoldername', {
                    required: 'Required',
                  })}
                  variant='sm:col-span-3'
                  label='Lender Name*'
                  placeholder='Select'
                  cats={lenderCats}
                  errormsg={errors.tradeInLienHoldername?.message!}
                />

                <InputField
                  {...register('tradeInGrossPayOffAmount', {
                    required: 'Required',
                    maxLength: { value: 8, message: 'Invalid Price' },
                    onChange(event) {
                      event.target.value = formatMoney(event.target.value)
                    },
                  })}
                  disabled={customer?.tradeInfo?.grossPayOffAmount ? true : false}
                  errormsg={errors.tradeInGrossPayOffAmount?.message!}
                  placeholder='$56,370 (Estimate if unknown)'
                  variant='sm:col-span-3'
                  label='Payoff Owed Amount*'
                />
                {isLienOther && (
                  <InputField
                    {...register('tradeInOtherLienHoldername', {
                      required: 'Required',
                    })}
                    errormsg={errors.tradeInOtherLienHoldername?.message!}
                    placeholder='Enter Lender Name'
                    variant='sm:col-span-full'
                    label='Other Lender*'
                  />
                )}
              </div>
            )}
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export default TradeInfo
