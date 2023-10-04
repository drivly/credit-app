describe('Primary with CoBuyer Credit App', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('The page contains Credit Application', () => {
    cy.get('h1').contains('Credit Application')
  })

  it('the page contains Primary Applicant', () => {
    cy.get('h2').contains('Primary Applicant')
  })

  it('completes Primary + Cobuyer information', () => {
    // Primary Personal Information
    cy.getInput('firstName').type('John')
    cy.getInput('middleName').type('Q')
    cy.getInput('lastName').type('Doe')
    cy.getInput('email').type('johndoe@gmail.com')
    cy.getSelect('phoneType').select('HOME')
    cy.getInput('phone').type('5615551212')
    cy.getInput('dateOfBirth').type('01/01/1990')
    cy.getInput('ssn').type('123456789')

    // Primary Address
    cy.getInput('residenceTypeCode').check('1')
    cy.getInput('addressLine1').type('123 Main St')
    cy.getInput('addressLine2').type('Apt 1')
    cy.getInput('city').type('Boca Raton')
    cy.getSelect('state').select('FL')
    cy.getInput('zipCode').type('33487')
    cy.getSelect('addressYears').select('5')
    cy.getSelect('addressMonths').select('5')
    cy.getInput('rentMortgagePaymentAmount').type('1000')

    // Primary Driver's License
    cy.getInput('licenseNumber').type('FL1234567')
    cy.getSelect('licenseState').select('FL')

    // Primary Employment Information
    cy.getSelect('employmentStatusCode').select('Part Time')
    cy.getInput('employerName').type('ABC Company')
    cy.getInput('employerPhone').type('5615551212')
    cy.getInput('employmentTitle').type('BUN Dev')
    cy.getSelect('timeOnJobYears').select('2')
    cy.getSelect('timeOnJobMonths').select('5')
    cy.getInput('incomeAmount').type('5000')

    // Primary Other Income
    cy.getInput('otherIncomeSourceCode').check('OTHCSTM')
    cy.getInput('otherIncomeAmount').type('1000')
    cy.getInput('otherIncomeSourceDescription').type('Laborer')

    cy.getInput('joint').check()
    // Cobuyer Personal Information
    cy.getInput('co_firstName').type('John')
    cy.getInput('co_middleName').type('Q')
    cy.getInput('co_lastName').type('Doe')
    cy.getInput('co_email').type('johndoe@gmail.com')
    cy.getSelect('co_phoneType').select('HOME')
    cy.getInput('co_phone').type('5615551212')
    cy.getInput('co_dateOfBirth').type('01/01/1990')
    cy.getInput('co_ssn').type('123456789')

    // Cobuyer Address
    cy.getInput('sameAddress').check()

    // Cobuyer Driver's License
    cy.getInput('co_licenseNumber').type('FL1234567')
    cy.getSelect('co_licenseState').select('FL')

    // Cobuyer Employment Information
    cy.getSelect('co_employmentStatusCode').select('Part Time')
    cy.getInput('co_employerName').type('ABC Company')
    cy.getInput('co_employerPhone').type('5615551212')
    cy.getInput('co_employmentTitle').type('BUN Dev')
    cy.getSelect('co_timeOnJobYears').select('2')
    cy.getSelect('co_timeOnJobMonths').select('5')
    cy.getInput('co_incomeAmount').type('5000')

    // Cobuyer Other Income
    cy.getInput('co_otherIncomeSourceCode').check('OTHCSTM')
    cy.getInput('co_otherIncomeAmount').type('1000')
    cy.getInput('co_otherIncomeSourceDescription').type('Laborer')

    // Vehicle of Interest
    cy.getInput('vehicleVin')
      .type('1G6KF5RS9HU110366')
      .then(() => {
        cy.getInput('vehicleYear').should('have.value', 2017)
      })
    cy.getInput('vehicleCashDown').type('1000')
    cy.getInput('vehiclePrice').type('20000')
    cy.getInput('vehicleMileage').type('10000')

    // Trade-In Vehicle
    cy.getInput('tradeInVehicleIndicator').check()

    // Agreement
    cy.getInput('agree').check('YES')

    // cy.get('button[type="submit"]').click()
  })
})
