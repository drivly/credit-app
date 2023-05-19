import * as zcta from 'us-zcta-counties'

export const formatPrimaryApp = (data: any) => {
  const { primary, vehicle } = data

  const addressMonths = Number(primary.addressMonths) || 0
  const addressYears = Number(primary.addressYears) || 0
  const timeOnJobMonths = Number(primary.timeOnJobMonths) || 0
  const timeOnJobYears = Number(primary.timeOnJobYears) || 0
  const prevTimeJobYears = Number(primary.prev_timeOnJobYears) || 0
  const prevTimeJobMonths = Number(primary.prev_timeOnJobMonths) || 0

  primary.rentMortgagePaymentAmount = Number(
    primary?.rentMortgagePaymentAmount?.replaceAll(/\$|,/g, '')
  )

  const pCounty = zcta.find({ zip: primary.zipCode })

  const pAddressMonths = addressYears * 12 + addressMonths
  const pJobMonths = timeOnJobYears * 12 + timeOnJobMonths
  const prevJobMonths = prevTimeJobYears * 12 + prevTimeJobMonths

  const formattedPrimary = {
    ...primary,
    employmentStatusCode: 'Full Time',
    employmentTypeCode: primary.employmentTitle,
    monthsAtAddress: pAddressMonths,
    monthsOnJob: pJobMonths,
    previousMonthsOnJob: prevJobMonths,
    middleName: primary?.middleInitial,
    county: pCounty?.county,
    countryCode: 'US',
    residenceTypeCode: '1',
    educationLevelCode: '1',
    incomeIntervalCode: 'MO',
    phoneType: 'MOBILE',
    incomeAmount: Number(primary?.incomeAmount?.replaceAll(/\$|,/g, '')),
    phone: primary?.phone?.slice(2),
    employerPhone: primary?.employerPhone?.slice(2),
    ssn: primary?.ssn?.replaceAll('-', ''),
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

  fieldsToDelete.forEach((field) => delete formattedPrimary[field])

  return { primary: formattedPrimary, vin: [vehicle.Vin] }
}
