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

describe('randomMenu Unit', () => {
    const data = [
        {
            'calorie': 500,
            'description': "ข้าวกะเพรากุ้งไข่ระเบิด",
            'imageURL': "https://img.wongnai.com/p/800x0/2019/04/02/2dc203b9dafe47fc9c532142419513aa.jpg",
            'name': "ข้าวกะเพรากุ้งไข่ระเบิด",
            'recipe': {
                'Ingredient': ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"]
            },
        },
        {
            'calorie': 200,
            'description': "ข้าวกะเพรากุ้งไข่ระเบิด",
            'imageURL': "https://img.wongnai.com/p/1600x0/2017/09/12/172aa09bdd2741368ebb85cad91f3d4e.jpg",
            'name': "ข้าวกะเพรากุ้งไข่ระเบิด2",
            'recipe': {
                'Ingredient': ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"]
            },
        },
        {
            'calorie': 404,
            'description': "ข้าวกะเพรากุ้งไข่ระเบิด",
            'imageURL': "https://img.wongnai.com/p/400x0/2018/05/25/12275783e777493092189fdc504534c4.jpg",
            'name': "ข้าวกะเพรากุ้งไข่ระเบิด3",
            'recipe': {
                'Ingredient': ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"]
            },
        }
    ]

    const data2 = [
        {
            'calorie': 200,
            'description': "ข้าวกะเพรากุ้งไข่ระเบิด",
            'imageURL': "https://img.wongnai.com/p/1600x0/2017/09/12/172aa09bdd2741368ebb85cad91f3d4e.jpg",
            'name': "ข้าวกะเพรากุ้งไข่ระเบิด2",
            'recipe': {
                'Ingredient': ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"]
            },
        },
    ]

    beforeEach(() => {
        cy.visit('http://localhost:8080/randomdisplay/%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3%E0%B8%81%E0%B9%87%E0%B9%84%E0%B8%94%E0%B9%89&%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3%E0%B8%81%E0%B9%87%E0%B9%84%E0%B8%94%E0%B9%89&%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3%E0%B8%81%E0%B9%87%E0%B9%84%E0%B8%94%E0%B9%89&%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3%E0%B8%81%E0%B9%87%E0%B9%84%E0%B8%94%E0%B9%89')
        cy.intercept({
            method: 'POST',
            url: '/app/randomMenu',
        }, { menu: data }
        ).as('getData')
    })

    it('successfully loads', () => {
        cy.wait('@getData')
        cy.get('#logo').should('exist')
        cy.get('#list-card').children().should('not.have.length', 0)
        cy.get('#random-button').should('exist')
    })

    it('can pop up', () => {
        cy.wait('@getData')
        cy.get('#list-card > :nth-child(1)').click()
        cy.get('.modal-card').should('be.visible')
        cy.get('#modal-head > .title').should('have.text', 'ข้าวกะเพรากุ้งไข่ระเบิด')
        cy.contains('วิธีทำ').should('exist')
        cy.contains('สั่งซื้อ').should('exist')
        cy.get('.modal-background').click({ force: true })

        cy.get('#list-card > :nth-child(2)').click()
        cy.get('.modal-card').should('be.visible')
        cy.get('#modal-head > .title').should('have.text', 'ข้าวกะเพรากุ้งไข่ระเบิด2')
        cy.contains('วิธีทำ').should('exist')
        cy.contains('สั่งซื้อ').should('exist')
        cy.get('.modal-background').click({ force: true })

        cy.get('#list-card > :nth-child(3)').click()
        cy.get('.modal-card').should('be.visible')
        cy.get('#modal-head > .title').should('have.text', 'ข้าวกะเพรากุ้งไข่ระเบิด3')
        cy.contains('วิธีทำ').should('exist')
        cy.contains('วิธีทำ').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('ยังไม่พร้อมใช้งาน');
        });
        cy.contains('สั่งซื้อ').should('exist')
        cy.contains('สั่งซื้อ').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('ยังไม่พร้อมใช้งาน');
        });
        cy.get('.modal-background').click({ force: true })
    })

    // can't test conrectly
    // it('Home redirect', () => {
    //     cy.intercept({
    //         method: 'POST',
    //         url: '/app/randomMenu',
    //     }, { menu: data2 }
    //     ).as('getData')
    //     cy.wait('@getData')
    //     cy.get('#logo').click({ multiple: true })
    //     cy.url().should('eq', 'http://localhost:8000/')
    // })
})