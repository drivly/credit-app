import useCustomer from '@/app/store'
import { getBuild } from '@/app/utils/getBuild'
import { getPayoffQuote } from '@/app/utils/getPayoffQuote'
import InputField from '@/components/form-fields/InputField'
import RadioButton from '@/components/form-fields/RadioButton'
import SelectField from '@/components/form-fields/SelectField'
import { formatMoney, vinChecksum } from '@/utils'
import { cn } from '@drivly/ui'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

const TradeInfo = (props: any) => {
  const { errors } = props
  const [lenders, setLenders] = React.useState<Record<string, any>[]>([])
  const [customer, setCustomer] = useCustomer((s) => [s.customer, s.setCustomer])

  console.log('customer', customer)

  const methods = useFormContext()
  const { register, watch, control, setValue, reset, setFocus } = methods
  const watchTrade = watch('tradeInVehicleIndicator')
  const isTradeIn = watchTrade === 'Y'

  const watchTradeInVin = watch('tradeInVin')

  const watchLien = watch('tradeInLienIndicator')
  const islien = watchLien === 'Y'

  const watchLienName = watch('tradeInLienHoldername')
  const isLienOther = watchLienName === 'other' || watchLienName === 'idk'

  console.log('watchLienName', watchLienName)
  console.log('isLienOther', isLienOther)
  const ssn = watch('ssn')

  useEffect(() => {
    const getPayoffLenders = async () => {
      const { data } = await fetch('https://credit.api.driv.ly/fields').then((res) => res.json())
      const lenders = await data?.ancillaryServices[0].financeSourceList
      const sortedLenders = sortByFsName(lenders)
      setLenders(sortedLenders)
    }
    getPayoffLenders()
  }, [])

  useEffect(() => {
    if (watchTradeInVin) {
      const getTradeInfo = async () => {
        try {
          const data = await getBuild(watchTradeInVin)

          if (data) {
            setValue('tradeInYear', data?.year)
            setValue('tradeInMake', data?.make)
            setValue('tradeInModel', data?.model)
            setCustomer({
              tradeInfo: {
                vin: watchTradeInVin,
                year: data?.year,
                make: data?.make,
                model: data?.model,
              },
            })
            toast.success('Vehicle Found')
          }
        } catch (error: any) {
          toast.error(error.message)
        }
      }
      getTradeInfo()
    } else if (!watchTradeInVin) {
      reset({
        tradeInYear: '',
        tradeInMake: '',
        tradeInModel: '',
      })
      setCustomer({
        tradeInfo: {
          vin: '',
          year: '',
          make: '',
          model: '',
        },
      })
    }
  }, [reset, setCustomer, setValue, watchTradeInVin])

  useEffect(() => {
    if (watchLienName && !isLienOther) {
      const isSSN = lenders
        .find((item) => item.fsId === watchLienName)
        ?.serviceOptions.find((item: any) => item.option === 'SSNTXID')

      const payload = isSSN
        ? { vin: watchTradeInVin, source: watchLienName, ssn }
        : { vin: watchTradeInVin, source: watchLienName }
      console.log('ssn', ssn)
      if (isSSN && !ssn) {
        toast.error('SSN required for trade-in payoff quote')
        setFocus('ssn')
      }

      const getPayoff = async () => {
        const toastId = toast.loading('Getting payoff quote')
        try {
          const response = await getPayoffQuote(payload)

          if (response) {
            const lenderString = lenders.find((item) => item.fsId === watchLienName)?.fsName
            toast.success('Payoff Quote Found', { id: toastId })
            setValue('tradeInAllowance', response?.allowance)
            setValue('tradeInGrossPayOffAmount', response?.quote?.grossPayOffAmount)
            setCustomer({
              ...customer,
              tradeInfo: {
                ...customer?.tradeInfo,
                fsId: watchLienName,
                lienholder: lenderString,
                tradeInAllowance: response?.allowance,
                grossPayOffAmount: response?.quote?.grossPayOffAmount,
                id: response?.id,
              },
            })
            console.log('req', response)
          } else {
            toast.error('Failed to get payoff quote', { id: toastId })
          }
        } catch (error: any) {
          console.error('error', error)
          toast.error(error.message || 'Failed to get payoff quote', { id: toastId })
        }
      }
      if (isSSN && ssn.length === 11) {
        getPayoff()
      } else if (!isSSN) {
        getPayoff()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchLienName, ssn])

  const lenderCats = lenders
    .sort((a, b) => a.fsName - b.fsName)
    .map((item) => ({
      value: item.fsId,
      optionName: item.fsName,
    }))

  lenderCats.unshift(
    { value: '', optionName: 'Select' },
    { value: 'idk', optionName: "I don't know" },
    { value: 'other', optionName: 'Other' }
  )

  return (
    <div
      className={cn(
        'my-10 grid grid-cols-1 gap-x-8 gap-y-8 border-b border-DRIVLY/10 py-10 pb-20 md:grid-cols-3'
      )}>
      <h2 className='font-mont px-5 text-lg font-semibold leading-7 text-gray-900 sm:px-0 sm:text-base'>
        Trade Information
      </h2>

      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-5 py-6 sm:p-8'>
          <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10'>
            <div className='col-span-full grid gap-y-6'>
              <p className='col-span-full mt-1 text-base font-medium leading-6 tracking-[0.02em] text-gray-900 sm:text-sm sm:leading-[22px]'>
                Do you have a trade-in vehicle to be considered?
              </p>
              <div className='col-span-full flex w-full items-center justify-start gap-x-8'>
                <RadioButton
                  {...register('tradeInVehicleIndicator')}
                  label='Yes, I have a trade'
                  id='yesTradeIn'
                  value='Y'
                  variant='font-normal'
                />
                <RadioButton
                  {...register('tradeInVehicleIndicator')}
                  label='No, I do not have a trade'
                  id='noTradeIn'
                  value='N'
                  variant='font-normal'
                />
              </div>
            </div>
            {isTradeIn && (
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
                <div className='col-span-full grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10'>
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
                  <div className='col-span-full grid gap-y-6'>
                    <p className='col-span-full mt-1 text-base leading-6 tracking-[0.02em] text-gray-900 sm:text-sm sm:leading-[22px] font-medium'>
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
                </div>
              </>
            )}
            {islien && (
              <div className='col-span-full grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10'>
                <SelectField
                  {...register('tradeInLienHoldername', {
                    required: 'Required',
                  })}
                  variant='w-full sm:col-span-5'
                  label='Lender Name*'
                  placeholder='Select'
                  cats={lenderCats}
                  errormsg={errors.tradeInLienHoldername?.message!}
                />

                {isLienOther && (
                  <InputField
                    {...register('tradeInOtherLienHoldername', {
                      required: 'Required',
                    })}
                    errormsg={errors.tradeInOtherLienHoldername?.message!}
                    placeholder='Enter Lender Name'
                    variant='sm:col-span-5'
                    label='Other Lender*'
                  />
                )}
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
                  variant='sm:col-span-5'
                  label='Payoff Owed Amount*'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradeInfo

function sortByFsName(arr: Record<string, any>[]) {
  return arr.slice().sort((a, b) => {
    const nameA = a.fsName.toUpperCase().trim()
    const nameB = b.fsName.toUpperCase().trim()

    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
}
