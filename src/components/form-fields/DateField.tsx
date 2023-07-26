'use client'

import { cn } from '@/utils'
import formatDate from '@/utils/formatDate'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form'

interface DateFieldProps {
  name: string
  label: string
  variant: string
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  placeholder?: string
}

export default function DateField(props: any) {
  const { name, label, variant, errormsg, placeholder } = props as DateFieldProps
  const [date, setDate] = useState<Date | null>(null)
  const method = useController(props)

  const onChange = (date: Date | null) => {
    let formattedDate = formatDate(date)
    setDate(date)
    method.field.onChange(formattedDate)
  }

  useEffect(() => {
    if (method.formState.isSubmitted) {
      setDate(null)
    }
  }, [method.formState.isSubmitted])

  return (
    <div className={cn('relative col-span-6 min-w-full', variant)}>
      <label
        className={cn('block text-sm font-medium leading-6 text-gray-900', {
          'text-red-400': errormsg,
        })}
        htmlFor={label}>
        {label}
      </label>
      <DatePicker
        {...method.field}
        className={cn(
          'mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8EA3]/50 focus:ring-2 focus:ring-inset focus:ring-DRIVLY  sm:text-sm sm:leading-6',
          {
            'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500':
              errormsg,
          }
        )}
        name={name}
        onChange={onChange}
        isClearable
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        selected={date}
        placeholderText={placeholder}
      />
      {errormsg && (
        <span className='absolute right-0 top-[1px] text-xs font-medium leading-6 text-red-400'>
          {errormsg.toString()}
        </span>
      )}
    </div>
  )
}
