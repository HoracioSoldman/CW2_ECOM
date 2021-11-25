/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:3000')
      cy.get('.option').contains('SIGN IN').click()
    })

    it('displays login form and fail to login with a fake email', ()=>{
        cy.wait(3000)

        cy.get('#email-input')
        .type('anything@gmail.com').should('have.value', 'anything@gmail.com')

        cy.get('#pwd-input')
        .type('anything').should('have.value', 'anything')

        cy.get('#submit-button').click()
        
        cy.wait(1000)

        cy.get('.danger').contains('Invalid email!')
        
    })

    it('dthe login should be successful with a valid credential', ()=>{
        cy.wait(3000)

        cy.get('#email-input')
        .type('hsoldman@gmail.com').should('have.value', 'hsoldman@gmail.com')

        cy.get('#pwd-input')
        .type('soldman').should('have.value', 'soldman')

        cy.get('#submit-button').click()
        
        cy.wait(2000)

        cy.get('.option').contains('SIGN IN').should('not.exist')

        cy.get('.option').contains('SIGN OUT').should('exist')
        
        cy.wait(5000)

        cy.get('.option').contains('SIGN OUT').click()

        //Logout
        cy.wait(1000)
        
        cy.get('.option').contains('SIGN IN').should('exist')
        cy.get('.option').contains('SIGN OUT').should('not.exist')

    })
})