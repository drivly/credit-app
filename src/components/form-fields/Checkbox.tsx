import { cn } from '@/utils'
import React from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

interface CheckboxProps {
  label: string
  variant?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, InputProps & CheckboxProps>((props, ref) => {
  const { label, variant } = props

  return (
    <label htmlFor={label} className='relative flex h-8 cursor-pointer items-center'>
      <div className='mr-4 flex items-center'>
        <input
          ref={ref}
          id={label}
          type='checkbox'
          className='h-5 sm:h-4 w-5 sm:w-4 rounded border-gray-300 text-gray-900 focus:ring-DRIVLY'
          {...props}
        />
      </div>
      <div className={cn('text-base sm:text-sm leading-6', variant)}>
        <span className='font-medium text-gray-900'>{label}</span>
      </div>
    </label>
  )
})

export default Checkbox
Checkbox.displayName = 'TWCheckbox'
