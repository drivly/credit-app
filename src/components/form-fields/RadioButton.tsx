import { cn } from '@drivly/ui'
import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

interface RadioProps {
  label: string
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  variant?: string
}

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const RadioButton = React.forwardRef<HTMLInputElement, InputProps & RadioProps>((props, ref) => {
  const { errormsg, variant, label, id } = props
  return (
    <div className='relative flex w-fit items-center'>
      <label
        htmlFor={id}
        className={cn(
          'flex cursor-pointer items-center text-base font-medium leading-6 text-gray-900 sm:text-sm',
          variant
        )}>
        <input
          ref={ref}
          type='radio'
          className={cn(
            'mr-4 h-5 w-5 border-gray-300 text-gray-600 focus:ring-DRIVLY sm:h-4 sm:w-4',
            {
              'border-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500': errormsg,
            }
          )}
          id={id}
          {...props}
        />
        {label}
      </label>
    </div>
  )
})

export default RadioButton
RadioButton.displayName = 'RadioButton'
