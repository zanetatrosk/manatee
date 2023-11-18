


describe('check home page after loading an app', () => {

  before(() => {
    cy.visit('http://localhost:3000/')
  });

  it('should have a title', () => {
    cy.title().should('include', 'React App')
  });

  
  
})