describe('check abilities', () => {
    
    before(() => {
        cy.visit('http://localhost:3000/characters/create-character');
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
    }
    );
});