import { cn } from '@/utils'
import { Control, FieldError, FieldErrorsImpl, FieldValues, Merge } from 'react-hook-form'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import PhoneInput from 'react-phone-number-input/react-hook-form-input'

type PhoneFieldProps = {
  label: string
  name: string
  placeholder: string
  control: Control<FieldValues, any>
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  variant: string
  message?: string
}

export default function PhoneField({
  label,
  name,
  placeholder,
  control,
  errormsg,
  variant,
  message,
}: PhoneFieldProps) {
  return (
    <div className={cn('relative flex w-full flex-col col-span-6', variant)}>
      <label
        className={cn('block text-sm font-medium leading-6 text-gray-900', {
          'text-red-400': errormsg,
        })}
        htmlFor={label}>
        {label}
      </label>
      <PhoneInput
        className={cn(
          'mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8EA3]/50 focus:ring-2 focus:ring-inset focus:ring-DRIVLY sm:text-sm sm:leading-6',
          {
            'text-red-400 outline-none ring-1 ring-inset ring-red-400 focus:ring-2 focus:ring-inset focus:ring-red-400':
              errormsg,
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
      {errormsg && (
        <span className='absolute right-0 top-[1px] text-xs font-medium leading-6 text-red-400'>
          {errormsg.toString()}
        </span>
      )}
      {message && (
        <span className='absolute -bottom-[18px] left-0.5 text-[12px] font-medium text-gray-600'>
          <span className='whitespace-nowrap'>{message}</span>
        </span>
      )}
    </div>
  )
}
