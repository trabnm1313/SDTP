describe('Component Testing', () => {
    it('run through', () => {
        cy.visit('/')
        cy.server()
        cy.route({
            method: 'POST',
            url: '/app/randomMenu'
        }).as('getData')

        cy.contains('สุ่มเลย!').click()
        cy.url().should('eq', 'http://localhost:8081/filtermenu')
        // เลือกข้าว
        cy.get('.content > .form-check').within(() => {
            cy.get('[value="ข้าว"]').check()
            cy.get('[value="ข้าว"]').should('be.checked')
        })
        cy.contains('Next').click()

        // เลือกต้ม
        cy.get('#methodModal > .modal-card > .modal-card-body > .form-check').within(() => {
            cy.get('[value="ผัด"]').check()
            cy.get('[value="ผัด"]').should('be.checked')
        })
        cy.get('#methodModal > .modal-card > .modal-card-foot > .is-success').click()

        // เลือกหมู
        cy.get('#ingredientModal > .modal-card > .modal-card-body > .form-check').within(() => {
            cy.get('[value="หมู"]').click()
            cy.get('[value="หมู"]').should('be.checked')
        })
        cy.get('#ingredientModal > .modal-card > .modal-card-foot > .is-success').click()
        cy.wait('@getData')
        cy.url().should('eq', 'http://localhost:8081/randomdisplay/%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7&%E0%B8%9C%E0%B8%B1%E0%B8%94&null&%E0%B8%AB%E0%B8%A1%E0%B8%B9')

        cy.get('#random-button').click()
        cy.wait('@getData')
    })
})