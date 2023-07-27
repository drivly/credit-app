import * as zcta from 'us-zcta-counties'

export const formatApplicant = (vehicle: any, applicant: Record<string, any>) => {
  const addressMonths = Number(applicant.addressMonths) || 0
  const addressYears = Number(applicant.addressYears) || 0

  const prevAddressMonths = Number(applicant?.prevAddressMonths) || 0
  const prevAddressYears = Number(applicant?.prevAddressYears) || 0

  const timeOnJobMonths = Number(applicant.timeOnJobMonths) || 0
  const timeOnJobYears = Number(applicant.timeOnJobYears) || 0
  const prevTimeJobYears = Number(applicant.prevTimeOnJobYears) || 0
  const prevTimeJobMonths = Number(applicant.prevTimeOnJobMonths) || 0

  applicant.rentMortgagePaymentAmount = Number(
    applicant?.rentMortgagePaymentAmount?.replaceAll(/\$|,/g, '')
  )

  const pCounty = zcta.find({ zip: applicant.zipCode })

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
    middleName: applicant?.middleInitial,
    county: pCounty?.county,
    countryCode: 'US',
    // residenceTypeCode: '1', added 1 own 2 rent 3 others
    educationLevelCode: '1',
    incomeIntervalCode: 'MO',
    // otherIncomeSourceCode: otherIncome,
    // form asks for monthly income
    phoneType: 'MOBILE',
    incomeAmount: Number(applicant?.incomeAmount?.replaceAll(/\$|,/g, '')),
    phone: applicant?.phone?.slice(2),
    employerPhone: applicant?.employerPhone?.slice(2),
    ssn: applicant?.ssn?.replaceAll('-', ''),
  }

  const fieldsToDelete = [
    'monthlyIncome',
    'middleInitial',
    'addressYears',
    'addressMonths',
    'timeOnJobYears',
    'timeOnJobMonths',
    'agree',
    'licenseNumber',
    'licenseState',
    'licenseExp',
    'prev_timeOnJobYears',
    'prev_timeOnJobMonths',
    'prev_employerPhone',
    'prev_employmentTitle',
    'prev_monthlyIncome',
    'year',
    'make',
    'model',
    'price',
    'vin',
  ]

  fieldsToDelete.forEach((field) => delete formattedApp[field])

  return { app: formattedApp, vin: [vehicle?.Vin] }
}
