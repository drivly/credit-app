export interface VehicleOfInterest {
  modelYear: string
  make: string
  model: string
  price: string
  mileage: string
  vin: string
  cashDown: string
}
export interface PrimaryApplicant {
  employedPrimary: string
  firstName: string
  middleName: string
  lastName: string
  phone: string
  phoneType: string
  email: string
  dateOfBirth: string
  ssn: string
  addressLine1: string
  city: string
  state: string
  zipCode: string
  addressYears: string
  addressMonths: string
  rentMortgagePaymentAmount: string
  licenseNumber: string
  licenseState: string
  licenseExp: string
  employerName: string
  employmentStatusCode: string
  employerPhone: string
  employmentTitle: string
  timeOnJobYears: string
  timeOnJobMonths: string
  incomeAmount: string
  previousEmployerName: string
  prevEmployerPhone: string
  prevEmploymentTitle: string
  prevTimeOnJobYears: string
  prevTimeOnJobMonths: string
  prevIncomeAmount: string
  prevAddressLine1: string
  prevCity: string
  prevState: string
  prevZipCode: string
  prevAddressYears: string
  prevAddressMonths: string
  prevRentMortgagePaymentAmount: string
  otherIncomeSourceCode: string
  otherIncomeAmount: string
  otherIncomeSourceDescription: string
}

export interface CoApplicant {
  employedJoint: string
  co_firstName: string
  co_middleName: string
  co_lastName: string
  co_phone: string
  co_phoneType: string
  co_email: string
  co_dateOfBirth: string
  co_ssn: string
  co_addressLine1: string
  co_city: string
  co_state: string
  co_zipCode: string
  co_addressYears: string
  co_addressMonths: string
  co_rentMortgagePaymentAmount: string
  co_licenseNumber: string
  co_licenseState: string
  co_licenseExp: string
  co_employerName: string
  co_employmentStatusCode: string
  co_employerPhone: string
  co_employmentTitle: string
  co_timeOnJobYears: string
  co_timeOnJobMonths: string
  co_monthlyIncome: string
  co_previousEmployerName: string
  co_prevEmployerPhone: string
  co_prevEmploymentTitle: string
  co_prevTimeOnJobYears: string
  co_prevTimeOnJobMonths: string
  co_prevIncomeAmount: string
  co_prevAddressLine1: string
  co_prevCity: string
  co_prevState: string
  co_prevZipCode: string
  co_prevAddressYears: string
  co_prevAddressMonths: string
  co_prevRentMortgagePaymentAmount: string
  co_otherIncomeSourceCode: string
  co_otherIncomeAmount: string
  co_otherIncomeSourceDescription: string
}
