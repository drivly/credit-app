import DateField from '@/components/form-fields/DateField'
import InputField from '@/components/form-fields/InputField'
import RadioButton from '@/components/form-fields/RadioButton'
import { emailReg } from '@/lib/patterns'
import { formatSSN, isAtLeast18 } from '@/utils'
import { formatphone } from '@/utils/formatphone'
import moment from 'moment'
import { useFormContext } from 'react-hook-form'

const JointApp = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2'>
      <div className='px-5 py-6 sm:p-8'>
        <p className='mt-1 text-base font-medium leading-6 tracking-[0.02em] text-gray-900 sm:text-sm sm:leading-[22px]'>
          Relationship to Primary:
        </p>
        <div className='mb-8 mt-6 flex w-full flex-wrap items-center justify-start gap-x-8 gap-y-6'>
          <RadioButton
            {...register('co_buyerRelationship', { required: 'Required' })}
            errormsg={errors?.co_buyerRelationship?.message!}
            name='co_buyerRelationship'
            label='Spouse'
            id='spouse'
            value='4'
            variant='w-20 font-normal'
          />
          <RadioButton
            {...register('co_buyerRelationship', { required: 'Required' })}
            errormsg={errors?.co_buyerRelationship?.message!}
            name='co_buyerRelationship'
            label='Parent/Child'
            id='parent'
            value='2'
            variant='font-normal'
          />
          <RadioButton
            {...register('co_buyerRelationship', { required: 'Required' })}
            name='co_buyerRelationship'
            errormsg={errors?.co_buyerRelationship?.message!}
            label='Lives with'
            id='livesWith'
            value='1'
            variant='font-normal'
          />
          <RadioButton
            {...register('co_buyerRelationship', { required: 'Required' })}
            errormsg={errors?.co_buyerRelationship?.message!}
            name='co_buyerRelationship'
            label='Other'
            id='other'
            value='3'
            variant='font-normal'
          />
        </div>
        <div className='grid max-w-2xl grid-cols-1 gap-y-8 sm:grid-cols-6 sm:gap-x-6'>
          <InputField
            {...register('co_firstName', { required: 'First name required' })}
            errormsg={errors?.co_firstName?.message!}
            variant='sm:col-span-2'
            placeholder='John'
            label='First Name*'
          />
          <InputField
            {...register('co_middleName', {
              maxLength: { value: 3, message: 'Must be less than 3' },
              onChange: (e) => {
                e.target.value = e.target.value.toUpperCase()
              },
            })}
            errormsg={errors?.co_middleName?.message!}
            variant='sm:col-span-1'
            placeholder='W'
            label='MI'
          />
          <InputField
            {...register('co_lastName', { required: 'Last name required' })}
            errormsg={errors?.co_lastName?.message!}
            variant='sm:col-span-3'
            placeholder='Wick'
            label='Last Name*'
          />
          <InputField
            {...register('co_phone', {
              required: 'Required',
              maxLength: { value: 14, message: 'Must be less than 14' },
              onChange: (e) => {
                e.target.value = formatphone(e.target.value)
              },
            })}
            maxLength={14}
            errormsg={errors?.co_phone?.message!}
            variant='sm:col-span-3'
            placeholder='561-975-6432'
            label='Phone*'
            comp={
              <div className='absolute inset-y-0 left-0 flex items-center'>
                <label htmlFor='phoneType' className='sr-only'>
                  Phone Type
                </label>
                <select
                  {...register('co_phoneType', { required: 'Required' })}
                  defaultValue=''
                  autoComplete='on'
                  className='h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-0 sm:text-sm'>
                  <option value='MOBILE'>Mobile</option>
                  <option value='HOME'>Home</option>
                  <option value='WORK'>Work</option>
                </select>
              </div>
            }
          />
          <InputField
            {...register('co_email', {
              required: 'Email required',
              pattern: { value: emailReg, message: 'Invalid Email' },
            })}
            errormsg={errors?.co_email?.message!}
            placeholder='johnwsmith@gmail.com'
            variant='sm:col-span-3'
            label='Email*'
          />

          <DateField
            rules={{
              value: true,
              required: 'Required',
              validate: (value: any) => isAtLeast18(value) || '18yo or older',
            }}
            errormsg={errors?.co_dateOfBirth?.message!}
            variant='col-span-1 sm:col-span-2'
            label='Date of Birth*'
            name='co_dateOfBirth'
            placeholder='05/15/1980'
            minDate={moment().subtract(200, 'years').toDate()}
            maxDate={moment().subtract(18, 'years').toDate()}
          />
          <InputField
            {...register('co_ssn', {
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
            errormsg={errors?.co_ssn?.message!}
            variant='sm:col-span-2'
            placeholder='123-45-6789'
            label='SSN*'
          />
        </div>
      </div>
    </div>
  )
}

export default JointApp
