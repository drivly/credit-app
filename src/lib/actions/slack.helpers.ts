import type { CreditApplicant } from 'typings'

export type SlackBlocks = Array<ReturnType<typeof createSlackSection> | { type: 'divider' }>

export function createSlackSection(text: string) {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text,
    },
  }
}

export function formatSlackApplicant(applicant: CreditApplicant, role: 'Primary' | 'Joint') {
  const blocks: SlackBlocks = []
  blocks.push({ type: 'divider' })
  blocks.push(
    createSlackSection(
      `*${role} Applicant:*\n*Full name:* ${applicant.firstName} ${applicant.middleName || ''} ${
        applicant.lastName
      }\n*Phone:* ${applicant.phone} ${applicant.phoneType}\n*Email:* ${
        applicant.email
      }\n*Date of Birth:* ${applicant.dateOfBirth}\n*SSN:* ${applicant.ssn}`
    )
  )
  blocks.push(
    createSlackSection(
      `*Residence*\n*Address:* ${applicant.addressLine1}\n*City:* ${applicant.city}\n*State:* ${
        applicant.state
      }\n*Zip Code:* ${applicant.zipCode}\n*Time at address:* ${applicant.addressYears} yrs ${
        applicant.addressMonths ? applicant.addressMonths + 'mo' : ''
      }\n*Monthly payment/rent:* ${applicant.rentMortgagePaymentAmount}`
    )
  )
  if (Number(applicant.addressYears) < 2) {
    blocks.push(
      createSlackSection(
        `*Previous Residence*\n*Address:* ${applicant.prevAddressLine1}\n*City:* ${
          applicant.prevCity
        }\n*State:* ${applicant.prevState}\n*Zip Code:* ${
          applicant.prevZipCode
        }\n*Time at address:* ${applicant.prevAddressYears} yrs ${
          applicant.prevAddressMonths ? applicant.prevAddressMonths + 'mo' : ''
        }\n*Monthly payment/rent:* ${applicant.prevRentMortgagePaymentAmount}`
      )
    )
  }
  if (applicant.licenseNumber && applicant.licenseState) {
    blocks.push(
      createSlackSection(
        `*Drivers License*\n*License number:* ${applicant.licenseNumber}\n*State:* ${applicant.licenseState}`
      )
    )
  }
  blocks.push(
    createSlackSection(
      `*Employment History*\n*Employer name:* ${applicant.employerName}\n*Employment Status:* ${
        applicant.employmentStatusCode
      }\n*Employer phone:* ${applicant.employerPhone}\n*Occupation:* ${
        applicant.employmentTitle
      }\n*Time on job:* ${applicant.timeOnJobYears} yrs ${
        applicant.timeOnJobMonths ? applicant.timeOnJobMonths + 'mo' : ''
      }\n*Monthly income:* ${applicant.incomeAmount}`
    )
  )
  if (Number(applicant.timeOnJobYears) < 2) {
    blocks.push(
      createSlackSection(
        `*Previous Employment*\n*Employer name:* ${
          applicant.previousEmployerName
        }\n*Employer phone:* ${applicant.prevEmployerPhone}\n*Occupation:* ${
          applicant.prevEmploymentTitle
        }\n*Time on job:* ${applicant.prevTimeOnJobYears} yrs ${
          applicant.prevTimeOnJobMonths ? applicant.prevTimeOnJobMonths + 'mo' : ''
        }\n*Monthly income:* ${applicant.prevIncomeAmount}`
      )
    )
  }
  blocks.push(
    createSlackSection(
      `*Other Income*\n*Description:* ${applicant.otherIncomeSourceDescription}\n*Monthly Amount:* ${applicant.otherIncomeAmount}`
    )
  )
  return blocks
}
