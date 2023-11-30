const srcPic =
  "https://cdn.pixabay.com/photo/2023/05/25/20/09/ai-generated-8018229_960_720.jpg";

describe("Character sheet picture", () => {
  before(() => {
    cy.visit("http://localhost:3000/characters/create-character");
  });
  it("pick a sheet photo and check that it will be displaed on sheet", () => {
    // Click on the "Content" link in the navbar
    cy.get('[data-cy="sheet-photo"]').type(srcPic);
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="finish"]').click();

    cy.get("img").should("have.attr", "src", srcPic);
  });
});
