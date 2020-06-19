/** @format */
let startDate;
let endDate;
const appHostname = '/';
const apiHostname = 'http://localhost';

describe('The user can create a new trip and get redirected to the new trip homepage', () => {
  beforeEach(() => {
    startDate = Cypress.moment()
      .add(1, 'year')
      .startOf('year')
      .format('MMMM DD, YYYY');
    endDate = Cypress.moment(startDate)
      .add(2, 'days')
      .format('MMMM DD, YYYY');
    cy.server()
      .route({ method: 'POST', url: `${apiHostname}/api/trips` })
      .as('newTrip')
      .route({
        method: 'GET',
        url: `${apiHostname}/api/trips/*`,
      })
      .as('getTrips')
      .route({
        method: 'GET',
        url: `${apiHostname}/api/trip/*`,
      })
      .as('getOneTrip');
  });
  it('Create a new trip and get redirected to the trip page that displays the trip title', () => {
    cy.visit(appHostname)
      .get('header')
      .contains('Sign Up')
      .click()
      .get("[name='email']")
      .type('new-user@cypres.com')
      .get("[name='nickname']")
      .type('cypress')
      .get("[name='password']")
      .type('testpassword')
      .get("[name='confirm-password']")
      .type('testpassword')
      .wait(1000)
      .get('body')
      .then($body => {
        if ($body.text().includes('Sorry')) {
          cy.get('header')
            .contains('Log In')
            .click()
            .get('[type="email"]')
            .type('new-user@cypres.com')
            .get('[type="password"]')
            .type('testpassword')
            .get("[type='submit']")
            .click();
        } else {
          cy.get("[type='submit']").click();
        }
      })
      .wait('@getTrips')
      .get('header')
      .contains('New Trip')
      .click()
      .get("[name='trip-name']")
      .type('Cypress test trip')
      .get("[name='trip-description']")
      .type('Cypress trip description')
      .get('[placeholder="From"]')
      .type(startDate)
      .get("[placeholder='To']")
      .type(endDate + '{enter}')
      .wait('@newTrip')
      .wait('@getOneTrip')
      .get('h1')
      .contains('Cypress test trip');
  });
});
