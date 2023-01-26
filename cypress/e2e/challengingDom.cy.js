/// <reference types="cypress" />
const ocrHelper = require('../support/ocrHelper.js')

describe('Challenging DOM', () => {
  beforeEach(() => {
    // Below is just to stop noise in the Cypress test runner as Herokuapp's call to Optimizely has some issue.
    cy.intercept('GET', 'https://*.log.optimizely.com/*', 'success').as('InterceptFailingCall')
    
    cy.visit('https://the-internet.herokuapp.com/challenging_dom')
  })
  
  it('Validate page elements', () => {
      cy.get('div.example h3')
        .should('be.visible')
        .should('contain.text', 'Challenging DOM')

      cy.get('div.example p')
        .should('be.visible')
        .should('have.text', 'The hardest part in automated web testing is finding the best locators (e.g., ones that well named, unique, and unlikely to change). It\'s more often than not that the application you\'re testing was not built with this concept in mind. This example demonstrates that with unique IDs, a table with no helpful locators, and a canvas element.')

      cy.get('a')
        .filter('.button')
        .should('have.length', 3)
        .each((button) => {
          expect(button).to.be.visible
        })

      cy.get('div#content table')
        .should('be.visible')
        .should('have.length', 1)

      cy.get('#canvas')
        .should('be.visible')

      cy.get('div#page-footer')       
        .should('be.visible')
        .should('contain.text', 'Powered by Elemental Selenium')
  })

  it('Validate page footer hyperlink', () => {
    cy.get('div#page-footer a')
      .should('be.visible')
      .invoke('attr', 'href')
      .should('equal', 'http://elementalselenium.com/')
      .then(($url) => {
        cy.log('About to validate if the following url is valid: ' + $url)
        cy.request({
            url: $url,
            failOnStatusCode: false
        })
        .then((response) => {            
          expect(response.status).to.equal(200)
        })        
      })
  })

  it('Validate button one functionality', () => {
    var buttonIndex = 0
    var performButtonClick = true
    cy.validateButton(buttonIndex, performButtonClick)

    performButtonClick = false
    cy.validateButton(buttonIndex, performButtonClick)
  })

  it('Validate button two functionality', () => {
    var buttonIndex = 1
    var performButtonClick = true
    cy.validateButton(buttonIndex, performButtonClick)

    performButtonClick = false
    cy.validateButton(buttonIndex, performButtonClick)
  })

  it('Validate button three functionality', () => {
    var buttonIndex = 2
    var performButtonClick = true
    cy.validateButton(buttonIndex, performButtonClick)

    performButtonClick = false
    cy.validateButton(buttonIndex, performButtonClick)
  })

  it('Validate table structure - Action column header', () => {
    cy.get('div#content table')
      .find('thead tr th')
      .should('have.length', 7)
      .eq(6)
      .should('have.text', 'Action')
  })  

  it('Validate table structure - Action column links', () => {
    cy.get('div#content table')
      .find('tbody tr')
      .should('have.length.at.least', 1)
      .eq(0)
      .find('td a')
      .should('have.length', 2)
      .then((anchorTags) => {
        expect(anchorTags[0]).to.have.text('edit')
        expect(anchorTags[1]).to.have.text('delete')
      })
  }) 
  
  it('Validate table Action column - edit link', () => {
    cy.get('div#content table')
    .find('tbody tr')
    .should('have.length.at.least', 1)
    .eq(0)
    .find('td a')
    .should('have.length', 2)
    .then((anchorTags) => {
      cy.wrap(anchorTags[0]).click()
    })

    cy.url().should('match', /\#edit$/)
  })

  it('Validate table Action column - delete link', () => {
    cy.get('div#content table')
    .find('tbody tr')
    .should('have.length.at.least', 1)
    .eq(0)
    .find('td a')
    .should('have.length', 2)
    .then((anchorTags) => {
      cy.wrap(anchorTags[1]).click()
    })

    cy.url().should('match', /\#delete$/)    
  })  

  it('Validate canvas', () => {    
    // Adding the below as a mini proof of concept that value can be read from canvas
    // but in real world would need further discussions on the problem we are trying to solve.
    ocrHelper.recogniseText()
  })
})