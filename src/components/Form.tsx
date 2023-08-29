'use client'

import useCustomer from '@/app/store'
import { VehicleDetailProps } from '@/app/utils/getVehicleDetails'
import useHasChanged from '@/hooks/useHasChanged'
import { creditApps } from '@/lib/creditApp'
import { formatRequest } from '@/utils/formatRequest'
import { cn } from '@drivly/ui'
import { H } from '@highlight-run/next/client'
import moment from 'moment'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import CreditApp from './CreditApp'
import CheckBox from './form-fields/Checkbox'
import Agreement from './sections/Agreement'
import TradeInfo from './sections/TradeInfo'
import Vehicle from './sections/Vehicle'

const defaultValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  phone: '',
  email: '',
  phoneType: 'MOBILE',
  dateOfBirth: moment().subtract(18, 'years').format('DD/MM/YYYY'),
  ssn: '',
  residenceTypeCode: '',
  employedPrimary: 'YES',
  coEmployedJoint: 'YES',
  employmentStatusCode: 'Full Time',
  co_employmentStatusCode: 'Full Time',
  joint: false,
  agree: false,
}

type Props = {
  vdp?: VehicleDetailProps | null
}

export default function Form({ vdp }: Props) {
  const [customer, setCustomer] = useCustomer((s) => [s.customer, s.setCustomer])
  const [isError, setError] = useState(false)
  const { handleOnChange } = useHasChanged()
  const searchParams = useSearchParams()
  const searchParamValues = Object.fromEntries(searchParams.entries())
  const router = useRouter()
  const jointRef = useRef<HTMLDivElement>(null)

  const methods = useForm({
    mode: 'all',
    defaultValues: {
      ...defaultValues,
      ...searchParamValues,
      vehicleYear: vdp?.year,
      vehicleMake: vdp?.make,
      vehicleModel: vdp?.model,
      vehiclePrice: vdp?.price,
      vehicleMileage: vdp?.miles,
      vehicleVin: vdp?.vin || searchParamValues?.vehicleVin,
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = methods

  const watchJoint = watch('joint')

  useEffect(() => {
    if (watchJoint) {
      setTimeout(
        () => jointRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        150
      )
    }
  }, [watchJoint])

  useEffect(() => {
    if (customer?.email && customer?.name) {
      H.identify(customer.email, {
        name: customer.name,
      })
    }
  }, [customer?.email, customer?.name])

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    if (!data?.agree) {
      toast.error('Please agree to the terms and conditions')
      setError(true)
      return
    }

    let trade: Record<string, any> = {}
    const { sameAddress, ...rest } = data
    const toastId = toast.loading('Submitting your application...')
    let formData = formatRequest(rest)
    console.log('formData', formData)

    if (formData?.tradeIn !== null) {
      const { tradeIn, ...rest } = formData

      trade = customer?.tradeInfo
      formData = {
        ...rest,
        tradeIn: {
          tradeInAllowance: trade?.tradeInAllowance,
          id: trade?.id,
          lienholder: trade?.lienholder,
        },
      }
    }

    try {
      const request = await fetch('/api/credit-app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json())
      console.log('request', request)

      if (request?.status !== 200)
        throw new Error(`${request?.error}` || 'Error submitting credit app')

      setCustomer({
        name: data?.firstName,
        email: data?.email,
        applicationId: request?.data?.dealMeta?.id,
      })
      toast.success('Success! Your application ID is ' + request?.data?.dealMeta?.id, {
        id: toastId,
      })
      router.push(`/success?id=${request?.data?.dealMeta?.id}`)
    } catch (error: any) {
      console.log('Error: =>', { ...error })
      toast.error(`Error submitting credit app ${error}`, {
        id: toastId,
        duration: 5000,
      })
    } finally {
      reset()
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='relative w-full' onChange={handleOnChange}>
        <fieldset
          disabled={isSubmitting}
          className='group disabled:opacity-50 peer-disabled:cursor-not-allowed'>
          {/* Primary Applicant */}
          {creditApps.map((app, index) => {
            if (app.main === 'Primary') {
              return (
                <React.Fragment key={index}>
                  <CreditApp key={index} type={app.main} app={app} vin={vdp?.vin} />
                  <div
                    ref={jointRef}
                    className={`${
                      watchJoint ? 'border-t pt-20' : 'border-y py-20'
                    } mb-10 mt-20 flex flex-col justify-between border-DRIVLY/10  px-5 transition-all duration-200 ease-out`}>
                    <CheckBox
                      {...register('joint')}
                      name='joint'
                      label='Joint Application'
                      variant={cn('text-[28px] font-bold tracking-[0.02em] sm:text-2xl', {
                        'text-DRIVLY/10': watchJoint === true,
                      })}
                    />
                  </div>
                </React.Fragment>
              )
            } else if (app.main === 'Joint') {
              return (
                <div className='space-y-10' key={index}>
                  {watchJoint && <CreditApp key={index} type={app.main} app={app} />}
                </div>
              )
            }
          })}
          <Vehicle errors={errors} watchJoint={watchJoint} />
          <TradeInfo errors={errors} />
          <Agreement isError={isError} onClick={() => setError(false)} />
          <div className='mt-8 grid grid-cols-1 px-5 pt-10 md:ml-3 md:grid-cols-3'>
            <button
              disabled={isSubmitting}
              className='flex w-full items-center justify-center rounded-[5px] bg-DRIVLY py-4 text-lg font-medium tracking-wide text-white sm:text-base md:col-span-2 md:col-start-2 md:h-[52px]'
              type='submit'>
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  )
}
