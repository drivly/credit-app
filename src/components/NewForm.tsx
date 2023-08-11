'use client'

import { states, timeMonths, timeYears } from '@/lib/categories'
import { emailReg, zipReg } from '@/lib/patterns'
import { formatMoney, formatSSN, isAtLeast18 } from '@/utils'
import { formatphone } from '@/utils/formatphone'
import moment from 'moment'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import DateField from './form-fields/DateField'
import InputField from './form-fields/InputField'
import Agreement from './sections/Agreement'
import PrimaryAddr from './sections/Residence/PrimaryAddr'
import TradeInfo from './sections/TradeInfo'
import Vehicle from './sections/Vehicle'

const defaultValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  phone: '',
  email: '',
  phoneType: 'MOBILE',
  dateOfBirth: moment().subtract(18, 'years').format('YYYY-MM-DD'),
  ssn: '',
  residenceTypeCode: '',
  employedPrimary: 'YES',
  coEmployedJoint: 'YES',
  employmentStatusCode: 'Full Time',
  coEmploymentStatusCode: 'Full Time',
  joint: false,
  agree: false,
}
const NewForm = ({ vdp }: any) => {
  const [isError, setError] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const searchParams = useSearchParams()
  const searchParamValues = Object.fromEntries(searchParams.entries())

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
      vehicleVin: vdp?.vin,
    },
  })

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = methods

  const watchJoint = watch('joint')
  const onSubmit = async (data: any) => {
    console.log('data', data)
  }

  const vin = watch('vehicleVin')
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='relative w-full'>
        <fieldset
          disabled={isSubmitting || isLoading}
          className='group disabled:opacity-50 peer-disabled:cursor-not-allowed'>
          {/* Primary Applicant */}
          <div className='space-y-10'>
            <header className='px-5 sm:px-0 md:mt-0'>
              <h1 className='mt-10 text-[28px] font-bold tracking-[0.02em] sm:text-2xl'>
                Primary Credit Applicant
              </h1>
              {vin && (
                <p className='extralight pt-2 text-xl tracking-wide text-gray-600 sm:text-lg'>
                  {vin}
                </p>
              )}
            </header>
            {/* Personal Info */}
            <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
              <h2 className='font-mont px-5 text-lg font-semibold leading-7 text-gray-900 sm:px-0 sm:text-base'>
                Personal Information
              </h2>
              <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
                <div className='px-5 py-6 sm:p-8'>
                  <div className='grid max-w-3xl grid-cols-1 gap-y-8 sm:grid-cols-6 sm:gap-x-6'>
                    <InputField
                      {...register('firstName', { required: 'Required' })}
                      errormsg={errors?.firstName?.message!}
                      variant='sm:col-span-2'
                      placeholder='John'
                      label='First Name *'
                    />
                    <InputField
                      {...register('middleName', {
                        maxLength: { value: 3, message: 'Must be less than 3' },
                        onChange: (e) => {
                          e.target.value = e.target.value.toUpperCase()
                        },
                      })}
                      errormsg={errors?.middleName?.message!}
                      variant='sm:col-span-1'
                      placeholder='W'
                      label='MI'
                    />
                    <InputField
                      {...register('lastName', { required: 'Required' })}
                      errormsg={errors?.lastName?.message!}
                      variant='sm:col-span-3'
                      placeholder='Wick'
                      label='Last Name *'
                    />

                    <InputField
                      {...register('phone', {
                        required: 'Required',
                        maxLength: { value: 14, message: 'Must be less than 14' },
                        onChange: (e) => {
                          e.target.value = formatphone(e.target.value)
                        },
                      })}
                      maxLength={14}
                      errormsg={errors?.phone?.message!}
                      variant='sm:col-span-3'
                      placeholder='561-975-6432'
                      label='Phone *'
                      comp={
                        <div className='absolute inset-y-0 left-0 flex items-center'>
                          <label htmlFor='phoneType' className='sr-only'>
                            Phone Type
                          </label>
                          <select
                            {...register('phoneType', { required: 'Required' })}
                            defaultValue=''
                            autoComplete='phoneType'
                            className='h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-0 sm:text-sm'>
                            <option value='MOBILE'>Mobile</option>
                            <option value='HOME'>Home</option>
                            <option value='WORK'>Work</option>
                          </select>
                        </div>
                      }
                    />
                    <InputField
                      {...register('email', {
                        required: 'Required',
                        pattern: { value: emailReg, message: 'Invalid Email' },
                      })}
                      errormsg={errors?.email?.message!}
                      placeholder='johnwsmith@gmail.com'
                      variant='sm:col-span-3'
                      label='Email *'
                    />
                    <DateField
                      rules={{
                        required: 'Required',
                        validate: (value: any) => isAtLeast18(value) || '18yo or older',
                      }}
                      defaultValue={moment().subtract(18, 'years').toDate()}
                      errormsg={errors?.dateOfBirth?.message!}
                      variant='col-span-1 sm:col-span-3'
                      label='Date of Birth *'
                      control={control}
                      name='dateOfBirth'
                      placeholder='Must be 18yo or older'
                      minDate={moment().subtract(200, 'years').toDate()}
                      maxDate={moment().subtract(18, 'years').toDate()}
                    />
                    <InputField
                      {...register('ssn', {
                        required: 'Required',
                        validate: (value) => {
                          const length = value.replace(/\D/g, '').length
                          if (length < 9) return 'Must be 9 digits'
                          return true
                        },
                        onChange(event) {
                          event.target.value = formatSSN(event.target.value)
                        },
                      })}
                      placeholder='123-45-6789'
                      errormsg={errors?.ssn?.message!}
                      variant='sm:col-span-3'
                      label='SSN *'
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Risidence Info */}
            <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
              <PrimaryAddr section={residence} />
            </div>
          </div>

          {/* Joint Applicant */}
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

