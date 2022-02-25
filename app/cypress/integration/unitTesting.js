describe('Home Unit', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('successfully loads', () => {
        cy.contains('สุ่มเลย!').should('exist')
        cy.contains('ซื้อจากร้าน').should('exist')
        cy.contains('ลองทำเอง').should('exist')
    })
    it('should alert ไม่พร้อมใช้งาน', () => {
        cy.contains('ซื้อจากร้าน').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('ยังไม่พร้อมใช้งาน');
        });
        cy.contains('ลองทำเอง').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('ยังไม่พร้อมใช้งาน');
        });
    })

    it('is redirected to the filter page', () => {
        cy.get('.mb-4 > .button').click()
        cy.url('equal', 'http://localhost:8080/filtermenu')
    })
})

describe('FilterMenu Unit', () => {
    beforeEach(() => {
        cy.visit('/filtermenu')
    })

    it('successfully loads', () => {
        cy.contains('Next').should('exist')
        cy.contains('Next').should('be.disabled')
        cy.contains('Back').should('exist')
        cy.get('.modal').should(($modal) => {
            expect($modal).to.have.length(3)
        })
        cy.get('.content > .form-check').within(() => {
            cy.get('[value="เส้น"]').should('exist')
            cy.get('[value="เส้น"]').should('not.checked')
            cy.get('[value="ข้าว"]').should('exist')
            cy.get('[value="ข้าว"]').should('not.checked')
            cy.get('[value="อะไรก็ได้"]').should('exist')
            cy.get('[value="อะไรก็ได้"]').should('not.checked')
        })
    })

    it('สามารถกดเลือกเมนูเส้นได้', () => {
        cy.get('.content > .form-check').within(() => {
            cy.get('[value="เส้น"]').click()
            cy.get('[value="เส้น"]').should('be.checked')
        })
        cy.contains('Next').click()
        cy.get('#methodModal').should('be.visible')
        cy.get('#methodModal > .modal-card > .modal-card-foot > .is-success').should('be.disabled')
        cy.get('#methodModal > .modal-card > .modal-card-foot > :nth-child(2)').click()
        cy.get('#methodModal').should('not.be.visible')
    })

    describe('ทดสอบลำดับการเลือก', () => {
        it("เมนูเส้น -> ต้ม -> ก๋วยเตี๋ยว -> หมู", () => {
            // เลือกเส้น
            cy.get('.content > .form-check').within(() => {
                cy.get('[value="เส้น"]').check()
                cy.get('[value="เส้น"]').should('be.checked')
            })
            cy.contains('Next').click()

            // เลือกต้ม
            cy.get('#methodModal > .modal-card > .modal-card-body > .form-check').within(() => {
                cy.get('[value="ต้ม"]').check()
                cy.get('[value="ต้ม"]').should('be.checked')
            })
            cy.get('#methodModal > .modal-card > .modal-card-foot > .is-success').click()

            // เลือกก๋วยเตี๋ยว
            cy.get('#noodleModal > .modal-card > .modal-card-body > .form-check').within(() => {
                cy.get('[value="ก๋วยเตี๋ยว"]').click()
                cy.get('[value="ก๋วยเตี๋ยว"]').should('be.checked')
            })
            cy.get('#noodleModal > .modal-card > .modal-card-foot > .is-success').click()

            // เลือกหมู
            cy.get('#ingredientModal > .modal-card > .modal-card-body > .form-check').within(() => {
                cy.get('[value="หมู"]').click()
                cy.get('[value="หมู"]').should('be.checked')
            })
            cy.get('#ingredientModal > .modal-card > .modal-card-foot > .is-success').click()
            cy.url('contain', '/randomdisplay')
        })

        it("เมนูข้าว -> ต้ม -> หมู", () => {
            // เลือกข้าว
            cy.get('.content > .form-check').within(() => {
                cy.get('[value="ข้าว"]').check()
                cy.get('[value="ข้าว"]').should('be.checked')
            })
            cy.contains('Next').click()

            // เลือกต้ม
            cy.get('#methodModal > .modal-card > .modal-card-body > .form-check').within(() => {
                cy.get('[value="ต้ม"]').check()
                cy.get('[value="ต้ม"]').should('be.checked')
            })
            cy.get('#methodModal > .modal-card > .modal-card-foot > .is-success').click()

            // เลือกก๋วยเตี๋ยว
            cy.get('#noodleModal').should('not.be.visible')

            // เลือกหมู
            cy.get('#ingredientModal > .modal-card > .modal-card-body > .form-check').within(() => {
                cy.get('[value="หมู"]').click()
                cy.get('[value="หมู"]').should('be.checked')
            })
            cy.get('#ingredientModal > .modal-card > .modal-card-foot > .is-success').click()
            cy.url('contain', '/randomdisplay')
        })

        it("เมนูทั้งหมด -> อะไรก็ได้ -> อะไรก็ได้ -> อะไรก็ได้", () => {
            // เลือกเมนูทั้งหมด
            cy.get('.content > .form-check').within(() => {
                cy.get('[value="อะไรก็ได้"]').check()
                cy.get('[value="อะไรก็ได้"]').should('be.checked')
            })
            cy.contains('Next').click()

            // เลือกอะไรก็ได้
            cy.get('#methodModal > .modal-card > .modal-card-body > .form-check').within(() => {
                cy.get('[value="อะไรก็ได้"]').check()
                cy.get('[value="อะไรก็ได้"]').should('be.checked')
            })
            cy.get('#methodModal > .modal-card > .modal-card-foot > .is-success').click()

            // เลือกก๋วยเตี๋ยว
            cy.get('#noodleModal > .modal-card > .modal-card-body > .form-check').within(() => {
                cy.get('[value="อะไรก็ได้"]').click()
                cy.get('[value="อะไรก็ได้"]').should('be.checked')
            })
            cy.get('#noodleModal > .modal-card > .modal-card-foot > .is-success').click()

            // เลือกอะไรก็ได้
            cy.get('#ingredientModal > .modal-card > .modal-card-body > .form-check').within(() => {
                cy.get('[value="อะไรก็ได้"]').click()
                cy.get('[value="อะไรก็ได้"]').should('be.checked')
            })
            cy.get('#ingredientModal > .modal-card > .modal-card-foot > .is-success').click()
            cy.url('contain', '/randomdisplay')
        })
    })
})

// describe('randomMenu Unit', () => {
//     it('successfully loads', () => {
//         cy.visit('/randomdisplay')
//         cy.intercept(
//             {
//                 method: 'POST', // Route all GET requests
//                 url: '/randomdisplay/', // that have a URL that matches '/users/*'
//             },
//             [] // and force the response to be: []
//         ).as('getUsers') // and assign an alias
//     })
// })