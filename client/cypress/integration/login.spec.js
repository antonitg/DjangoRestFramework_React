/* eslint-disable no-undef */
describe('Test Login', () => {
    it('Login!', () => {
        cy.visit('http://localhost:3000/auth')
        cy.get('#floatingInput[name="username"]').type('UserTest')
        cy.get('.brprimary #floatingPassword[name="password"]').type('@TestPassword123')
        cy.get('.brprimary .pprimary').click()
        cy.url().should('eq', 'http://localhost:3000/')
    })
})