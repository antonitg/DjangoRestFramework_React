/// <reference types="cypress" />

it('plena el forumulari i fa click en el login va a pricing i comprova els diners', () => {
    cy.visit('http://localhost:3000/auth')
    cy.get(':nth-child(1) > #floatingInput').type('ginerbo')
    cy.get(':nth-child(2) > #floatingPassword').type('@Antoni123')
    cy.get(':nth-child(1) > .row > .col > #form1 > form > .form-data > .mb-3 > .pprimary').click()
    cy.get(':nth-child(3) > .nav-link').click()
    cy.get('.mr-2').contains('101.75€')
  })