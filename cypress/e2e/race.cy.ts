//write a test that check that Race elf is correct (check that all data is correct)

describe("Automation TC05", () => {
  const str = "You can have up to";
  before(() => {
    cy.visit("/characters/create-character");
    cy.get('[data-cy="next"]').click();
    cy.intercept("GET", "/api/races?source=", {
      fixture: "general-data/races.json",
    }).as("getRaces");
    cy.intercept("GET", "/api/languages?source=", {
      fixture: "general-data/languages.json",
    }).as("getLanguages");
    cy.get('[data-cy="next"]').click();
    cy.fixture("race.json").then((race) => {
      this.raceName = race.label;
      this.languages = race.languages.defaults;
      this.features = race.features;
      this.sizeOptions = race.sizeOptions;
      this.speed = race.speed;
      this.description = race.description;
      this.amount = race.languages.amount;
    });
  });
  it("check if the chosen race spawn the correct data", () => {
    cy.wait("@getRaces");
    cy.get('[data-cy="race"]').within(() => {
      cy.get("input").click();
      cy.get("input")
        .should("have.attr", "placeholder", "Elf, Dwarf, Human, ...")
        .type(this.raceName);
    });
    cy.contains(this.raceName).click();
    cy.get(".MuiSelect-select").contains("medium");
    cy.get('[data-cy="languages"]').within(() => {
      cy.get("input").click();
      cy.get("input").should(
        "have.attr",
        "placeholder",
        "Common, Elvish, Dwarvish, ..."
      );
      cy.contains(str).should(
        "have.text",
        str + " " + this.amount + " languages"
      );
      this.languages.forEach((language, idx) => {
        cy.contains(language.title);
      });
    });
    cy.get('[data-cy="card-info"]').within(() => {
      cy.get("[data-cy=card-title]").should("have.text", this.raceName);
      this.features.forEach((feature, idx) => {
        if (idx === 0) {
          cy.get("[data-cy=feat-" + idx + "]").should("have.text", "Speed");
        }
        idx++;
        cy.get("[data-cy=feat-" + idx + "]").should("have.text", feature.title);
      });
    });
    cy.get('[data-cy="card-descr"]').should("have.text", this.description);
  });
});
