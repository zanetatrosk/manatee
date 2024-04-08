
describe("Automation TC08 check that information that was entered in the form is displayed on the character sheet", () => {
  const className = "Barbarian";
  const race = "Half-Elf";
  const background = "Charlatan";
  const subclass = "";
  const playerName = "Test Player name";
  const characterName = "Test Character name";
  
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
  
  it("fill form", () => {
    cy.get(".MuiStepper-root").should("be.visible");
    cy.contains("Basic information");
    cy.get('[data-cy="character-name"]').within(() => {
      cy.get("#input").clear().type(characterName);
    });
    cy.get('[data-cy="player-name"]').within(() => {
      cy.get("#input").clear().type(playerName);
    });
    cy.get('[data-cy="next"]').click();
    checkPage("Class");
    cy.get('[data-cy="class"]').click();
    cy.contains("Barbarian").click();
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

    
    cy.wait("@postCharacter");
    cy.get('[data-cy="character-name"]').should("have.text", characterName);
    cy.get('[data-cy="Player-value"]').should("have.text", playerName);
    cy.get('[data-cy="Class & level-value"]').should("have.text", className + " 1");
    cy.get('[data-cy="Race-value"]').should("have.text", race);
    cy.get('[data-cy="Background-value"]').should("have.text", background);
    cy.get('[data-cy="Subclass-value"]').should("have.text", subclass);
    
  });
});
