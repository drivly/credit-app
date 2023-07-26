import { cn } from '@/utils'
import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

interface IProps {
  label: string
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  variant?: string
  message?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputProps & IProps>((props, ref) => {
  const { label, name, placeholder, type, errormsg, variant, message } = props

  return (
    <div className={cn('relative col-span-6 w-full', variant)}>
      <label
        className={cn('block whitespace-nowrap text-sm font-medium leading-6 text-gray-900', {
          'text-red-400': errormsg,
        })}
        htmlFor={name}>
        {label}
      </label>
      <div className='mt-2'>
        <input
          ref={ref}
          className={cn(
            'block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8EA3]/50 focus:ring-2 focus:ring-inset focus:ring-DRIVLY sm:text-sm sm:leading-6',
            {
              'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500':
                errormsg,
            }
          )}
          autoComplete='on'
          placeholder={placeholder}
          {...props}
        />
      </div>
      {errormsg && (
        <span className='absolute right-0 top-[1px] text-xs font-medium leading-6 text-red-400'>
          {!name?.includes('rentMortgagePaymentAmount') && errormsg.toString()}
        </span>
      )}
      {message && (
        <span className='absolute -bottom-[18px] left-0.5 text-[12px] font-medium text-gray-600'>
          <span className='whitespace-nowrap'>{message}</span>
        </span>
      )}
    </div>
  )
})

export default InputField
InputField.displayName = 'InputField'
