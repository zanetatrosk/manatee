describe("Automation TC06 check ability calc", () => {
  before(() => {
    cy.visit("/characters/create-character");
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
    cy.get('[data-cy="next"]').click();
  });

  it("check calculations", () => {
    cy.contains("Dexterity")
      .parent("[data-cy=ability-row]")
      .then(($ability) => {
        cy.wrap($ability)
          .find('[data-cy="ability-score"]')
          .clear()
          .type("{backspace}{moveToEnd}5");
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+2");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "15");
        cy.wrap($ability).find('[data-cy="ability-up-two"]').click();
        cy.wrap($ability)
          .find('[data-cy="ability-up-one"] > #checkbox-input')
          .should("be.disabled");
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+3");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "17");
      });

    cy.contains("Strength")
      .parent("[data-cy=ability-row]")
      .then(($ability) => {
        cy.wrap($ability)
          .find('[data-cy="ability-score"]')
          .type("{backspace}{moveToEnd}0");
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+0");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "10");
      });

    cy.contains("Intelligence")
      .parent("[data-cy=ability-row]")
      .then(($ability) => {
        cy.wrap($ability)
          .find('[data-cy="ability-score"]')
          .type("{backspace}{moveToEnd}6");
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+3");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "16");
      });

    cy.contains("Wisdom")
      .parent("[data-cy=ability-row]")
      .then(($ability) => {
        cy.wrap($ability)
          .find('[data-cy="ability-score"]')
          .type("{backspace}{moveToEnd}2");
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+1");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "12");
      });

    cy.contains("Charisma")
      .parent("[data-cy=ability-row]")
      .then(($ability) => {
        cy.wrap($ability)
          .find('[data-cy="ability-score"]')
          .type("{backspace}{moveToEnd}4");
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+2");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "14");
      });

    cy.contains("Constitution")
      .parent("[data-cy=ability-row]")
      .then(($ability) => {
        cy.wrap($ability)
          .find('[data-cy="ability-score"]')
          .type("{backspace}{moveToEnd}20");
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+5");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "20");

        cy.wrap($ability).find('[data-cy="ability-up-two"]').click();
        cy.wrap($ability)
          .find('[data-cy="ability-up-one"] > #checkbox-input')
          .should("be.disabled");
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+5");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "20");
      });

    cy.contains("Intelligence")
      .parent("[data-cy=ability-row]")
      .then(($ability) => {
        cy.wrap($ability).find('[data-cy="ability-score"]').clear();
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "-5");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "1");
      });

    cy.contains("Charisma")
      .parent("[data-cy=ability-row]")
      .then(($ability) => {
        cy.wrap($ability)
          .find('[data-cy="ability-score"]')
          .type("{backspace}43");
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+5");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "20");
      });

    cy.contains("Dexterity")
      .parent("[data-cy=ability-row]")
      .then(($ability) => {
        cy.wrap($ability).find('[data-cy="ability-up-two"]').click();
        cy.wrap($ability)
          .find('[data-cy="ability-up-one"] > #checkbox-input')
          .should("not.be.disabled");
        cy.wrap($ability)
          .find('[data-cy="ability-up-one"] > #checkbox-input')
          .should("not.be.checked");
        cy.wrap($ability)
          .find('[data-cy="ability-up-two"] > #checkbox-input')
          .should("not.be.disabled");
        cy.wrap($ability)
          .find('[data-cy="ability-up-two"] > #checkbox-input')
          .should("not.be.checked");

        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+2");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "15");

        cy.wrap($ability).find('[data-cy="ability-up-one"]').click();
        cy.wrap($ability)
          .find('[data-cy="ability-up-one"] > #checkbox-input')
          .should("be.checked");
        cy.wrap($ability)
          .find('[data-cy="ability-up-two"] > #checkbox-input')
          .should("be.disabled")
          .should("not.be.checked");
        cy.wrap($ability)
          .find('[data-cy="ability-total-score"]')
          .should("have.text", "16");
        cy.wrap($ability)
          .find('[data-cy="ability-mod"]')
          .should("have.text", "+3");
      });
  });
});
