describe('Automation TC01 check home page after loading an app', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.fixture('navbar.json').as('navbar').then((navbar) => {
      this.nav = navbar.nav;
      this.usersChoices = navbar.usersChoices;
    })
  });

  function checkTitles(titles: Record<string, string>, el: string){
    Object.keys(titles).forEach((key: string) => {
      const title = titles[key];
      cy.get('[data-cy='+ "\"" + key + "\"" + "]").should('have.text', title);
    })
  }
  
  it("check that loaded page is correct", () => {  
    cy.get('.App').contains('Welcome to D&D App');
    cy.url().should('include', '/');
  })

  it("check navbar is correct", () => {
    cy.get('#navbar').as('navbar').then(() => {
      checkTitles(this.nav, '@navbar');
    })
    cy.get('[data-cy="user-icon"]').trigger('mouseover');
    cy.get('#user-tooltip').should('be.visible').should('have.text', 'Open settings');
    cy.get('[data-cy="user-menu"]').as('menu').then(() => {
      cy.get('[data-cy="user-icon"]').click();
      checkTitles(this.usersChoices, '@menu');
    });
  });

})