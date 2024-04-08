const srcPic =
  "https://cdn.pixabay.com/photo/2023/05/25/20/09/ai-generated-8018229_960_720.jpg";

  describe("Automation TC07 Character sheet picture", () => {
  const className = "Barbarian";
  const race = "Half-Elf";
  const background = "Charlatan";
  before(() => {
    cy.visit("http://localhost:3000/characters/create-character");
    cy.intercept("GET", "/api/races?source=", {
      fixture: "general-data/races.json",
    }).as("getRaces");
    cy.intercept("GET", "/api/backgrounds?source=", {
      fixture: "general-data/backgrounds.json",
    }).as("getBackgrounds");
    cy.intercept("GET", "/api/classes?source=", {
      fixture: "general-data/classes.json",
    }).as("getClasses");
    cy.intercept("GET", "/api/languages?source=", {
      fixture: "general-data/languages.json",
      }).as("getLanguages");
    cy.intercept("GET", "/api/tools?source=", {
      fixture: "general-data/tools.json",
    }).as("getTools");

    cy.intercept("POST", "/api/characters", {
      fixture: "character/character.json",
    }).as("postCharacter");

    cy.intercept("GET", "/api/characters/1", {
      fixture: "character/character.json",
    }).as("postCharacter");
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
    cy.get('[data-cy="class"]').click();
    cy.contains(className).click();
    cy.get('[data-cy="next"]').click();
    checkPage("Race");
    cy.get('[data-cy="race"]').click();
    cy.contains(race).click();
    cy.get('[data-cy="next"]').click();
    checkPage("Abilities");
    cy.get('[data-cy="next"]').click();
    checkPage("Background");
    cy.get('[data-cy="background"]').click();
    cy.contains(background).click();
    cy.get('[data-cy="finish"]').click();

    cy.get("img").should("have.attr", "src", srcPic);
  });
});
