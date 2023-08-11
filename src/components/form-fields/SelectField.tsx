import { CategoryType } from '@/lib/categories'
import { cn } from '@/utils'
import { AlertCircle } from 'lucide-react'
import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

type InputProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>
interface SelectFieldProps extends InputProps {
  label: string
  name: string
  variant: string
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  cats: CategoryType[]
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ name, label, cats, variant, errormsg, onChange, onBlur, defaultValue, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative col-span-6 h-fit w-full',
          { 'mt-5': label === undefined },
          variant
        )}>
        <label
          htmlFor={name}
          className={cn(
            'block whitespace-nowrap text-base font-medium leading-6 text-gray-900 sm:text-sm'
          )}>
          {label}
        </label>
        <div className='relative mt-2 h-full w-full'>
          <select
            {...props}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            name={name}
            id={name}
            defaultValue={defaultValue}
            className={cn(
              'block w-full rounded-md border-0 px-3 text-left text-base text-gray-900 outline-none ring-1 ring-inset  ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-DRIVLY sm:max-w-xs sm:text-sm',
              {
                'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500':
                  errormsg,
                'text-gray-500': defaultValue === undefined || cats[0].value === '',
              }
            )}>
            {cats.map((cat: any, i: number) => (
              <option key={i} value={cat.value} className='text-base sm:text-sm'>
                {cat.optionName}
              </option>
            ))}
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            {errormsg && (
              <AlertCircle className='h-5 w-5 fill-white text-red-500' aria-hidden='true' />
            )}
          </div>
        </div>
      </div>
    )
  }
)

export default SelectField
SelectField.displayName = 'SelectField'
