'use client'

import { cn } from '@/utils'
import formatDate from '@/utils/formatDate'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'
import moment from 'moment'

interface DateFieldProps {
  name: string
  label: string
  variant: string
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  placeholder?: string
  minDate?: Date
  maxDate?: Date
}

export default function DateField(props: any) {
  const { name, label, variant, errormsg, placeholder, minDate, maxDate } = props as DateFieldProps
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


console.log('method.formState.isSubmitted', method.formState.isSubmitted)
  
  return (
    <div className={cn('relative col-span-6 min-w-full', variant)}>
      <label
        className={cn('block text-base font-medium leading-6 text-gray-900 sm:text-sm')}
        htmlFor={label}>
        {label}
      </label>
      <div className='relative mt-2'>
        <DatePicker
          {...method.field}
          className={cn(
            'block w-full rounded-md border-0 px-3  text-base text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8EA3]/50 focus:ring-2 focus:ring-inset focus:ring-DRIVLY sm:text-sm ',
            {
              'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500':
                errormsg,
            }
          )}
          placeholderText={placeholder}
          name={name}
          onChange={onChange}
          isClearable
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          selected={date}
          minDate={minDate}
          maxDate={maxDate}
          showDisabledMonthNavigation
          value={date ? moment(date).format('MM/DD/YYYY') : ''}
        />
        <div className='pointer-events-none absolute inset-y-0 right-0 z-50 flex items-center pr-3'>
          {errormsg && <AlertCircle className='z-50 h-5 w-5 text-red-500' aria-hidden='true' />}
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
)} */
}
