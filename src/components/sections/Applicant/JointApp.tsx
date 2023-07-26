import DateField from '@/components/form-fields/DateField'
import InputField from '@/components/form-fields/InputField'
import PhoneField from '@/components/form-fields/PhoneField'
import { emailReg } from '@/lib/patterns'
import { formatSSN } from '@/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const JointApp = (props: any) => {
  const { type } = props
  const methods = useFormContext()
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = methods
  return (
    <>
      <div className='px-4 sm:px-0'>
        <h2 className='font-mont text-base font-semibold leading-7 text-gray-900'>
          {type} Applicant
        </h2>
      </div>

      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-4 py-6 sm:p-8'>
          <div className='grid max-w-3xl grid-cols-1 gap-y-8 sm:grid-cols-6 sm:gap-x-6'>
            <InputField
              {...register('coFirstName', { required: 'First name required' })}
              errormsg={errors?.firstName?.message!}
              variant='sm:col-span-2'
              placeholder='John'
              label='First Name *'
            />
            <InputField
              {...register('coMiddleInitial', {
                maxLength: { value: 3, message: 'Must be less than 3' },
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase()
                },
              })}
              errormsg={errors?.middleInitial?.message!}
              variant='sm:col-span-1'
              placeholder='W'
              label='MI'
            />
            <InputField
              {...register('coLastName', { required: 'Last name required' })}
              errormsg={errors?.lastName?.message!}
              variant='sm:col-span-3'
              placeholder='Wick'
              label='Last Name *'
            />
              <PhoneField
                label='Phone *'
                name='coPhone'
                errormsg={errors?.phone?.message!}
                placeholder='561-975-6432'
                control={control}
                variant='sm:col-span-3'
              />
              <InputField
                {...register('coEmail', {
                  required: 'Email required',
                  pattern: { value: emailReg, message: 'Invalid Email' },
                })}
                errormsg={errors?.email?.message!}
                placeholder='johnwsmith@gmail.com'
                variant='sm:col-span-3'
                label='Email *'
              />

            <DateField
              rules={{ required: 'DOB required' }}
              errormsg={errors?.dob?.message!}
              variant='col-span-1 sm:col-span-2'
              label='Date of Birth *'
              control={control}
              name='coDateOfBirth'
              placeholder='05/15/1980'
            />
            <InputField
              {...register('coSsn', {
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
              placeholder='123-45-6789'
              label='SSN *'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default JointApp
