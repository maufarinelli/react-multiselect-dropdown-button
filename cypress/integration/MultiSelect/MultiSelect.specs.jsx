describe('MultiSelect tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('Open a MultiSelect Button Dropdown', () => {
    cy.get('.multiselect-button-dropdown')
      .first()
      .click();

    // Assertion
    cy.get('.multiselect-button-dropdown').should('have.class', 'is-opened');

    cy.get('.multiselect-section-wrapper')
      .find('button.multiselect-button-select-all')
      .should('be.visible');
    cy.get('.multiselect-section-wrapper')
      .find('button.multiselect-reset-button')
      .should('be.visible');
  });

  it('Select all options', () => {
    cy.get('.multiselect-button-dropdown')
      .first()
      .click();

    cy.get('.multiselect-section-wrapper')
      .get('.multiselect-button-select-all')
      .click();

    // Assertion
    cy.get('.multiselect-list-item-checkbox').each(checkbox => {
      cy.wrap(checkbox).should('be.checked');
    });
  });

  it('Reset all options', () => {
    cy.get('.multiselect-button-dropdown')
      .first()
      .click();

    cy.get('.multiselect-section-wrapper')
      .get('.multiselect-reset-button')
      .click();

    // Assertions
    cy.get('.multiselect-list-item-checkbox').each(checkbox => {
      cy.wrap(checkbox).should('not.be.checked');
    });
  });

  it('Unselect the first element', () => {
    cy.get('.multiselect-button-dropdown')
      .first()
      .click();

    cy.get('.multiselect-section-wrapper')
      .get('.multiselect-list-item-label')
      .first()
      .click();

    // Assertion
    cy.get('.multiselect-list-item-checkbox')
      .first()
      .should('not.be.checked');
  });

  it('Select the last element', () => {
    cy.get('.multiselect-button-dropdown')
      .first()
      .click();

    cy.get('.multiselect-section-wrapper')
      .get('.multiselect-list-item-label')
      .last()
      .click();

    // Assertion
    cy.get('.multiselect-list-item-checkbox')
      .last()
      .should('be.checked');
  });
});
