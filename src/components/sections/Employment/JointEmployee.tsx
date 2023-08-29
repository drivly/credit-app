import InputField from '@/components/form-fields/InputField'
import SelectField from '@/components/form-fields/SelectField'
import { jobStatus, timeMonths, timeYears } from '@/lib/categories'
import { formatMoney } from '@/utils'
import { formatphone } from '@/utils/formatphone'
import { useFormContext } from 'react-hook-form'

export default function JointEmployee() {
  const methods = useFormContext()
  const {
    register,
    watch,
    formState: { errors },
  } = methods

  const jointJobYrs = watch('co_timeOnJobYears')
  const watchJobStatus = watch('co_employmentStatusCode')
  const jobless = watchJobStatus === 'Not Applicable' || watchJobStatus === ''

  return (
    <>
      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-5 py-6 sm:p-8'>
          <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <SelectField
                {...register('co_employmentStatusCode', { required: 'Required' })}
                variant='w-full sm:col-span-3'
                label='Employment Status*'
                placeholder='Select'
                name='co_employmentStatusCode'
                defaultValue='Full Time'
                cats={jobStatus}
                errormsg={errors['co_employmentStatusCode']?.message!}
              />
            </div>
            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              {!jobless && (
                <>
                  <InputField
                    {...register('co_employerName', {
                      required: 'Required',
                      maxLength: { value: 50, message: 'Max 50 chars' },
                    })}
                    maxLength={50}
                    errormsg={errors?.co_employerName?.message!}
                    variant='sm:col-span-6 whitespace-nowrap'
                    placeholder='ABC Company'
                    label='Employer Name*'
                  />
                  <InputField
                    {...register('co_employerPhone', {
                      required: 'Required',
                      maxLength: { value: 14, message: 'Must be less than 14' },
                      onChange: (e: any) => {
                        e.target.value = formatphone(e.target.value)
                      },
                    })}
                    variant='sm:col-span-3'
                    label='Employer Phone*'
                    placeholder='If unemployed, use your phone.'
                    maxLength={14}
                    errormsg={errors?.co_employerPhone?.message!}
                  />
                  <InputField
                    {...register('co_employmentTitle', {
                      required: 'Required',
                      maxLength: { value: 20, message: 'Max 20 chars' },
                    })}
                    maxLength={20}
                    errormsg={errors?.co_employmentTitle?.message!}
                    variant='sm:col-span-3'
                    placeholder='Sales Manager'
                    label='Occupation*'
                  />
                  <SelectField
                    {...register('co_timeOnJobYears', { required: 'Required' })}
                    variant='sm:col-span-2'
                    label='Time on job*'
                    defaultValue=''
                    cats={timeYears}
                    errormsg={errors?.co_timeOnJobYears?.message!}
                  />
                  <SelectField
                    {...register('co_timeOnJobMonths')}
                    variant='sm:col-span-2'
                    defaultValue=''
                    cats={timeMonths}
                  />
                  <InputField
                    {...register('co_incomeAmount', {
                      required: 'Required',
                      onChange: (e: any) => {
                        e.target.value = formatMoney(e.target.value)
                      },
                    })}
                    errormsg={errors?.co_incomeAmount?.message!}
                    variant='sm:col-span-2 whitespace-nowrap'
                    placeholder='Gross Pay, Before Taxes'
                    label='Monthly Income*'
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {jointJobYrs < 2 && jointJobYrs !== '' && (
        <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2'>
          <div className='px-4 py-6 sm:p-8'>
            <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
              <h4 className='font-medium text-gray-800'>Previous Employer</h4>
              <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <InputField
                  {...register('co_previousEmployerName', {
                    required: 'Required',
                    maxLength: { value: 50, message: 'Max 50 chars' },
                  })}
                  maxLength={50}
                  errormsg={errors?.co_previousEmployerName?.message!}
                  variant='sm:col-span-6 whitespace-nowrap'
                  placeholder='ABC Company'
                  label='Employer Name*'
                />
                <InputField
                  {...register('co_prevEmployerPhone', {
                    required: 'Required',
                    maxLength: { value: 14, message: 'Must be less than 14' },
                    onChange: (e: any) => {
                      e.target.value = formatphone(e.target.value)
                    },
                  })}
                  variant='sm:col-span-3'
                  label='Employer Phone*'
                  placeholder='713-555-2541'
                  maxLength={14}
                  errormsg={errors?.co_prevEmployerPhone?.message!}
                />
                <InputField
                  {...register('co_prevEmploymentTitle', {
                    required: 'Required',
                    maxLength: { value: 20, message: 'Max 20 chars' },
                  })}
                  maxLength={20}
                  errormsg={errors?.co_prevEmploymentTitle?.message!}
                  variant='sm:col-span-3'
                  placeholder='Sales Manager'
                  label='Occupation*'
                />
                <SelectField
                  {...register('co_prevTimeOnJobYears', { required: 'Required' })}
                  variant='sm:col-span-2'
                  label='Time on job*'
                  defaultValue=''
                  cats={timeYears}
                  errormsg={errors?.co_prevTimeOnJobYears?.message!}
                />
                <SelectField
                  {...register('co_prevTimeOnJobMonths')}
                  variant='sm:col-span-2'
                  defaultValue=''
                  cats={timeMonths}
                />
                <InputField
                  {...register('co_prevIncomeAmount', {
                    required: 'Required',
                    onChange: (e: any) => {
                      e.target.value = formatMoney(e.target.value)
                    },
                  })}
                  errormsg={errors?.co_prevIncomeAmount?.message!}
                  variant='sm:col-span-2 whitespace-nowrap'
                  placeholder='Gross Pay, Before Taxes'
                  label='Monthly Income*'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
