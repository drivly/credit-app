'use client'

import { creditApps } from '@/lib/creditApp'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import CreditApp from './CreditApp'
import CheckBox from './form-fields/Checkbox'
import Agreement from './sections/Agreement'
import Vehicle from './sections/Vehicle'
import { formatRequest } from '@/utils/formatRequest'
import { toast } from 'sonner'
import { IVDP } from '@/utils/getVehicleDetails'

const defaultValues = {
  countryCode: 'US',
  incomeIntervalCode: 'MO',
  employedPrimary: 'YES',
  coEmployedJoint: 'YES',
  joint: false,
}

type Props = {
  vdp?: IVDP | null
}

export default function Form({ vdp }: Props) {
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      ...defaultValues,
      vehicleModelYear: vdp?.year,
      vehicleMake: vdp?.make,
      vehicleModel: vdp?.model,
      vehiclePrice: vdp?.price,
      vehicleMileage: vdp?.miles,
      vehicleVin: vdp?.vin,
    },
  })
  const watchJoint = methods.watch('joint')

  async function handleCreditApp(data: any) {

    const requestObj = await formatRequest(data)
    const res = await fetch('/api/credit-app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestObj),
    }).then((res) => res.json())
    console.log('api call res', res.data)

    if (res.status === 200) {
      toast.success('Success! Your application ID is ' + res.data.id)
    }
  }

  async function onSubmit(data: any) {
    console.log('data', data)
    try {
      await handleCreditApp(data)
      methods.reset()
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='relative w-full'>
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
                    {...methods.register('joint')}
                    name='joint'
                    label='Joint Credit Applicant'
                  />
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
        <Vehicle errors={methods.formState.errors} watchJoint={watchJoint} />
        <Agreement />
        <div className='mt-8 grid grid-cols-1 pt-10 md:ml-3 md:grid-cols-3'>
          <button
            className='flex h-[50px] w-full items-center justify-center rounded-[5px] bg-DRIVLY text-white md:col-span-2 md:col-start-2'
            type='submit'>
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
