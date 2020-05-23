describe('Adding a user to a trip should', () => {
  it('Add the user to the trip if they are not a current participant', () => {
    cy.visit('/');
    cy.contains('Log In').click();
    cy.url().should('include', '/login');
    cy.get('[type=email]').type('test@test.com');
    cy.get('[type=password]').type('testtest{enter}');
    cy.contains('New Trip').click();
    cy.url().should('include', '/newtrip');

    cy.get('[name=trip-name]').type('cypress test trip');
    cy.get('[name=trip-description]').type('This is a cypress test generated trip desription');

    const todaysDate = Cypress.moment().add(1,'days').format('MMM DD, YYYY');
    const tomorrowsDate = Cypress.moment().add(2,'days').format('MMM DD, YYYY');

    cy.get('.InputFromTo > :nth-child(1) > input').type(todaysDate);
    cy.get('.InputFromTo-to > .DayPickerInput > input').type(tomorrowsDate+'{enter}');

    cy.get('.trip-summary_addButton__34t0z').click();

    cy.contains('Generate new link').click()
    cy.contains('http://localhost:3000/join/').invoke('text').then((text1) => {
      cy.get('.MuiDialog-container').click(-50, -50, { force: true });
      cy.contains('Log out').click();
      cy.url().should('eq', 'http://localhost:3000/');
      cy.visit(text1);
      cy.get('.join_authPrompt__2mnpm > [href="/login"]').click();

      cy.get('[type=email]').type('ljohnston@example.org');
      cy.get('[type=password]').type('password{enter}');
      cy.wait(10000);
      cy.get('.block-avatar').each(($value, index) => {
        if($value[0].src.includes('ljohnston')) {
          cy.wrap($value[0]).should('have.attr', 'src').should('include', 'ljohnston');
        }
      });
    });
  });

  after(() => {
    cy.contains('Log out').click();
    cy.task("query", {
      sql:
        `DELETE FROM triptime.trips
         WHERE name like '%cypress%'`
    });
  })
})
