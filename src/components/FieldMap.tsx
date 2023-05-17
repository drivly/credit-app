import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import DateField from './form-fields/DateField'
import InputField from './form-fields/InputField'
import PhoneField from './form-fields/PhoneField'
import SelectField from './form-fields/SelectField'

interface FieldMapProps {
  field: any
  methods: UseFormReturn<FieldValues>
  errors: FieldErrors<FieldValues>
}

const FieldMap = ({ field, methods, errors }: FieldMapProps) => {
  let Component: React.ReactNode

  switch (field.component) {
    case 'InputField':
      {
        Component = (
          <InputField
            {...methods.register(
              field.name,
              field.rules?.value
                ? {
                    required: field.rules?.message,
                    validate: field?.validate,
                    pattern: field?.pattern,
                    onChange: field?.onChange,
                    maxLength: field?.maxLength,
                  }
                : {
                    onChange: field?.onChange,
                    maxLength: field?.maxLength,
                  }
            )}
            errormsg={errors[field.name]?.message!}
            message={field?.message}
            variant={field.variant}
            placeholder={field.placeholder}
            label={field.label}
            name={field.name}
            type={field.type}
          />
        )
      }
      break
    case 'SelectField':
      {
        Component = (
          <SelectField
            {...field}
            name={field.name}
            cats={field.cats}
            label={field.label}
            control={methods.control}
            variant={field.variant}
            errormsg={errors[field.name]?.message!}
            rules={{ required: field?.rules?.message }}
          />
        )
      }
      break
    case 'DateField':
      {
        Component = (
          <DateField
            {...field}
            rules={{ required: field.rules.message, validate: field?.validate }}
            errormsg={errors[field.name]?.message!}
            control={methods.control}
            variant={field.variant}
          />
        )
      }
      break
    case 'PhoneField':
      {
        Component = (
          <PhoneField
            {...field}
            errormsg={errors[field.name]?.message!}
            variant={field.variant}
            control={methods.control}
            message={field?.message}
          />
        )
      }
      break
  }
  return <>{Component}</>
}

export default FieldMap
