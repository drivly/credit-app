describe('Primary with Trade Credit App', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('The page contains Credit Application', () => {
    cy.get('h1').contains('Credit Application')
  })

  it('the page contains Primary Applicant', () => {
    cy.get('h2').contains('Primary Applicant')
  })

  it('completes Primary Applicant with Trade Information', () => {
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

    // // Vehicle of Interest
    // cy.getInput('vehicleVin')
    //   .type('1C4RJFBG2MC686287')
    //   .then(() => {
    //     cy.getInput('vehicleYear').should('have.value', 2021)
    //   })
    // cy.getInput('vehicleCashDown').type('1000')
    // cy.getInput('vehiclePrice').type('20000')
    // cy.getInput('vehicleMileage').type('10000')

    // Trade-In Vehicle
    // cy.getInput('tradeInVehicleIndicator').check('Y')
    // cy.getInput('tradeInVin')
    //   .type('YV1LS5729V1356440')
    //   .then(() => {
    //     cy.getInput('tradeInYear').should(($input) => {
    //       expect($input).to.have.value('1997')
    //     })
    //   })
    // cy.getInput('tradeInLienIndicator').check('Y')
    // cy.getSelect('tradeInLienHoldername')
    //   .select('Payoff Quote Test')
    //   .then(() => {
    //     cy.getInput('tradeInGrossPayOffAmount').should(($input) => {
    //       expect($input).to.have.value('9887.21')
    //     })
    //   })

    // // Agreement
    // cy.getInput('agree').check('YES')

    // cy.get('button[type="submit"]').click()
  })
})
