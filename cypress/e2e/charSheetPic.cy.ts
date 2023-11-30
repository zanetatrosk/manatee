const srcPic =
  "https://cdn.pixabay.com/photo/2023/05/25/20/09/ai-generated-8018229_960_720.jpg";

describe("Character sheet picture", () => {
  before(() => {
    cy.visit("http://localhost:3000/characters/create-character");
  });

  const checkPage = (page: string) => {
    cy.get(".MuiStepper-root").should("be.visible");
    cy.contains(page);
  }

  it("type an url of a sheet photo and check that it will be displayed on the sheet", () => {
    checkPage("Basic information");
    cy.get('[data-cy="sheet-photo"]').type(srcPic);
    cy.get('[data-cy="next"]').click();
    checkPage("Class");
    cy.get('[data-cy="next"]').click();
    checkPage("Race")
    cy.get('[data-cy="next"]').click();
    checkPage("Abilities")
    cy.get('[data-cy="next"]').click();
    checkPage("Background");
    cy.get('[data-cy="finish"]').click();

    cy.get("img").should("have.attr", "src", srcPic);
  });
});
