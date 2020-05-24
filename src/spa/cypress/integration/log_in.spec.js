/** @format */
let startDate;
let endDate;
const appHostname = 'http://localhost:3000';
const apiHostname = 'http://localhost:3000';
context('The user can create a new account and log in', () => {
  beforeEach(() => {
    startDate = Cypress.moment()
      .add(1, 'days')
      .format('MMM DD, YYYY');
    endDate = Cypress.moment()
      .add(2, 'days')
      .format('MMM DD, YYYY');
  });
  it('Log in as testuser', () => {
    cy.server()
      .route({
        method: 'GET',
        url: `${apiHostname}/api/user`,
      })
      .as('getUser')
      .route({
        method: 'POST',
        url: `${apiHostname}/api/login`,
      })
      .as('logIn')
      .route({ method: 'POST', url: `${apiHostname}/api/trips` })
      .as('newTrip')
      .route({
        method: 'GET',
        url: '${apiHostname}/api/user',
      })
      .as('getUser')
      .route({
        method: 'GET',
        url: `${apiHostname}/api/trip/*`,
      })
      .as('getTrip');

    cy.visit(appHostname)
      .wait('@getUser')
      // .should('have.property', 'status', 401)
      .get('header')
      .contains('Log In')
      .click()
      .get("[value='Log in']")
      .get("[type='email']")
      .type('test@test.com')
      .get("[type='password']")
      .type('testtest')
      .get("[type='submit']")
      .click()
      .wait('@logIn')
      .should('have.property', 'status', 200)
      .wait('@getUser')
      .should('have.property', 'status', 200)
      .get('header')
      .get("[href='/newtrip']")
      .click()
      .get('[name=trip-name]')
      .type('cypress test case 5 trip')
      .get('[name=trip-description]')
      .type('cypress test case 5 trip trip desription')
      .get('[placeholder="From"]')
      .type(startDate)
      .get('[placeholder="To"]')
      .type(endDate + '{enter}')
      .wait('@newTrip')
      .should('have.property', 'status', 200)
      .url()
      .should('contain', '/trip')
      .wait('@getTrip')
      .should('have.property', 'status', 200)
      .wait('@getUser')
      .get('.links-container')
      .contains('Map')
      .click();
  });
});
