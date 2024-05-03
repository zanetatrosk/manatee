describe('Automation TC03 check abilities', () => {
    
    before(() => {
        cy.visit('/characters/create-character');
        cy.get('[data-cy="next"]').click();
        cy.get('[data-cy="next"]').click();
        cy.get('[data-cy="next"]').click();
    })
    it('check abilities page', () => {
        cy.get('[data-cy="next"]').contains('Next');
        cy.get('[data-cy="back"]').contains('Back');
        cy.get('[data-cy="abilities"]').contains('Abilities');
        cy.get('[data-cy="abilities"]').contains('Choose your abilities');
        cy.get('[data-cy="ability-row"]').as('abilities').then(($abilities) => {
            const abilitiesNames = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
            $abilities.each((index, $ability) => {
                cy.wrap($ability).find('[data-cy="ability-score"]').find('input').invoke('val').should('equal', '8');
                cy.wrap($ability).find('[data-cy="ability-name"]').contains(abilitiesNames[index]);
                cy.wrap($ability).get('[data-cy="ability-up-one"]').should('be.visible');
                cy.wrap($ability).get('[data-cy="ability-up-two"]').should('be.visible');
                cy.wrap($ability).find('[data-cy="ability-mod"]').should('have.text', '-1');
            });
        });
        cy.get('[data-cy="content-table"] > [data-cy="ability-row"]').should('have.length', 6);
        cy.get('[data-cy="content-table"] > :nth-child(1) > :nth-child(2) > [data-cy="ability-score"]').clear();
        cy.get('[data-cy="content-table"] > :nth-child(1) > :nth-child(2) > [data-cy="ability-score"]').find('input').invoke('val').should('equal', '1'); 
        cy.get('[data-cy="content-table"] > :nth-child(1) > [data-cy="ability-mod"]').should('have.text', '-5');;       
        cy.get('[data-cy="content-table"] > :nth-child(1) > :nth-child(2) > [data-cy="ability-score"]').type('20');
        cy.get('[data-cy="content-table"] > :nth-child(1) > :nth-child(2) > [data-cy="ability-score"]').find('input').invoke('val').should('equal', '20');
        cy.get('[data-cy="content-table"] > :nth-child(1) > [data-cy="ability-mod"]').should('have.text', '+5');
    }

    );
});