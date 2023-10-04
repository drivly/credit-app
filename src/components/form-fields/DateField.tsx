'use client'

import { cn } from '@/utils'
import formatDate from '@/utils/formatDate'
import { AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form'

interface DateFieldProps {
  name: string
  label: string
  variant: string
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  control?: any
  defaultValue?: Date
}

export default function DateField(props: any) {
  const { name, control, label, variant, errormsg, placeholder, minDate, maxDate, defaultValue } =
    props as DateFieldProps
  const method = useController(props)
  const [date, setDate] = useState<Date | null>()

  const onChange = (date: Date | null) => {
    let formattedDate = formatDate(date)
    setDate(date)
    method.field.onChange(formattedDate)
  }

  useEffect(() => {
    if (defaultValue) {
      setDate(new Date(defaultValue))
    }
  }, [defaultValue])

  useEffect(() => {
    if (method.formState.isSubmitSuccessful) {
      setDate(null)
    }
  }, [method.formState.isSubmitSuccessful])

  return (
    <div className={cn('relative col-span-6 min-w-full', variant)}>
      <label
        className={cn('block text-base font-medium leading-6 text-gray-900 sm:text-sm')}
        htmlFor={label}>
        {label}
      </label>
      <div className='relative mt-2'>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={{ required: 'Required' }}
          render={() => (
            <DatePicker
              name={name}
              calendarClassName='absolute z-50 w-full max-w-[300px] mt-0.5 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              className={cn(
                'block w-full rounded-md border-0 px-3  text-base text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8EA3]/50 focus:ring-2 focus:ring-inset focus:ring-DRIVLY sm:text-sm ',
                {
                  'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500':
                    errormsg,
                }
              )}
              selected={date}
              placeholderText={placeholder}
              onChange={onChange}
              isClearable
              minDate={minDate}
              maxDate={maxDate}
              scrollableYearDropdown
              showYearDropdown
              yearDropdownItemNumber={100}
              showDisabledMonthNavigation
              adjustDateOnChange
              dateFormat='MM/dd/yyyy'
            />
          )}
        />
        <div className='pointer-events-none absolute inset-y-0 right-0 z-50 flex items-center pr-3'>
          {errormsg && <AlertCircle className='z-50 h-5 w-5 text-red-500' aria-hidden='true' />}
        </div>
      </div>
    </div>
  )
}
