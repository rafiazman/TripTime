/** @format */
const appHostname = '/';
const apiHostname = 'http://localhost';

describe('The user gets rejected with invalid auth details. The user can create a new account. The user can log in', () => {
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
        url: `${apiHostname}/api/trip/*`,
      })
      .as('getTrip')
      .route({ method: 'HEAD', url: `${apiHostname}/api/user/email/*` })
      .as('checkEmail')
      .route({ method: 'POST', url: `${apiHostname}/api/register` })
      .as('signUp');
  });

  it('Log in as a non-existing user', () => {
    cy.visit(appHostname)
      .wait('@getUser')
      .its('status')
      .should('equal', 401)
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
      .its('status')
      .should('equal', 422);
  });

  it('Create a new user', () => {
    cy.visit(appHostname)
      .wait('@getUser')
      .its('status')
      .should('equal', 401)
      .get('header')
      .contains('Sign Up')
      .click()
      .get("[name='email']")
      .type('new-user@cypres.com')
      .get("[name='nickname']")
      .type('cypress new user')
      .get("[name='password']")
      .type('testpassword')
      .get("[name='confirm-password']")
      .type('testpassword')
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
      .wait('@getUser')
      .its('status')
      .should('equal', 200);
  });
});
