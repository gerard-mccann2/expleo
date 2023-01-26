import Tesseract from 'tesseract.js';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('validateButton', (buttonIndex, performButtonClick) => {
    cy.get('a')
    .filter('.button')
    .should('have.length', 3)
    .eq(buttonIndex)
    .then((button) => {
        if(performButtonClick){
            cy.intercept('GET', 'https://the-internet.herokuapp.com/challenging_dom').as('PageReload')
            cy.wrap(button).click()
            //ensure page is reloaded
            .wait('@PageReload')
        }
    })
 })