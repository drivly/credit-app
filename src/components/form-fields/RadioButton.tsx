import React from 'react'

interface RadioProps {
  label: string
  errormsg?: string
}

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const RadioButton = React.forwardRef<HTMLInputElement, InputProps & RadioProps>((props, ref) => {
  const { errormsg, label, id } = props
  return (
    <div className='relative flex items-center w-fit'>
      <label
        htmlFor={id}
        className='flex cursor-pointer items-center text-base sm:text-sm font-medium leading-6 text-gray-900'>
        <input
          ref={ref}
          type='radio'
          className='mr-4 h-5 w-5 border-gray-300 text-gray-600 focus:ring-DRIVLY sm:h-4 sm:w-4'
          id={id}
          {...props}
        />
        {label}
      </label>
      {errormsg && (
        <p
          className='absolute left-0 mt-20 text-sm text-red-400'
          id={errormsg ? `${id}-error` : id}>
          {errormsg.toString()}
        </p>
      )}
    </div>
  )
})

export default RadioButton
RadioButton.displayName = 'RadioButton'


