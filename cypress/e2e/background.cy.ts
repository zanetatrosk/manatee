const backgr = "Acolyte";
const languages = ["Common"];
const tools = [];
const features = ["Shelter of the Faithful"];
const description = "You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.";

describe("check that data rendered by selected background on background page are correct", () => {
  before(() => {
    cy.visit("http://localhost:3000/characters/create-character");
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
  });
  it("check data", () => {
    cy.get('[data-cy="background"]').within(() => {
      cy.get("input").click();
      cy.get("input")
        .should("have.attr", "placeholder", "Acolyte, Criminal, ...")
        .type(backgr);
    });
    cy.contains(backgr).click();
    cy.get('[data-cy="languages"]').within(() => {
      cy.get("input").click();
      cy.get("input").should("have.attr", "placeholder", "Common");
      languages.forEach((language, idx) => {
        cy.get("[data-cy=chip-" + idx + "]").should("have.text", language);
      });
    });

    cy.get('[data-cy="tools"]').within(() => {
      cy.get("label").should("have.text", "Proficiency Tools");
      cy.get("input").click();
      cy.get("input").should("have.attr", "placeholder", "Thieves' Tools");
      tools.forEach((tool, idx) => {
        cy.get("[data-cy=chip-" + idx + "]").should("have.text", tool);
      });
    });

    cy.get('[data-cy="card-info"]').within(() => {
      cy.get("[data-cy=card-title]").should("have.text", backgr);
      features.forEach((feature, idx) => {
        cy.get("[data-cy=feat-" + idx + "]").should(
          "have.text",
          feature
        );
      });
    });
    
    cy.get('[data-cy="card-descr"]').should("have.text", description);
  });
});
