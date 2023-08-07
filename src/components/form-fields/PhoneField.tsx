import { cn } from '@/utils'
import { Control, FieldError, FieldErrorsImpl, FieldValues, Merge, useController } from 'react-hook-form'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import PhoneInput from 'react-phone-number-input/react-hook-form-input'
import { AlertCircle } from 'lucide-react'

type PhoneFieldProps = {
  label: string
  name: string
  placeholder: string
  control: Control<FieldValues, any>
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  variant: string
  message?: string
  children?: React.ReactNode
}

const telType = ['phone', 'co_phone']

export default function PhoneField(props: PhoneFieldProps) {
  const { label, name, placeholder, control, errormsg, variant, children } = props
   const method = useController(props)
  return (
    <div className={cn('rrelative col-span-6 h-fit w-full sm:col-span-3', variant)}>
      <label
        className={cn('block text-base font-medium leading-6 text-gray-900 sm:text-sm')}
        htmlFor={label}>
        {label}
      </label>
      <div className='relative mt-2 rounded-md shadow-sm'>
        {telType?.includes(name) && children}
        <PhoneInput
          {...method.field}
          className={cn(
            'block w-full rounded-md border-0 px-3 text-base text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8EA3]/50 focus:ring-2 focus:ring-inset focus:ring-DRIVLY sm:text-sm',
            {
              'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500':
                errormsg,
                'pl-[85px] sm:pl-20': children
            }
          )}
          name={name}
          placeholder={placeholder}
          control={control}
          rules={{
            required: `Required`,
            validate: (value: any) => isPossiblePhoneNumber(value) || `Invalid`,
          }}
          country='US'
        />
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
          {errormsg && <AlertCircle className='h-5 w-5 text-red-500' aria-hidden='true' />}
        </div>
      </div>
    </div>
  )
}

{
  /* {errormsg && (
  <p className='absolute mt-2 text-sm text-red-600' id={errormsg ? `${name}-error` : name}>
    {errormsg.toString()}
  </p>
)}
{message && (
  <span className='absolute -bottom-[18px] left-0.5 text-[12px] font-medium text-gray-600'>
    <span className='whitespace-nowrap'>{message}</span>
  </span>
)} */
}
