'use client'

import { creditApps } from '@/lib/creditApp'
import { formatRequest } from '@/utils/formatRequest'
import { IVDP } from '@/utils/getVehicleDetails'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import CreditApp from './CreditApp'
import CheckBox from './form-fields/Checkbox'
import Agreement from './sections/Agreement'
import Vehicle from './sections/Vehicle'

const defaultValues = {
  employedPrimary: 'YES',
  coEmployedJoint: 'YES',
  joint: false,
  agree: false,
}

type Props = {
  vdp?: IVDP | null
}

export default function Form({ vdp }: Props) {
  const [isError, setError] = React.useState(false)
  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())

  const methods = useForm({
    mode: 'all',
    defaultValues: {
      ...defaultValues,
      ...params,
      year: vdp?.year,
      make: vdp?.make,
      model: vdp?.model,
      price: vdp?.price,
      miles: vdp?.miles,
      vin: vdp?.vin,
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
      toast.success('Success! Your application ID is ' + request?.data?.dealMeta?.id, {
        id: toastId,
      })
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
        {creditApps.map((app, index) => {
          if (app.main === 'Primary') {
            return (
              <React.Fragment key={index}>
                <CreditApp key={index} type={app.main} app={app} vin={vdp?.vin} />

                <div
                  className={`${
                    watchJoint ? 'border-t pt-20' : 'border-y py-20'
                  } mb-10 mt-20 flex flex-col justify-between  border-DRIVLY/10 transition-all duration-200 ease-out`}>
                  <CheckBox {...register('joint')} name='joint' label='Joint Credit Applicant' />
                  {watchJoint && (
                    <h1 className='mt-10 text-2xl font-bold tracking-[0.02em]'>Joint Applicant</h1>
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
      </form>
    </FormProvider>
  )
}
