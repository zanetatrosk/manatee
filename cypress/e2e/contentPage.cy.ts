describe("Automation TC02 Content page", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });
  it('should navigate to /content and display page content with title "content"', () => {
    // Click on the "Content" link in the navbar
    cy.get("#navbar").contains("content").click();

    // Assert that the URL is "/content"
    cy.url().should("include", "/content");

    // Assert that the page content contains the title "content"
    cy.get('.App').contains('Content Page');

  });
});
