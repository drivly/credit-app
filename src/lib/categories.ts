export interface CategoryType {
  value: string
  optionName: string
}

const defaultCats = ['Select', 'Years', 'Months']

export const states: CategoryType[] = [
  {
    value: '',
    optionName: 'Select',
  },
  {
    value: 'AK',
    optionName: 'AK',
  },
  {
    value: 'AZ',
    optionName: 'AZ',
  },
  {
    value: 'AR',
    optionName: 'AR',
  },
  {
    value: 'CA',
    optionName: 'CA',
  },
  {
    value: 'CO',
    optionName: 'CO',
  },
  {
    value: 'CT',
    optionName: 'CT',
  },
  {
    value: 'DE',
    optionName: 'DE',
  },
  {
    value: 'DC',
    optionName: 'DC',
  },
  {
    value: 'FL',
    optionName: 'FL',
  },
  {
    value: 'GA',
    optionName: 'GA',
  },
  {
    value: 'HI',
    optionName: 'HI',
  },
  {
    value: 'ID',
    optionName: 'ID',
  },
  {
    value: 'IL',
    optionName: 'IL',
  },
  {
    value: 'IN',
    optionName: 'IN',
  },
  {
    value: 'IA',
    optionName: 'IA',
  },
  {
    value: 'KS',
    optionName: 'KS',
  },
  {
    value: 'KY',
    optionName: 'KY',
  },
  {
    value: 'LA',
    optionName: 'LA',
  },
  {
    value: 'ME',
    optionName: 'ME',
  },
  {
    value: 'MD',
    optionName: 'MD',
  },
  {
    value: 'MA',
    optionName: 'MA',
  },
  {
    value: 'MI',
    optionName: 'MI',
  },
  {
    value: 'MN',
    optionName: 'MN',
  },
  {
    value: 'MS',
    optionName: 'MS',
  },
  {
    value: 'MO',
    optionName: 'MO',
  },
  {
    value: 'MT',
    optionName: 'MT',
  },
  {
    value: 'NE',
    optionName: 'NE',
  },
  {
    value: 'NV',
    optionName: 'NV',
  },
  {
    value: 'NH',
    optionName: 'NH',
  },
  {
    value: 'NJ',
    optionName: 'NJ',
  },
  {
    value: 'NM',
    optionName: 'NM',
  },
  {
    value: 'NY',
    optionName: 'NY',
  },
  {
    value: 'NC',
    optionName: 'NC',
  },
  {
    value: 'ND',
    optionName: 'ND',
  },
  {
    value: 'OH',
    optionName: 'OH',
  },
  {
    value: 'OK',
    optionName: 'OK',
  },
  {
    value: 'OR',
    optionName: 'OR',
  },
  {
    value: 'PA',
    optionName: 'PA',
  },
  {
    value: 'RI',
    optionName: 'RI',
  },
  {
    value: 'SC',
    optionName: 'SC',
  },
  {
    value: 'SD',
    optionName: 'SD',
  },
  {
    value: 'TN',
    optionName: 'TN',
  },
  {
    value: 'TX',
    optionName: 'TX',
  },
  {
    value: 'UT',
    optionName: 'UT',
  },
  {
    value: 'VT',
    optionName: 'VT',
  },
  {
    value: 'VA',
    optionName: 'VA',
  },
  {
    value: 'WA',
    optionName: 'WA',
  },
  {
    value: 'WV',
    optionName: 'WV',
  },
  {
    value: 'WI',
    optionName: 'WI',
  },
  {
    value: 'WY',
    optionName: 'WY',
  },
]

export const timeYears: CategoryType[] = [
  {
    value: '',
    optionName: 'Years',
  },
  { optionName: 'Less than 1 year', value: '0' },
  { optionName: '1 year', value: '1' },
  { optionName: '2 years', value: '2' },
  { optionName: '3 years', value: '3' },
  { optionName: '4 years', value: '4' },
  { optionName: '5 years', value: '5' },
  { optionName: '6 years', value: '6' },
  { optionName: '7 years', value: '7' },
  { optionName: '8 years', value: '8' },
  { optionName: '9 years', value: '9' },
  { optionName: '10 years+', value: '10+' },
]

export const timeMonths: CategoryType[] = [
  {
    value: '',
    optionName: 'Months',
  },
  { optionName: 'Less than 1 month', value: '0' },
  { optionName: '1 month', value: '1' },
  { optionName: '2 months', value: '2' },
  { optionName: '3 months', value: '3' },
  { optionName: '4 months', value: '4' },
  { optionName: '5 months', value: '5' },
  { optionName: '6 months', value: '6' },
  { optionName: '7 months', value: '7' },
  { optionName: '8 months', value: '8' },
  { optionName: '9 months', value: '9' },
  { optionName: '10 months', value: '10' },
  { optionName: '11 months', value: '11' },
]

export const jobStatus: CategoryType[] = [
  {
    value: '',
    optionName: 'Select',
  },
  { optionName: 'Full Time', value: 'Full Time' },
  { optionName: 'Military', value: 'Military' },
  { optionName: 'Contract', value: 'Contract' },
  { optionName: 'Part Time', value: 'Part Time' },
  { optionName: 'Temporary', value: 'Temporary' },
  { optionName: 'Seasonal', value: 'Seasonal' },
  { optionName: 'Self Employed', value: 'Self Employed' },
  { optionName: 'Retired', value: 'Retired' },
  { optionName: 'Not Applicable', value: 'Not Applicable' },
]

export const otherIncomeSources: CategoryType[] = [
  {
    value: '',
    optionName: 'Select',
  },
  {
    value: 'AIDDEPCHILD',
    optionName: 'Aid for Dependent Children',
  },
  {
    value: 'CHILDSUPPORT',
    optionName: 'Child Support',
  },
  {
    value: 'COLA',
    optionName: 'Cost of Living Allowance (COLA)',
  },
  {
    value: 'DISABILITY',
    optionName: 'Disability',
  },
  {
    value: 'FSSA',
    optionName: 'Family Subsistence Supplemental Allowance (FSSA)',
  },
  {
    value: 'HOUSINGALLOW',
    optionName: 'Housing Allowances',
  },
  {
    value: 'MILITARYBAS',
    optionName: 'Military Basic Allowance for Subsistence (BAS)',
  },
  {
    value: 'MUNBONDINT',
    optionName: 'Municipal Bond Interest',
  },
  {
    value: 'NONTAXINCOME',
    optionName: 'Other Non-Taxable Sources of Income',
  },
  {
    value: 'OTHCSTM',
    optionName: 'Other',
  },
  {
    value: 'PUBLICASST',
    optionName: 'Public Assistance',
  },
  {
    value: 'RAILPENSION',
    optionName: 'Railroad Pension',
  },
  {
    value: '2NDEMPLOYER',
    optionName: 'Second Employer',
  },
  {
    value: 'SOCSECBEN',
    optionName: 'Social Security Benefits',
  },
  {
    value: 'WORKMANCOMP',
    optionName: "Workman's Compensation",
  },
]
let con = 'Customer Other Income Source'
