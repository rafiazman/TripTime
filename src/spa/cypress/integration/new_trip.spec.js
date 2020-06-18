/** @format */
let startDate;
let endDate;

// TODO: Fix breaking test
describe.skip('The user can create a new trip and get redirected to the new trip homepage', () => {
  beforeEach(() => {
    startDate = Cypress.moment()
      .add(1, 'days')
      .format('MMM DD, YYYY');
    endDate = Cypress.moment()
      .add(2, 'days')
      .format('MMM DD, YYYY');
  });
  it('Create a new trip', () => {
    cy.server()
      .route({
        method: 'GET',
        url: 'http://localhost/api/user',
      })
      .as('getUser')
      .route({
        method: 'POST',
        url: 'http://localhost/api/login',
      })
      .as('logIn')
      .route({ method: 'POST', url: 'http://localhost/api/trips' })
      .as('newTrip')
      .route({
        method: 'GET',
        url: 'http://localhost/api/user',
      })
      .as('getUser')
      .route({
        method: 'GET',
        url: 'http://localhost/api/trip/*',
      })
      .as('getTrip');

    cy.visit('http://localhost')
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
      .wait('@getUser')
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
