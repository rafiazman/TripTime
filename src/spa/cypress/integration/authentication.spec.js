/** @format */
const appHostname = '/';
const apiHostname = 'http://localhost';

describe('Test the log in and sign up functionalities', () => {
  beforeEach(() => {
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
        url: `${apiHostname}/api/trips/*`,
      })
      .as('getTrips')
      .route({ method: 'HEAD', url: `${apiHostname}/api/user/email/*` })
      .as('checkEmail')
      .route({ method: 'POST', url: `${apiHostname}/api/register` })
      .as('signUp');
  });

  it('Invalid log in details should be rejected and notify user', () => {
    cy.visit(appHostname)
      .get('header')
      .contains('Log In')
      .click()
      .get("[value='Log in']")
      .get("[type='email']")
      .type('non-existing@cypress.com')
      .get("[type='password']")
      .type('testtest')
      .get("[type='submit']")
      .click()
      .wait('@logIn')
      .get('.failed')
      .contains('The given data was invalid.');
  });

  it('Should be able to create a new user if emails and names are not occupied, and get greeted upon logging in', () => {
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
            .click()
            .wait('@logIn');
        } else {
          cy.get("[type='submit']")
            .click()
            .wait('@signUp');
        }
      })
      .wait('@getTrips')
      .get('h1')
      .contains('cypress');
  });
});
