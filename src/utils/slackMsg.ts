import { CoApplicant, PrimaryApplicant, VehicleOfInterest } from '../../typings'
import formatDate from './formatDate'

interface SlackMsgRequest {
  url: string | undefined
  data: {
    primary: PrimaryApplicant
    secondary: PrimaryApplicant
    vehicle: VehicleOfInterest
  }
}

export async function slackMsgRequest({ url, data }: SlackMsgRequest) {
  const date = formatDate(new Date(), true)

  const blocks = []

  for (const key in data) {
    if (key === 'primary') {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*CREDIT APP* REQUEST ${date} :rocket:\n* ${data.primary.firstName} ${data.primary.lastName} | ${data.primary.email}*`,
        },
      })
      blocks.push({
        type: 'divider',
      })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Primary Applicant:*\n*Full name:* ${data.primary.firstName} ${
            data.primary?.middleName || ''
          } ${data.primary.lastName}\n*Phone:* ${data.primary.phone} ${
            data.primary.phoneType
          }\n*Email:* ${data.primary.email}\n*Date of Birth:* ${data.primary.dateOfBirth}\n*SSN:* ${
            data.primary.ssn
          }`,
        },
      })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Residence*\n*Address:* ${data.primary.addressLine1} \n*City:* ${
            data.primary.city
          }\n*State:* ${data.primary.state}\n*Zip Code:* ${
            data.primary.zipCode
          }\n*Time at address:* ${data.primary.addressYears} yrs ${
            data.primary.addressMonths ? data.primary.addressMonths + 'mo' : ''
          }\n*Monthly payment/rent:* ${data.primary.rentMortgagePaymentAmount}`,
        },
      })
      Number(data.primary.addressYears) < 2 &&
        blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Previous Residence*\n*Address:* ${data.primary.prevAddressLine1} \n*City:* ${
              data.primary.prevCity
            }\n*State:* ${data.primary.prevState}\n*Zip Code:* ${
              data.primary.zipCode
            }\n*Time at address:* ${data.primary.prevAddressYears} yrs ${
              data.primary.prevAddressMonths ? data.primary.prevAddressMonths + 'mo' : ''
            }\n*Monthly payment/rent:* ${data.primary.prevRentMortgagePaymentAmount}`,
          },
        })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Drivers License*\n*License number:* ${data.primary.licenseNumber} \n*State:* ${data.primary.licenseState}\n*Expiration:* ${data.primary.licenseExp}`,
        },
      })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Employment History*\n*Employer name:* ${
            data.primary.employerName
          }\n*Employment Status:* ${data.primary.employmentStatusCode}\n*Employer phone:* ${
            data.primary.employerPhone
          }\n*Occupation:* ${data.primary.employmentTitle}\n*Time on job:* ${
            data.primary.timeOnJobYears
          } yrs ${
            data.primary.timeOnJobMonths ? data.primary.timeOnJobMonths + 'mo' : ''
          }\n*Monthly income:* ${data.primary.incomeAmount}`,
        },
      })
      Number(data.primary.timeOnJobYears) < 2 &&
        blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Previous Employment*\n*Employer name:* ${
              data.primary.previousEmployerName
            }\n*Employer phone:* ${data.primary.prevEmployerPhone}\n*Occupation:* ${
              data.primary.prevEmploymentTitle
            }\n*Time on job:* ${data.primary.prevTimeOnJobYears} yrs ${
              data.primary.prevTimeOnJobMonths ? data.primary.prevTimeOnJobMonths + 'mo' : ''
            }\n*Monthly income:* ${data.primary.prevIncomeAmount}`,
          },
        })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Other Incomet*\n*Description:* ${data.primary?.otherIncomeSourceDescription}\n*Monthly Amount:* ${data.primary?.otherIncomeAmount}\n`,
        },
      })
    } else if (key === 'secondary') {
      blocks.push({
        type: 'divider',
      })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Joint Applicant:*\n*Full name:* ${data.secondary.firstName} ${data.secondary?.middleName} ${data.secondary.lastName}\n*Phone:* ${data.secondary.phone} ${data.secondary.phoneType}\n*Email:* ${data.secondary.email}\n*Date of birth:* ${data.secondary.dateOfBirth} \n*SSN:* ${data.secondary.ssn}`,
        },
      })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Residence*\n*Address:* ${data.secondary.addressLine1} \n*City:* ${
            data.secondary.city
          }\n*State:* ${data.secondary.state}*Zip Code:* ${
            data.secondary.zipCode
          }\n*Time at address:* ${data.secondary.addressYears} yrs ${
            data.secondary.addressMonths ? data.secondary.addressMonths + 'mo' : ''
          }\n*Monthly payment/rent:* ${data.secondary.rentMortgagePaymentAmount}`,
        },
      })
      Number(data.secondary.addressYears) < 2 &&
        blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Previous Residence*\n*Address:* ${data.secondary.prevAddressLine1} \n*City:* ${
              data.secondary.prevCity
            }\n*State:* ${data.secondary.prevState}\n*Zip Code:* ${
              data.secondary.prevZipCode
            }\n*Time at address:* ${data.secondary.prevAddressYears} yrs ${
              data.secondary.prevAddressMonths ? data.secondary.prevAddressMonths + 'mo' : ''
            }\n*Monthly payment/rent:* ${data.secondary.prevRentMortgagePaymentAmount}`,
          },
        })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Drivers License*\n*License number:* ${data.secondary.licenseNumber} \n*State:* ${data.secondary.licenseState}\n*Expiration:* ${data.secondary.licenseExp}`,
        },
      })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Employment History*\n*Employer name:* ${
            data.secondary.employerName
          }\n*Employment Status:* ${data.secondary.employmentStatusCode}\n*Employer phone:* ${
            data.secondary.employerPhone
          }\n*Occupation:* ${data.secondary.employmentTitle}\n*Time on job:* ${
            data.secondary.timeOnJobYears
          } yrs ${
            data.secondary.timeOnJobMonths ? data.secondary.timeOnJobMonths + 'mo' : ''
          }\n*Monthly income:* ${data.secondary.incomeAmount}`,
        },
      })
      Number(data.secondary.timeOnJobYears) < 2 &&
        blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Previous Employment*\n*Employer name:* ${
              data.secondary.previousEmployerName
            }\n*Employer phone:* ${data.secondary.prevEmployerPhone}\n*Occupation:* ${
              data.secondary.prevEmploymentTitle
            }\n*Time on job:* ${data.secondary.prevTimeOnJobYears} yrs ${
              data.secondary.prevTimeOnJobMonths ? data.secondary.prevTimeOnJobMonths + 'mo' : ''
            }\n*Monthly income:* ${data.secondary.prevIncomeAmount}`,
          },
        })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Other Incomet*\n*Description:* ${data.secondary?.otherIncomeSourceDescription}\n*Monthly Amount:* ${data.secondary?.otherIncomeAmount}\n`,
        },
      })
    } else if (key === 'vehicle') {
      blocks.push({
        type: 'divider',
      })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Vehicle of Interest*\n*VIN:* ${data.vehicle.Vin}\n*Year:* ${data.vehicle.ModelYear}\n*Make:* ${data.vehicle.Make}\n*Model:* ${data.vehicle.Model}\n*Odometer:* ${data.vehicle.Mileage}\n*Price:* ${data.vehicle.Price}`,
        },
      })
    }
  }

  await fetch(url!, {
    method: 'POST',
    body: JSON.stringify({ blocks }),
    headers: { 'Content-Type': 'application/json' },
  })
}
