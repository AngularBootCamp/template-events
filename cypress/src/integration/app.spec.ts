export const app =
  'Step: ' +
  Cypress.config()
    .integrationFolder.split('\\')
    .find(pathSegment => /[0-9]/.test(pathSegment));

describe(app, () => {
  before(() => {
    cy.visit('/');
  });

  it('should instruct the user to clock in', () => {
    cy.contains('Please Clock In').should('exist');
  });

  it('should clock in', () => {
    cy.contains('button', 'Clock In').click();
    cy.contains('Clocked in as employee').should('exist');
  });

  it('should clock out', () => {
    cy.contains('button', 'Clock Out').click();
    cy.contains('Have a nice day!').should('exist');
  });

  it('should hover over schedule', () => {
    cy.get('.day-2').trigger('mouseover');
    cy.contains('9:00 - 3:00').should('exist');
  });

  it('should handle shift click', () => {
    cy.get('body')
      .type('{shift}', { release: false })
      .contains('Clock In')
      .click();
    cy.contains('Clocked in as manager!').should('exist');
  });
});
