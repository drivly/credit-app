import InputField from '@/components/form-fields/InputField'
import SelectField from '@/components/form-fields/SelectField'
import { states } from '@/lib/categories'
import { useFormContext } from 'react-hook-form'

const PrimaryLicense = () => {
  const {
    register,

    formState: { errors },
  } = useFormContext()

  return (
    <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
      <div className='px-5 py-6 sm:p-8'>
        <div className='grid max-w-3xl grid-cols-1 gap-y-8 sm:grid-cols-6 sm:gap-x-6'>
          <InputField
            {...register('licenseNumber', { required: 'Required' })}
            errormsg={errors?.licenseNumber?.message!}
            variant='sm:col-span-3 whitespace-nowrap'
            placeholder='123456789'
            label='License Number*'
          />
          <SelectField
            {...register('licenseState', { required: 'Required' })}
            variant='sm:col-span-3 whitespace-nowrap'
            label='License State*'
            placeholder='Select'
            defaultValue=''
            cats={states}
            errormsg={errors?.licenseState?.message!}
          />
          {/* <DateField
            rules={{
              required: 'Required',
            }}
            errormsg={errors?.licenseExp?.message!}
            variant='col-span-1 sm:col-span-2'
            label='License Expiration*'
            name='licenseExp'
            placeholder='Not more than 3mo expired'
            minDate={moment().subtract(3, 'months').toDate()}
            defaultValue={defaultValue}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default PrimaryLicense