export default NewForm
const residence = {
  title: 'Residence',
  description: "Information about the primary applicant's residence",
  fields: [
    // {
    //   component: 'InputField',
    //   name: 'addressLine1',
    //   label: 'Street Address*',
    //   placeholder: '123 Main St',
    //   maxLength: { value: 200, message: 'Max 200 chars' },
    //   type: 'text',
    //   rules: {
    //     value: true,
    //     message: 'Required',
    //   },
    // },
    // {
    //   component: 'InputField',
    //   name: 'addressLine2',
    //  variant: '-pt-4',
    //   placeholder: 'APT, Suite, PO Box',
    //   maxLength: { value: 200, message: 'Max 200 chars' },
    //   type: 'text',
    //   rules: {
    //     value: true,
    //     message: 'Required',
    //   },
    // },
    {
      component: 'InputField',
      name: 'city',
      label: 'City*',
      placeholder: 'New York',
      variant: 'sm:col-span-2',
      maxLength: { value: 30, message: 'Max 30 chars' },
      type: 'text',
      rules: {
        value: true,
        message: 'Required',
      },
    },
    {
      component: 'SelectField',
      name: 'state',
      label: 'State*',
      variant: 'sm:col-span-2',
      rules: {
        value: true,
        message: 'Required',
      },
      cats: states,
      control: true,
    },
    {
      component: 'InputField',
      name: 'zipCode',
      label: 'Zipcode*',
      placeholder: '12345',
      variant: 'sm:col-span-2',
      type: 'text',
      rules: {
        value: true,
        message: 'Required',
      },
      pattern: { value: zipReg, message: 'Invalid Zip' },
    },
    {
      component: 'SelectField',
      name: 'addressYears',
      label: 'Time at Address*',
      variant: 'whitespace-nowrap sm:col-span-2',
      rules: {
        value: true,
        message: 'Required',
      },
      cats: timeYears,
      control: true,
    },
    {
      component: 'SelectField',
      name: 'addressMonths',
      control: true,
      variant: 'sm:col-span-2 whitespace-nowrap',
      cats: timeMonths,
    },
    {
      component: 'InputField',
      name: 'rentMortgagePaymentAmount',
      label: 'Monthly Payment*',
      placeholder: 'Enter $0, if no Payment/Rent',
      variant: 'sm:col-span-2 whitespace-nowrap',
      type: 'text',
      rules: {
        value: true,
        message: 'Required',
      },
      onChange: (e: any) => {
        e.target.value = formatMoney(e.target.value)
      },
    },
    // {
    //   component: 'InputField',
    //   name: 'prevAddressLine1',
    //   label: 'Street Address*',
    //   placeholder: '123 Main St',
    //   maxLength: { value: 200, message: 'Max 200 chars' },
    //   type: 'text',
    //   rules: {
    //     value: true,
    //     message: 'Required',
    //   },
    // },
    {
      component: 'InputField',
      name: 'prevCity',
      label: 'City*',
      placeholder: 'New York',
      variant: 'sm:col-span-2',
      maxLength: { value: 30, message: 'Max 30 chars' },
      type: 'text',
      rules: {
        value: true,
        message: 'Required',
      },
    },
    {
      component: 'SelectField',
      name: 'prevState',
      label: 'State*',
      variant: 'sm:col-span-2',
      rules: {
        value: true,
        message: 'Required',
      },
      cats: states,
      control: true,
    },
    {
      component: 'InputField',
      name: 'prevZipCode',
      label: 'Zipcode*',
      placeholder: '12345',
      variant: 'sm:col-span-2',
      type: 'text',
      rules: {
        value: true,
        message: 'Required',
      },
      pattern: { value: zipReg, message: 'Invalid Zip' },
    },
    {
      component: 'SelectField',
      name: 'prevAddressYears',
      label: 'Time at Address*',
      variant: 'whitespace-nowrap sm:col-span-2',
      rules: {
        value: true,
        message: 'Required',
      },
      cats: timeYears,
      control: true,
    },
    {
      component: 'SelectField',
      name: 'prevAddressMonths',
      control: true,
      variant: 'sm:col-span-2 whitespace-nowrap',
      cats: timeMonths,
    },
    {
      component: 'InputField',
      name: 'prevRentMortgagePaymentAmount',
      label: 'Monthly Payment*',
      placeholder: 'Enter $0, if no Payment/Rent',
      variant: 'sm:col-span-2 whitespace-nowrap',
      type: 'text',
      rules: {
        value: true,
        message: 'Required',
      },
      onChange: (e: any) => {
        e.target.value = formatMoney(e.target.value)
      },
    },
  ],
}
