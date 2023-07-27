'use client'

import { creditApps } from '@/lib/creditApp'
import { formatRequest } from '@/utils/formatRequest'
import { IVDP } from '@/app/utils/getVehicleDetails'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import CreditApp from './CreditApp'
import CheckBox from './form-fields/Checkbox'
import Agreement from './sections/Agreement'
import Vehicle from './sections/Vehicle'
import { handleVin } from '@/app/utils/handleVin'
import useCustomer from '@/app/store'

const defaultValues = {
  employedPrimary: 'YES',
  coEmployedJoint: 'YES',
  employmentStatusCode: 'Full Time',
  coEmploymentStatusCode: 'Full Time',
  joint: false,
  agree: false,
}

type Props = {
  vdp?: IVDP | null
}

export default function Form({ vdp }: Props) {
  const [customer, setCustomer] = useCustomer((s) => [s.customer, s.setCustomer])
  const [isError, setError] = React.useState(false)
  const [isJoint, setJoint] = React.useState(false)
  let isLoading = useRef(false)
  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())
  const router = useRouter()

  const methods = useForm({
    mode: 'all',
    defaultValues: {
      ...defaultValues,
      ...params,
      vehicleYear: vdp?.year,
      vehicleMake: vdp?.make,
      vehicleModel: vdp?.model,
      vehiclePrice: vdp?.price,
      vehicleMileage: vdp?.miles,
      vehicleVin: vdp?.vin,
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = methods

  const watchJoint = watch('joint')

  useEffect(() => {
    if (customer?.vin?.length === 17) {
      const fetchVehicle = async () => {
        isLoading.current = true
        const data = await handleVin(customer?.vin)
        if (data) {
          setValue('vehicleYear', data?.year)
          setValue('vehicleMake', data?.make)
          setValue('vehicleModel', data?.model)
          setValue('vehiclePrice', data?.price)
          setValue('vehicleMileage', data?.miles)
          setValue('vehicleVin', data?.vin)
          toast.success('Vehicle information updated successfully!')
        }
      }
      fetchVehicle()
    } else {
      reset({
        vehicleYear: '',
        vehicleMake: '',
        vehicleModel: '',
        vehiclePrice: '',
        vehicleMileage: '',
      })
    }
    isLoading.current = false
  }, [reset, setValue, customer?.vin])

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    if (!data?.agree) {
      toast.error('Please agree to the terms and conditions')
      setError(true)
      return
    }
    const toastId = toast.loading('Submitting your application...')
    const formData = formatRequest(data)
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
      <form onSubmit={handleSubmit(onSubmit)} className='relative w-full'>
        <fieldset
          disabled={isSubmitting || isLoading.current}
          className='group disabled:opacity-50 peer-disabled:cursor-not-allowed'>
          {creditApps.map((app, index) => {
            if (app.main === 'Primary') {
              return (
                <React.Fragment key={index}>
                  <CreditApp key={index} type={app.main} app={app} vin={vdp?.vin} />

                  <div
                    className={`${
                      watchJoint ? 'border-t pt-20' : 'border-y py-20'
                    } mb-10 mt-20 flex flex-col justify-between  border-DRIVLY/10 transition-all duration-200 ease-out`}>
                    <CheckBox
                      onClick={() => setJoint((prev) => !prev)}
                      {...register('joint')}
                      name='joint'
                      label='Joint Credit Applicant'
                    />
                    {watchJoint && (
                      <h1 className='mt-10 text-2xl font-bold tracking-[0.02em]'>
                        Joint Applicant
                      </h1>
                    )}
                  </div>
                </React.Fragment>
              )
            } else if (app.main === 'Joint' && watchJoint) {
              return (
                <div className='space-y-10' key={index}>
                  <CreditApp key={index} type={app.main} app={app} />
                </div>
              )
            }
          })}
          <Vehicle errors={errors} watchJoint={watchJoint} />
          <Agreement isError={isError} onClick={() => setError(false)} />
          <div className='mt-8 grid grid-cols-1 pt-10 md:ml-3 md:grid-cols-3'>
            <button
              disabled={isSubmitting}
              className='flex h-[50px] w-full items-center justify-center rounded-[5px] bg-DRIVLY text-white md:col-span-2 md:col-start-2'
              type='submit'>
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  )
}
