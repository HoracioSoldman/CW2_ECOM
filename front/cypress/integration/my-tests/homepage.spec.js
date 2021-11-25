/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:3000')
    })

    it('displays the two subtitles and at least one item in the homepage', ()=>{
        cy.wait(3000)
        cy.get('h2').first().should('have.text', 'Best pick for you')
        
        cy.get('h2').last().should('have.text', 'Explore our big brands')

        cy.get('.collection-item').should('be.visible')
    })
})