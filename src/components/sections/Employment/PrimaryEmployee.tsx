import InputField from '@/components/form-fields/InputField'
import SelectField from '@/components/form-fields/SelectField'
import { jobStatus, timeMonths, timeYears } from '@/lib/categories'
import { formatMoney } from '@/utils'
import { formatphone } from '@/utils/formatphone'
import { useFormContext } from 'react-hook-form'

export default function PrimaryEmployee() {
  const methods = useFormContext()
  const {
    register,
    watch,
    formState: { errors },
  } = methods

  const primaryJobYears = watch('timeOnJobYears')
  const watchJobStatus = watch('employmentStatusCode')
  const jobless = watchJobStatus === 'Not Applicable' || watchJobStatus === ''

  return (
    <>
      <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
        <div className='px-5 py-6 sm:p-8'>
          <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <SelectField
                {...register('employmentStatusCode', { required: 'Required' })}
                variant='w-full sm:col-span-3'
                label='Employment Status*'
                name='employmentStatusCode'
                placeholder='Select'
                cats={jobStatus}
                errormsg={errors['employmentStatusCode']?.message!}
              />
            </div>
            <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              {!jobless && (
                <>
                  <InputField
                    {...register('employerName', {
                      required: 'Required',
                      maxLength: { value: 40, message: 'Max 40 chars' },
                    })}
                    maxLength={40}
                    errormsg={errors?.employerName?.message!}
                    variant='sm:col-span-6 whitespace-nowrap'
                    placeholder='ABC Company'
                    label='Employer Name*'
                  />
                  <InputField
                    {...register('employerPhone', {
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
                    errormsg={errors?.employerPhone?.message!}
                  />
                  <InputField
                    {...register('employmentTitle', {
                      required: 'Required',
                      maxLength: { value: 20, message: 'Max 20 chars' },
                    })}
                    maxLength={20}
                    errormsg={errors?.employmentTitle?.message!}
                    variant='sm:col-span-3'
                    placeholder='Sales Manager'
                    label='Occupation*'
                  />
                  <SelectField
                    {...register('timeOnJobYears', { required: 'Required' })}
                    variant='sm:col-span-2'
                    label='Time on job*'
                    defaultValue=''
                    cats={timeYears}
                    errormsg={errors?.timeOnJobYears?.message!}
                  />
                  <SelectField
                    {...register('timeOnJobMonths')}
                    variant='sm:col-span-2'
                    defaultValue=''
                    cats={timeMonths}
                  />
                  <InputField
                    {...register('incomeAmount', {
                      required: 'Required',
                      onChange: (e: any) => {
                        e.target.value = formatMoney(e.target.value)
                      },
                    })}
                    errormsg={errors?.incomeAmount?.message!}
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
      {primaryJobYears < 2 && primaryJobYears !== '' && (
        <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:col-start-2'>
          <div className='px-4 py-6 sm:p-8'>
            <div className='flex max-w-2xl flex-col gap-x-4 gap-y-8'>
              <h4 className='font-medium text-gray-800'>Previous Employer</h4>
              <div className='grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <InputField
                  {...register('previousEmployerName', {
                    required: 'Required',
                    maxLength: { value: 40, message: 'Max 40 chars' },
                  })}
                  maxLength={40}
                  errormsg={errors?.previousEmployerName?.message!}
                  variant='sm:col-span-6 whitespace-nowrap'
                  placeholder='ABC Company'
                  label='Employer Name*'
                />
                <InputField
                  {...register('prevEmployerPhone', {
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
                  errormsg={errors?.prevEmployerPhone?.message!}
                />
                <InputField
                  {...register('prevEmploymentTitle', {
                    required: 'Required',
                    maxLength: { value: 20, message: 'Max 20 chars' },
                  })}
                  maxLength={20}
                  errormsg={errors?.prevEmploymentTitle?.message!}
                  variant='sm:col-span-3'
                  placeholder='Sales Manager'
                  label='Occupation*'
                />
                <SelectField
                  {...register('prevTimeOnJobYears', { required: 'Required' })}
                  variant='sm:col-span-2'
                  label='Time on job*'
                  defaultValue=''
                  cats={timeYears}
                  errormsg={errors?.prevTimeOnJobYears?.message!}
                />
                <SelectField
                  {...register('prevTimeOnJobMonths')}
                  variant='sm:col-span-2'
                  defaultValue=''
                  cats={timeMonths}
                />
                <InputField
                  {...register('prevIncomeAmount', {
                    required: 'Required',
                    onChange: (e: any) => {
                      e.target.value = formatMoney(e.target.value)
                    },
                  })}
                  errormsg={errors?.prevIncomeAmount?.message!}
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
