import * as zcta from 'us-zcta-counties'

export const formatApplicant = (applicant: Record<string, any>) => {
  const addressMonths = Number(applicant?.addressMonths) || 0
  const addressYears = Number(applicant.addressYears) || 0

  const prevAddressMonths = Number(applicant?.prevAddressMonths) || 0
  const prevAddressYears = Number(applicant?.prevAddressYears) || 0

  const timeOnJobMonths = Number(applicant?.timeOnJobMonths) || 0
  const timeOnJobYears = Number(applicant.timeOnJobYears) || 0
  const prevTimeJobYears = Number(applicant?.prevTimeOnJobYears) || 0
  const prevTimeJobMonths = Number(applicant?.prevTimeOnJobMonths) || 0

  applicant.rentMortgagePaymentAmount = Number(
    applicant?.rentMortgagePaymentAmount?.replaceAll(/\$|,/g, '')
  )
  applicant.prevRentMortgagePaymentAmount =
    Number(applicant?.prevRentMortgagePaymentAmount?.replaceAll(/\$|,/g, '')) || 0

  applicant.prevIncomeAmount = Number(applicant?.prevIncomeAmount?.replaceAll(/\$|,/g, '')) || 0

  const pCounty = zcta.find({ zip: applicant.zipCode })

  console.log('pCounty', pCounty)
  const currentAddressMonths = addressYears * 12 + addressMonths
  const previousAddressMonths = prevAddressYears * 12 + prevAddressMonths
  const currentJobMonths = timeOnJobYears * 12 + timeOnJobMonths
  const prevJobMonths = prevTimeJobYears * 12 + prevTimeJobMonths

  const formattedApp: Record<string, any> = {
    ...applicant,
    employmentTypeCode: applicant.employmentTitle,
    monthsAtAddress: currentAddressMonths,
    monthsOnJob: currentJobMonths,
    previousMonthsOnJob: prevJobMonths,
    prevMonthsAtAddress: previousAddressMonths,

    county: pCounty?.county,
    countryCode: 'US',
    // residenceTypeCode: '1', added 1 own 2 rent 3 others
    educationLevelCode: '',
    incomeIntervalCode: 'MO',
    // otherIncomeSourceCode: otherIncome,
    // form asks for monthly income
    incomeAmount: Number(applicant?.incomeAmount?.replaceAll(/\$|,/g, '')),
    otherIncomeAmount: Number(applicant?.otherIncomeAmount?.replaceAll(/\$|,/g, '')),
    phone: parsePhoneNumber(applicant?.phone),
    employerPhone: parsePhoneNumber(applicant?.employerPhone),
    prevEmployerPhone:
      (applicant?.prevEmployerPhone && parsePhoneNumber(applicant?.prevEmployerPhone)) || '',
    ssn: applicant?.ssn?.replaceAll('-', ''),
  }

  const fieldsToDelete = [
    'addressYears',
    'addressMonths',
    'prevAddressMonths',
    'prevAddressYears',
    'timeOnJobYears',
    'timeOnJobMonths',
    'prevTimeOnJobYears',
    'prevTimeOnJobMonths',
    'agree',
    // 'licenseNumber',
    // 'licenseState',
    // 'licenseExp',
    // 'prevEmployerPhone',
    // 'prevIncomeAmount',
    'coEmployedJoint',
    'year',
    'make',
    'model',
    'price',
    'vin',
  ]

  fieldsToDelete.forEach((field) => delete formattedApp[field])

  return { app: formattedApp }
}

const parsePhoneNumber = (formattedPhoneNumber: string) => {
  return formattedPhoneNumber.replace(/\D/g, '')
}
