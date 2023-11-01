


describe('visit', () => {
  
  it('get element', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.css-1t6c9ts > [href="/characters"] > .MuiButtonBase-root').click();
    cy.url().should('include', '/characters')
  });
  
})