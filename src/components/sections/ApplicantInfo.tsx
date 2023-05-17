import React from 'react'
import InputField from '../form-fields/InputField'
import PhoneField from '../form-fields/PhoneField'
import DateField from '../form-fields/DateField'
import { useFormContext } from 'react-hook-form'
import { formatSSN } from '@/utils'
import { emailReg } from '@/lib/patterns'

export default function ApplicantInfo(props: any) {
  const { type, errors } = props
  const { control, register } = useFormContext()
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-4'>
      <div className='px-4 sm:px-0'>
        <h2 className='font-mont text-base font-semibold leading-7 text-gray-900'>
          {type} Applicant
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
          Please fill out the following information for the {type} applicant.
        </p>
      </div>

      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3'>
        <div className='px-4 py-6 sm:p-8'>
          <div className='grid max-w-3xl grid-cols-1 gap-y-8 sm:grid-cols-7 sm:gap-x-6'>
            <InputField
              {...register('firstName', { required: 'First name required' })}
              errormsg={errors?.firstName?.message!}
              variant='sm:col-span-3'
              placeholder='John'
              label='First Name *'
              name='firstName'
              type='text'
            />
            <InputField
              {...register('middleInitial', {
                maxLength: { value: 3, message: 'Must be less than 3' },
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase()
                },
              })}
              errormsg={errors?.middleInitial?.message!}
              variant='sm:col-span-1'
              placeholder='W'
              name='middleInitial'
              label='MI'
              type='text'
            />
            <InputField
              {...register('lastName', { required: 'Last name required' })}
              errormsg={errors?.lastName?.message!}
              variant='sm:col-span-3'
              placeholder='Wick'
              label='Last Name *'
              name='lastName'
              type='text'
            />

            <DateField
              rules={{ required: 'DOB required' }}
              errormsg={errors?.dob?.message!}
              variant='col-span-1 sm:col-span-2'
              label='Date of Birth *'
              control={control}
              name='dob'
            />
            <InputField
              {...register('ssn', {
                required: 'SSN required',
                validate: (value) => {
                  const length = value.replace(/\D/g, '').length
                  if (length < 9) return 'Must be 9 digits'
                  return true
                },
                onChange(event) {
                  event.target.value = formatSSN(event.target.value)
                },
              })}
              errormsg={errors?.ssn?.message!}
              variant='sm:col-span-2'
              label='SSN *'
              name='ssn'
              type='text'
            />
            <PhoneField
              label='Phone *'
              name='phone'
              errormsg={errors?.phone?.message!}
              placeholder='561-975-6432'
              control={control}
              variant='sm:col-span-3'
            />
            <InputField
              {...register('email', {
                required: 'Email required',
                pattern: { value: emailReg, message: 'Invalid Email' },
              })}
              errormsg={errors?.email?.message!}
              placeholder='johnwsmith@gmail.com'
              variant='sm:col-span-3'
              label='Email *'
              type='text'
              name='email'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
