

describe("Automation TC04", () => {
  const str = "You can have up to";
  before(() => {
    cy.visit("/characters/create-character");
    cy.intercept("GET", "/api/tools?source=", {
      fixture: "general-data/tools.json",
    }).as("getTools");
    cy.get('[data-cy="next"]').click();
    cy.intercept("GET", "/api/languages?source=", {
    fixture: "general-data/languages.json",
      }).as("getLanguages");
      cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
    cy.intercept("GET", "/api/backgrounds?source=", {
      fixture: "general-data/backgrounds.json",
    }).as("getBackgrounds");
    cy.get('[data-cy="next"]').click();
    cy.fixture('background.json').as('background').then((background) => {
      this.backgr = background.name;
      this.languages = background.languageProficiencies.defaults;
      this.tools = background.toolProficiencies.defaults;
      this.features = background.features;
      this.description = background.description;
      this.amountTools = background.toolProficiencies.amount;
      this.amountLanguages = background.languageProficiencies.amount;
    })
  });
  it("check that data rendered by selected background on background page are correct", () => {
    cy.wait('@getBackgrounds');
    cy.get('[data-cy="background"]').within(() => {
      cy.get("input").click();
      cy.get("input")
        .should("have.attr", "placeholder", "Acolyte, Criminal, ...")
        .type(this.backgr);
    });
    const rgx = '^' + this.backgr +  '$';
    cy.contains(RegExp(rgx)).click();
    cy.get('[data-cy="languages"]').within(() => {
      cy.get("input").click();
      cy.contains(str).should("have.text", str + " " + this.amountLanguages + " languages");
      cy.get("input").should("have.attr", "placeholder", "Common");
      this.languages.forEach((language, idx) => {
        cy.get("[data-cy=chip-" + idx + "]").should("have.text", language.name);
      });
    });

    cy.get('[data-cy="tools"]').within(() => {
      cy.get("label").should("have.text", "Proficiency Tools");
      cy.get("input").click();
      cy.get("input").should("have.attr", "placeholder", "Thieves' Tools");
      cy.contains(str).should("have.text", str + " " + this.amountTools + " tools");
      this.tools.forEach((tool, idx) => {
        cy.get("[data-cy=chip-" + idx + "]").should("have.text", tool.name);
      });
    });

    cy.get('[data-cy="card-info"]').within(() => {
      cy.get("[data-cy=card-title]").should("have.text", this.backgr);
      this.features.forEach((feature, idx) => {
        cy.get("[data-cy=feat-" + idx + "]").should(
          "have.text",
          feature.title
        );
      });
    });
    
    cy.get('[data-cy="card-descr"]').should("have.text", this.description);
  });
});
