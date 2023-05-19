import { formatMoney, formatSSN, isAtLeast18 } from '@/utils'
import { emailReg, zipReg } from './patterns'
import { states, timeMonths, timeYears } from './categories'

export const creditApps = [
  {
    main: 'Primary',
    sections: [
      {
        title: 'Personal Information',
        description: 'Personal information about the primary applicant',
        fields: [
          {
            component: 'InputField',
            name: 'firstName',
            label: 'First Name*',
            placeholder: 'John',
            variant: 'sm:col-span-2',
            type: 'text',
            maxLength: { value: 30, message: 'Max 30 chars' },
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'InputField',
            name: 'middleInitial', // middleName
            label: 'MI',
            variant: 'sm:col-span-1',
            placeholder: 'A',
            onChange: (e: any) => {
              e.target.value = e.target.value.toUpperCase()
            },
            maxLength: { value: 3, message: 'Max 3 chars' },
            rules: {
              value: false,
            },
            type: 'text',
          },
          {
            component: 'InputField',
            name: 'lastName',
            label: 'Last Name*',
            placeholder: 'Doe',
            variant: 'sm:col-span-3',
            maxLength: { value: 30, message: 'Max 30 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'PhoneField',
            name: 'phone',
            label: 'Phone*',
            placeholder: '555-555-5555',
            variant: 'sm:col-span-3',
            control: true,
            errors: true,
          },
          {
            component: 'InputField',
            name: 'email',
            label: 'Email*',
            placeholder: 'johnwsmith@gmail.com',
            variant: 'sm:col-span-3',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            pattern: { value: emailReg, message: 'Invalid Email' },
          },
          {
            component: 'DateField',
            name: 'dateOfBirth',
            label: 'Date of Birth*',
            variant: 'sm:col-span-2',
            placeholder: '05/15/1980',
            control: true,
            rules: {
              value: true,
              message: 'Required',
            },
            validate: (value: any) => isAtLeast18(value) || '18yo or older',
          },
          {
            component: 'InputField',
            name: 'ssn',
            label: 'SSN*',
            placeholder: '111-22-3333',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            variant: 'sm:col-span-2',
            validate: (value: any) => {
              const length = value?.replace(/\D/g, '').length
              if (length < 9) return 'Must be 9 digits'
              return true
            },
            onChange(event: any) {
              event.target.value = formatSSN(event.target.value)
            },
          },
        ],
      },
      {
        title: 'Residence',
        description: "Information about the primary applicant's residence",
        fields: [
          {
            component: 'InputField',
            name: 'addressLine1',
            label: 'Street Address*',
            placeholder: '123 Main St',
            maxLength: { value: 200, message: 'Max 200 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'InputField',
            name: 'city',
            label: 'City*',
            placeholder: 'New York',
            variant: 'sm:col-span-2',
            maxLength: { value: 30, message: 'Max 30 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'state',
            label: 'State*',
            variant: 'sm:col-span-2',
            rules: {
              value: true,
              message: 'Required',
            },
            cats: states,
            control: true,
          },
          {
            component: 'InputField',
            name: 'zipCode',
            label: 'Zipcode*',
            placeholder: '12345',
            variant: 'sm:col-span-2',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            pattern: { value: zipReg, message: 'Invalid Zip' },
          },
          {
            component: 'SelectField',
            name: 'addressYears',
            label: 'Time at Address*',
            variant: 'whitespace-nowrap sm:col-span-2',
            rules: {
              value: true,
              message: 'Required',
            },
            cats: timeYears,
            control: true,
          },
          {
            component: 'SelectField',
            name: 'addressMonths',
            control: true,
            variant: 'sm:col-span-2 whitespace-nowrap',
            cats: timeMonths,
          },
          {
            component: 'InputField',
            name: 'rentMortgagePaymentAmount',
            label: 'Monthly Pmt / Rent*',
            placeholder: 'Enter $0, if no Pmt/Rent',
            variant: 'sm:col-span-2 whitespace-nowrap',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            onChange: (e: any) => {
              e.target.value = formatMoney(e.target.value)
            },
          },
          {
            component: 'InputField',
            name: 'prev_addressLine1',
            label: 'Street Address*',
            placeholder: '123 Main St',
            maxLength: { value: 200, message: 'Max 200 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'InputField',
            name: 'prev_city',
            label: 'City*',
            placeholder: 'New York',
            variant: 'sm:col-span-2',
            maxLength: { value: 30, message: 'Max 30 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'prev_state',
            label: 'State*',
            variant: 'sm:col-span-2',
            rules: {
              value: true,
              message: 'Required',
            },
            cats: states,
            control: true,
          },
          {
            component: 'InputField',
            name: 'prev_zipCode',
            label: 'Zipcode*',
            placeholder: '12345',
            variant: 'sm:col-span-2',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            pattern: { value: zipReg, message: 'Invalid Zip' },
          },
          {
            component: 'SelectField',
            name: 'prev_addressYears',
            label: 'Time at Address*',
            variant: 'whitespace-nowrap sm:col-span-2',
            rules: {
              value: true,
              message: 'Required',
            },
            cats: timeYears,
            control: true,
          },
          {
            component: 'SelectField',
            name: 'prev_addressMonths',
            control: true,
            variant: 'sm:col-span-2 whitespace-nowrap',
            cats: timeMonths,
          },
          {
            component: 'InputField',
            name: 'prev_rentMortgagePaymentAmount',
            label: 'Monthly Pmt / Rent*',
            placeholder: 'Enter $0, if no Pmt/Rent',
            variant: 'sm:col-span-2 whitespace-nowrap',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            onChange: (e: any) => {
              e.target.value = formatMoney(e.target.value)
            },
          },
        ],
      },
      {
        title: 'Drivers License',
        description: "Information about the primary applicant's drivers license",
        fields: [
          {
            component: 'InputField',
            name: 'licenseNumber',
            label: 'License Number*',
            placeholder: '123456789',
            variant: 'sm:col-span-2 whitespace-nowrap',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'licenseState',
            label: 'License State*',
            variant: 'sm:col-span-2 whitespace-nowrap',
            control: true,
            cats: states,
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'DateField',
            name: 'licenseExp',
            label: 'License Exp*',
            placeholder: '09/30/2026',
            variant: 'sm:col-span-2 whitespace-nowrap',
            control: true,
            rules: {
              value: true,
              message: 'Required',
            },
          },
        ],
      },
      {
        title: 'Employment History',
        description: "Information about the primary applicant's employment history",
        fields: [
          {
            component: 'InputField',
            name: 'employerName',
            label: 'Employer Name*',
            placeholder: 'ABC Company',
            maxLength: { value: 50, message: 'Max 50 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'PhoneField',
            name: 'employerPhone',
            label: 'Employer Phone*',
            placeholder: '713-555-2541',
            control: true,
            variant: 'sm:col-span-3',
            message: 'If unemployed, use your phone.',
            errors: true,
          },
          {
            component: 'InputField',
            name: 'employmentTitle',
            label: 'Occupation*',
            placeholder: 'Sales Manager',
            variant: 'sm:col-span-3',
            maxLength: { value: 50, message: 'Max 50 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'timeOnJobYears',
            label: 'Time on job*',
            variant: 'sm:col-span-2',
            control: true,
            cats: timeYears,
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'timeOnJobMonths',
            control: true,
            variant: 'sm:col-span-2',
            cats: timeMonths,
          },
          {
            component: 'InputField',
            name: 'incomeAmount',
            label: 'Monthly Income*',
            placeholder: 'Gross Pay, Before Taxes',
            variant: 'sm:col-span-2 whitespace-nowrap',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            onChange: (e: any) => {
              e.target.value = formatMoney(e.target.value)
            },
          },
          {
            component: 'InputField',
            name: 'previousEmployerName',
            label: 'Employer Name*',
            placeholder: 'ABC Company',
            maxLength: { value: 50, message: 'Max 50 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'PhoneField',
            name: 'prev_employerPhone',
            label: 'Employer Phone*',
            placeholder: '713-555-2541',
            control: true,
            variant: 'sm:col-span-3',
            message: 'If unemployed, use your phone.',
            errors: true,
          },
          {
            component: 'InputField',
            name: 'prev_employmentTitle',
            label: 'Occupation*',
            placeholder: 'Sales Manager',
            variant: 'sm:col-span-3',
            maxLength: { value: 50, message: 'Max 50 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'prev_timeOnJobYears',
            label: 'Time on job*',
            variant: 'sm:col-span-2',
            control: true,
            cats: timeYears,
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'prev_timeOnJobMonths',
            control: true,
            variant: 'sm:col-span-2',
            cats: timeMonths,
          },
          {
            component: 'InputField',
            name: 'prev_incomeAmount',
            label: 'Monthly Income*',
            placeholder: 'Gross Pay, Before Taxes',
            variant: 'sm:col-span-2 whitespace-nowrap',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            onChange: (e: any) => {
              e.target.value = formatMoney(e.target.value)
            },
          },
        ],
      },
    ],
  },
  {
    main: 'Joint',
    sections: [
      {
        title: 'Personal Information',
        description: 'Personal information about the joint applicant',
        fields: [
          {
            component: 'InputField',
            name: 'coFirstName',
            label: 'First Name*',
            placeholder: 'Harry',
            variant: 'sm:col-span-2',
            maxLength: { value: 30, message: 'Max 30 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'InputField',
            name: 'coMiddleInitial',
            label: 'MI',
            variant: 'sm:col-span-1',
            placeholder: 'A',
            onChange: (e: any) => {
              e.target.value = e.target.value.toUpperCase()
            },
            maxLength: { value: 3, message: 'Max 3 chars' },
            type: 'text',
            rules: {
              value: false,
            },
          },
          {
            component: 'InputField',
            name: 'coLastName',
            label: 'Last Name*',
            placeholder: 'Johnson',
            variant: 'sm:col-span-3',
            maxLength: { value: 30, message: 'Max 30 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'PhoneField',
            name: 'coPhone',
            label: 'Phone*',
            placeholder: '555-555-5555',
            variant: 'sm:col-span-3',
            control: true,
            errors: true,
          },
          {
            component: 'InputField',
            name: 'coEmail',
            label: 'Email*',
            placeholder: 'harryson@gmail.com',
            variant: 'sm:col-span-3',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            pattern: { value: emailReg, message: 'Invalid Email' },
          },
          {
            component: 'DateField',
            name: 'coDateOfBirth',
            label: 'Date of Birth*',
            placeholder: '04/01/1970',
            variant: 'sm:col-span-2',
            control: true,
            rules: {
              value: true,
              message: 'Required',
            },
            validate: (value: any) => isAtLeast18(value) || '18yo or older',
          },
          {
            component: 'InputField',
            name: 'coSsn',
            label: 'SSN*',
            placeholder: '333-11-3333',
            rules: {
              value: true,
              message: 'Required',
            },
            type: 'text',
            variant: 'sm:col-span-2',
            validate: (value: any) => {
              const length = value?.replace(/\D/g, '').length
              if (length < 9) return 'Must be 9 digits'
              return true
            },
            onChange(event: any) {
              event.target.value = formatSSN(event.target.value)
            },
          },
        ],
      },
      {
        title: 'Residence',
        description: "Information about the joint applicant's residence",
        fields: [
          {
            component: 'InputField',
            name: 'coAddressLine1',
            label: 'Street Address*',
            placeholder: '321 Main Ave',
            maxLength: { value: 200, message: 'Max 200 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'InputField',
            name: 'coCity',
            label: 'City*',
            placeholder: 'Miami',
            variant: 'sm:col-span-2',
            maxLength: { value: 30, message: 'Max 30 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'coState',
            label: 'State*',
            variant: 'sm:col-span-2',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            cats: states,
            control: true,
          },
          {
            component: 'InputField',
            name: 'coZipCode',
            label: 'Zipcode*',
            placeholder: '54321',
            variant: 'sm:col-span-2',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            pattern: { value: zipReg, message: 'Invalid Zip' },
          },
          {
            component: 'SelectField',
            name: 'coAddressYears',
            label: 'Time at Address*',
            variant: 'whitespace-nowrap sm:col-span-2',
            rules: {
              value: true,
              message: 'Required',
            },
            cats: timeYears,
            control: true,
          },
          {
            component: 'SelectField',
            name: 'coAddressMonths',
            control: true,
            variant: 'sm:col-span-2 whitespace-nowrap',
            cats: timeMonths,
          },
          {
            component: 'InputField',
            name: 'coRentMortgagePaymentAmount',
            label: 'Monthly Pmt / Rent*',
            placeholder: 'Enter $0, if no Pmt/Rent',
            variant: 'sm:col-span-2 whitespace-nowrap',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            onChange: (e: any) => {
              e.target.value = formatMoney(e.target.value)
            },
          },
          {
            component: 'InputField',
            name: 'prev_coAddressLine1',
            label: 'Street Address*',
            placeholder: '321 Main Ave',
            maxLength: { value: 200, message: 'Max 200 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'InputField',
            name: 'prev_coCity',
            label: 'City*',
            placeholder: 'Miami',
            variant: 'sm:col-span-2',
            maxLength: { value: 30, message: 'Max 30 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'prev_coState',
            label: 'State*',
            variant: 'sm:col-span-2',
            rules: {
              value: true,
              message: 'Required',
            },
            cats: states,
            control: true,
          },
          {
            component: 'InputField',
            name: 'prev_coZipCode',
            label: 'Zipcode*',
            placeholder: '54321',
            variant: 'sm:col-span-2',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            pattern: { value: zipReg, message: 'Invalid Zip' },
          },
          {
            component: 'SelectField',
            name: 'prev_coAddressYears',
            label: 'Time at Address*',
            variant: 'whitespace-nowrap sm:col-span-2',
            rules: {
              value: true,
              message: 'Required',
            },
            cats: timeYears,
            control: true,
          },
          {
            component: 'SelectField',
            name: 'prev_coAddressMonths',
            control: true,
            variant: 'sm:col-span-2 whitespace-nowrap',
            cats: timeMonths,
          },
          {
            component: 'InputField',
            name: 'prev_coRentMortgagePaymentAmount',
            label: 'Monthly Pmt / Rent*',
            placeholder: 'Enter $0, if no Pmt/Rent',
            variant: 'sm:col-span-2 whitespace-nowrap',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            onChange: (e: any) => {
              e.target.value = formatMoney(e.target.value)
            },
          },
        ],
      },
      {
        title: 'Drivers License',
        description: "Information about the joint applicant's drivers license",
        fields: [
          {
            component: 'InputField',
            name: 'coLicenseNumber',
            label: 'License Number*',
            placeholder: '123456789',
            variant: 'sm:col-span-2 whitespace-nowrap',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'coLicenseState',
            label: 'License State*',
            variant: 'sm:col-span-2 whitespace-nowrap',
            control: true,
            cats: states,
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'DateField',
            name: 'coLicenseExp',
            label: 'License Exp*',
            placeholder: '09/30/2026',
            variant: 'sm:col-span-2 whitespace-nowrap',
            control: true,
            rules: {
              value: true,
              message: 'Required',
            },
          },
        ],
      },
      {
        title: 'Employment History',
        description: "Information about the joint applicant's employment history",
        fields: [
          {
            component: 'InputField',
            name: 'coEmployerName',
            label: 'Employer Name*',
            placeholder: 'ABC Company',
            maxLength: { value: 50, message: 'Max 50 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'PhoneField',
            name: 'coEmployerPhone',
            label: 'Employer Phone*',
            placeholder: '713-555-2541',
            control: true,
            variant: 'sm:col-span-3',
            message: 'If unemployed, use your contact number.',
            errors: true,
          },
          {
            component: 'InputField',
            name: 'coEmploymentTitle',
            label: 'Occupation*',
            placeholder: 'Sales Associate',
            variant: 'sm:col-span-3',
            maxLength: { value: 50, message: 'Max 50 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'coTimeOnJobYears',
            label: 'Time on job*',
            variant: 'sm:col-span-2',
            control: true,
            cats: timeYears,
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'coTimeOnJobMonths',
            control: true,
            variant: 'sm:col-span-2',
            cats: timeMonths,
          },
          {
            component: 'InputField',
            name: 'coIncomeAmount',
            label: 'Monthly Income*',
            placeholder: 'Gross Pay, Before Taxes',
            variant: 'sm:col-span-2',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            onChange: (e: any) => {
              e.target.value = formatMoney(e.target.value)
            },
          },
          {
            component: 'InputField',
            name: 'prev_coEmployerName',
            label: 'Employer Name*',
            placeholder: 'ABC Company',
            maxLength: { value: 50, message: 'Max 50 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'PhoneField',
            name: 'prev_coEmployerPhone',
            label: 'Employer Phone*',
            placeholder: '713-555-2541',
            control: true,
            variant: 'sm:col-span-3',
            message: 'If unemployed, use your phone.',
            errors: true,
          },
          {
            component: 'InputField',
            name: 'prev_coEmploymentTitle',
            label: 'Occupation*',
            placeholder: 'Sales Associate',
            variant: 'sm:col-span-3',
            maxLength: { value: 50, message: 'Max 50 chars' },
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'prev_coTimeOnJobYears',
            label: 'Time on job*',
            variant: 'sm:col-span-2',
            control: true,
            cats: timeYears,
            rules: {
              value: true,
              message: 'Required',
            },
          },
          {
            component: 'SelectField',
            name: 'prev_coTimeOnJobMonths',
            control: true,
            variant: 'sm:col-span-2',
            cats: timeMonths,
          },
          {
            component: 'InputField',
            name: 'prev_coIncomeAmount',
            label: 'Monthly Income*',
            placeholder: 'Gross Pay, Before Taxes',
            variant: 'sm:col-span-2 whitespace-nowrap',
            type: 'text',
            rules: {
              value: true,
              message: 'Required',
            },
            onChange: (e: any) => {
              e.target.value = formatMoney(e.target.value)
            },
          },
        ],
      },
    ],
  },
]
