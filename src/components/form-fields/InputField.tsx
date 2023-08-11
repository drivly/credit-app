import { cn } from '@/utils'
import { AlertCircle } from 'lucide-react'
import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

interface IProps {
  label?: string
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  variant?: string
  message?: string
  comp?: React.ReactNode
}
const telType = ['phone', 'co_phone']

const InputField = React.forwardRef<HTMLInputElement, InputProps & IProps>((props, ref) => {
  const { label, comp, name, placeholder, type, errormsg, variant, message } = props

  return (
    <div className={cn('relative col-span-6 h-fit w-full', variant)}>
      <label
        htmlFor={name}
        className={cn('block text-base font-medium leading-6 text-gray-900 sm:text-sm')}>
        {label}
      </label>
      <div className='relative mt-2'>
        {telType?.includes(name!) && comp}
        <input
          ref={ref}
          className={cn(
            'block w-full rounded-md border-0 px-3 text-base text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8EA3]/50 focus:ring-2 focus:ring-inset focus:ring-DRIVLY sm:text-sm',
            {
              'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500':
                errormsg,
              'pl-[85px] sm:pl-20': comp,
            }
          )}
          autoComplete='on'
          {...props}
        />
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
          {errormsg && <AlertCircle className='h-5 w-5 text-red-500' aria-hidden='true' />}
        </div>
      </div>
    </div>
  )
})

export default InputField
InputField.displayName = 'InputField'
