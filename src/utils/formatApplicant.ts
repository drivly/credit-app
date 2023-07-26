import * as zcta from 'us-zcta-counties'

export const formatApplicant = (vehicle: any, applicant: Record<string, any>) => {
  const addressMonths = Number(applicant.addressMonths) || 0
  const addressYears = Number(applicant.addressYears) || 0
  const timeOnJobMonths = Number(applicant.timeOnJobMonths) || 0
  const timeOnJobYears = Number(applicant.timeOnJobYears) || 0
  const prevTimeJobYears = Number(applicant.prev_timeOnJobYears) || 0
  const prevTimeJobMonths = Number(applicant.prev_timeOnJobMonths) || 0

  applicant.rentMortgagePaymentAmount = Number(
    applicant?.rentMortgagePaymentAmount?.replaceAll(/\$|,/g, '')
  )

  const pCounty = zcta.find({ zip: applicant.zipCode })

  const pAddressMonths = addressYears * 12 + addressMonths
  const pJobMonths = timeOnJobYears * 12 + timeOnJobMonths
  const prevJobMonths = prevTimeJobYears * 12 + prevTimeJobMonths

  const formattedApp: Record<string, any> = {
    ...applicant,
    employmentStatusCode: 'Full Time',
    employmentTypeCode: applicant.employmentTitle,
    monthsAtAddress: pAddressMonths,
    monthsOnJob: pJobMonths,
    previousMonthsOnJob: prevJobMonths,
    middleName: applicant?.middleInitial,
    county: pCounty?.county,
    countryCode: 'US',
    // residenceTypeCode: '1', added 1 own 2 rent 3 others
    educationLevelCode: '1',
    incomeIntervalCode: 'MO', // form asks for monthly income
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
  ]

  fieldsToDelete.forEach((field) => delete formattedApp[field])

  return { app: formattedApp, vin: [vehicle?.Vin] }
}
