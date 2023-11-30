const className = "Barbarian";
const race = "Elf";
const background = "Acolyte";
const subclass = "Berserker";
const playerName = "Test Player name";
const characterName = "Test Character name";

describe("check that information that was entered in the form is displayed on the character sheet", () => {
  before(() => {
    cy.visit("http://localhost:3000/characters/create-character");
  });

  it("fill form", () => {
    cy.get('[data-cy="character-name"]').within(() => {
      cy.get("#input").clear().type(characterName);
    });
    cy.get('[data-cy="player-name"]').within(() => {
      cy.get("#input").clear().type(playerName);
    });
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="class"]').click();
    cy.contains("Barbarian").click();
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="race"]').click();
    cy.contains(race).click();
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="background"]').click();
    cy.contains(background).click();
    cy.get('[data-cy="finish"]').click();

    cy.get('[data-cy="character-name"]').should("have.text", characterName);
    cy.get('[data-cy="Player-value"]').should("have.text", playerName);
    cy.get('[data-cy="Class & level-value"]').should("have.text", className);
    cy.get('[data-cy="Race-value"]').should("have.text", race);
    cy.get('[data-cy="Background-value"]').should("have.text", background);
    cy.get('[data-cy="Subclass-value"]').should("have.text", subclass);
  });
});
