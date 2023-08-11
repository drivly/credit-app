import { cn } from '@/utils'
import { AlertCircle } from 'lucide-react'
import { Controller, FieldError, FieldErrorsImpl, Merge, useFormContext } from 'react-hook-form'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import PhoneInput from 'react-phone-number-input/react-hook-form-input'

type PhoneFieldProps = {
  label: string
  name: string
  placeholder: string
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  variant: string
  message?: string
  children?: React.ReactNode
}

const telType = ['phone', 'co_phone']

export default function PhoneField(props: PhoneFieldProps) {
  const { label, name, placeholder, errormsg, variant, children } = props
  const method = useFormContext()
  return (
    <div className={cn('relative col-span-6 h-fit w-full sm:col-span-3', variant)}>
      <label
        className={cn('block text-base font-medium leading-6 text-gray-900 sm:text-sm')}
        htmlFor={label}>
        {label}
      </label>
      <div className='relative mt-2 rounded-md shadow-sm'>
        {telType?.includes(name) && children}
        <Controller
          control={method.control}
          name={name}
          defaultValue=''
          rules={{
            required: `Required`,
            validate: (value: any) => isPossiblePhoneNumber(value) || `Invalid`,
          }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              className={cn(
                'block w-full rounded-md border-0 px-3 text-base text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8EA3]/50 focus:ring-2 focus:ring-inset focus:ring-DRIVLY sm:text-sm',
                {
                  'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500':
                    errormsg,
                  'pl-[85px] sm:pl-20': children,
                }
              )}
              placeholder={placeholder}
              country='US'
              name={name}
            />
          )}
        />
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
          {errormsg && <AlertCircle className='h-5 w-5 text-red-500' aria-hidden='true' />}
        </div>
      </div>
    </div>
  )
}
