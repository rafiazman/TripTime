/** @format */

describe('The index page should', () => {
  it('successfully load', () => {
    cy.visit('/');
  });

  it('contain an option to log in', () => {
    cy.contains('Log In');
  });
});
