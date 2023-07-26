import { CategoryType } from '@/lib/categories'
import { cn } from '@/utils'
import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form'

interface SelectFieldProps {
  label: string
  name: string
  variant: string
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  cats: CategoryType[]
}

export default function SelectField(props: any) {
  const method = useController(props)
  const { name, label, cats, variant, errormsg } = props as SelectFieldProps

  return (
    <div className={cn('relative col-span-6 w-full', { 'mt-6': label === undefined }, variant)}>
      <label
        htmlFor={name}
        className={cn('block whitespace-nowrap text-sm font-medium leading-6 text-gray-900', {
          'text-red-400': errormsg,
        })}>
        {label}
      </label>
      <div className='relative mt-2 h-full w-full'>
        <select
          {...method.field}
          name={name}
          className={cn(
            'block h-[36px] w-full rounded-md border-0 px-3 text-left text-gray-900 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-inset focus:ring-DRIVLY  sm:max-w-xs sm:text-sm sm:leading-6',
            {
              'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500':
                errormsg,
            }
          )}
          value={method.field.value ? method.field.value : cats[0].optionName}>
          {cats.map((cat: any, i: number) => (
            <option key={i}>{cat.value}</option>
          ))}
        </select>
      </div>
      {errormsg && (
        <p
          className={cn('absolute right-0  top-px text-xs font-medium leading-6 text-red-400', {
            '-top-6': !label,
          })}
          id={errormsg ? `${name}-error` : name}>
          {errormsg.toString()}
        </p>
      )}
    </div>
  )
}
