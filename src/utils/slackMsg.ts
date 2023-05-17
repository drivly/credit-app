import { CoApplicant, PrimaryApplicant, VehicleOfInterest } from '../../typings'
import formatDate from './formatDate'

interface SlackMsgRequest {
  url: string | undefined
  data: {
    primary: PrimaryApplicant
    secondary: CoApplicant
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
            data.primary?.middleInitial || ''
          } ${data.primary.lastName}\n*Phone:* ${data.primary.phone}\n*Email:* ${
            data.primary.email
          }\n*Date of Birth:* ${data.primary.dateOfBirth}\n*SSN:* ${data.primary.ssn}`,
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
            text: `*Previous Residence*\n*Address:* ${data.primary.prev_addressLine1} \n*City:* ${
              data.primary.prev_city
            }\n*State:* ${data.primary.prev_state}\n*Zip Code:* ${
              data.primary.zipCode
            }\n*Time at address:* ${data.primary.prev_addressYears} yrs ${
              data.primary.prev_addressMonths ? data.primary.prev_addressMonths + 'mo' : ''
            }\n*Monthly payment/rent:* ${data.primary.prev_rentMortgagePaymentAmount}`,
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
          }\n*Employer phone:* ${data.primary.employerPhone}\n*Occupation:* ${
            data.primary.employmentTitle
          }\n*Time on job:* ${data.primary.timeOnJobYears} yrs ${
            data.primary.timeOnJobMonths ? data.primary.timeOnJobMonths + 'mo' : ''
          }\n*Monthly income:* ${data.primary.monthlyIncome}`,
        },
      })
      Number(data.primary.timeOnJobYears) < 2 &&
        blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Previous Employment*\n*Employer name:* ${
              data.primary.prev_employerName
            }\n*Employer phone:* ${data.primary.prev_employerPhone}\n*Occupation:* ${
              data.primary.prev_employmentTitle
            }\n*Time on job:* ${data.primary.prev_timeOnJobYears} yrs ${
              data.primary.prev_timeOnJobMonths ? data.primary.prev_timeOnJobMonths + 'mo' : ''
            }\n*Monthly income:* ${data.primary.prev_monthlyIncome}`,
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
          text: `*Joint Applicant:*\n*Full name:* ${data.secondary.coFirstName} ${data.secondary?.coMiddleInitial} ${data.secondary.coLastName}\n*Phone:* ${data.secondary.coPhone}\n*Email:* ${data.secondary.coEmail}\n*Date of birth:* ${data.secondary.coDateOfBirth} \n*SSN:* ${data.secondary.coSsn}`,
        },
      })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Residence*\n*Address:* ${data.secondary.coAddressLine1} \n*City:* ${
            data.secondary.coCity
          }\n*State:* ${data.secondary.coState}*Zip Code:* ${
            data.secondary.coZipCode
          }\n*Time at address:* ${data.secondary.coAddressYears} yrs ${
            data.secondary.coAddressMonths ? data.secondary.coAddressMonths + 'mo' : ''
          }\n*Monthly payment/rent:* ${data.secondary.coRentMortgagePaymentAmount}`,
        },
      })
      Number(data.secondary.coAddressYears) < 2 &&
        blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Previous Residence*\n*Address:* ${
              data.secondary.prev_coAddressLine1
            } \n*City:* ${data.secondary.prev_coCity}\n*State:* ${
              data.secondary.prev_coState
            }\n*Zip Code:* ${data.secondary.prev_coZipCode}\n*Time at address:* ${
              data.secondary.prev_coAddressYears
            } yrs ${
              data.secondary.prev_coAddressMonths ? data.secondary.prev_coAddressMonths + 'mo' : ''
            }\n*Monthly payment/rent:* ${data.secondary.prev_coRentMortgagePaymentAmount}`,
          },
        })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Drivers License*\n*License number:* ${data.secondary.coLicenseNumber} \n*State:* ${data.secondary.coLicenseState}\n*Expiration:* ${data.secondary.coLicenseExp}`,
        },
      })
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Employment History*\n*Employer name:* ${
            data.secondary.coEmployerName
          }\n*Employer phone:* ${data.secondary.coEmployerPhone}\n*Occupation:* ${
            data.secondary.coEmploymentTitle
          }\n*Time on job:* ${data.secondary.coTimeOnJobYears} yrs ${
            data.secondary.coTimeOnJobMonths ? data.secondary.coTimeOnJobMonths + 'mo' : ''
          }\n*Monthly income:* ${data.secondary.coMonthlyIncome}`,
        },
      })
      Number(data.secondary.coTimeOnJobYears) < 2 &&
        blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Previous Employment*\n*Employer name:* ${
              data.secondary.prev_coEmployerName
            }\n*Employer phone:* ${data.secondary.prev_coEmployerPhone}\n*Occupation:* ${
              data.secondary.prev_coEmploymentTitle
            }\n*Time on job:* ${data.secondary.prev_coTimeOnJobYears} yrs ${
              data.secondary.prev_coTimeOnJobMonths
                ? data.secondary.prev_coTimeOnJobMonths + 'mo'
                : ''
            }\n*Monthly income:* ${data.secondary.prev_coMonthlyIncome}`,
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
