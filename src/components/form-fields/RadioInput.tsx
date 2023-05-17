import { RadioGroup } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useController } from 'react-hook-form'
import CheckIcon from '../CheckIcon'


export default function RadioInput(props: any) {
  const { name, label, control, value, isValid } = props
  const { field } = useController({
    name,
    control,
  })

  return (
    <RadioGroup
      {...field}
      onChange={field.onChange}
      // disabled={!isValid}
      value={value}
      as='div'
      className='flex w-full flex-col -ml-4'>
      <RadioGroup.Label className='sr-only'>I agree</RadioGroup.Label>
      <RadioGroup.Option value={name}>
        {({ checked, active }) => (
          <div className='flex items-center space-x-8'>
            <motion.div
              className='relative'
              animate={checked ? 'checked' : active ? 'active' : 'inactive'}>
              <motion.div
                variants={{
                  inactive: {
                    scale: 1,
                  },
                  active: {
                    scale: 1.25,
                    opacity: 1,
                    transition: {
                      delay: 0,
                      duration: 0.2,
                    },
                  },
                  checked: {
                    scale: 1.25,
                    opacity: 1,
                  },
                }}
                transition={{ duration: 0.6, delay: 0.2, type: 'tween', ease: 'circOut' }}
                className='absolute inset-0 ml-4 rounded-full bg-slate-200'></motion.div>
              <motion.div
                initial={false}
                variants={{
                  inactive: {
                    backgroundColor: 'var(--white)',
                    borderColor: 'var(--gray-400)',
                    color: 'var(--gray-400)',
                  },
                  active: {
                    backgroundColor: 'var(--white)',
                    borderColor: 'var(--dark)',
                    color: 'var(--white)',
                  },
                  checked: {
                    backgroundColor: 'var(--dark)',
                    borderColor: 'var(--dark)',
                    color: 'var(--white)',
                  },
                }}
                transition={{ duration: 0.2 }}
                className='relative ml-4 flex h-5 w-5 shrink-0 items-center rounded-full border'>
                {checked && (
                  <div className='ml-0 shrink-0 rounded-full bg-black'>
                    <CheckIcon className='h-5 w-5' />
                  </div>
                )}
              </motion.div>
            </motion.div>
            <RadioGroup.Label as='label' className='text-sm leading-6'>
              <span
                className='font-medium text-gray-900'>
                {label}
              </span>
            </RadioGroup.Label>
          </div>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  )
}
