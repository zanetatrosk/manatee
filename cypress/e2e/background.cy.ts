const str = "You can have up to";


describe("Automation TC04", () => {
  before(() => {
    cy.visit("http://localhost:3000/characters/create-character");
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
    cy.intercept("GET", "/api/backgrounds?source=", {
      fixture: "general-data/backgrounds.json",
    }).as("getBackgrounds");
    cy.get('[data-cy="next"]').click();
    cy.fixture('background.json').as('background').then((background) => {
      this.backgr = background.label;
      this.languages = background.languages.defaults;
      this.tools = background.tools.defaults;
      this.features = background.features;
      this.description = background.description;
      this.amountTools = background.tools.amount;
      this.amountLanguages = background.languages.amount;
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
    cy.contains(this.backgr).click();
    cy.get('[data-cy="languages"]').within(() => {
      cy.get("input").click();
      cy.contains(str).should("have.text", str + " " + this.amountLanguages + " languages");
      cy.get("input").should("have.attr", "placeholder", "Common");
      this.languages.forEach((language, idx) => {
        cy.get("[data-cy=chip-" + idx + "]").should("have.text", language.title);
      });
    });

    cy.get('[data-cy="tools"]').within(() => {
      cy.get("label").should("have.text", "Proficiency Tools");
      cy.get("input").click();
      cy.get("input").should("have.attr", "placeholder", "Thieves' Tools");
      cy.contains(str).should("have.text", str + " " + this.amountTools + " tools");
      this.tools.forEach((tool, idx) => {
        cy.get("[data-cy=chip-" + idx + "]").should("have.text", tool.title);
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
