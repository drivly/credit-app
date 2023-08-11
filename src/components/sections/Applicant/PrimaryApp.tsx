import DateField from '@/components/form-fields/DateField'
import InputField from '@/components/form-fields/InputField'
import { emailReg } from '@/lib/patterns'
import { formatSSN, isAtLeast18 } from '@/utils'
import { formatphone } from '@/utils/formatphone'
import moment from 'moment'

import { useFormContext } from 'react-hook-form'

const PrimaryApp = () => {
  const methods = useFormContext()
  const {
    control,
    register,
    formState: { errors },
  } = methods

  return (
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
            errormsg={errors?.dateOfBirth?.message!}
            variant='col-span-1 sm:col-span-2'
            label='Date of Birth *'
            control={control}
            name='dateOfBirth'
            placeholder='Must be 18yo or older'
            minDate={moment().subtract(500, 'years').toDate()}
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
            variant='sm:col-span-2'
            label='SSN *'
          />
        </div>
      </div>
    </div>
  )
}

export default PrimaryApp
