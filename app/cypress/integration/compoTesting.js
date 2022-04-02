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

describe('Component Testing', () => {
    it('run through', () => {
        cy.visit('/')
        cy.server()
        cy.intercept({
            method: 'POST',
            url: '/app/randomMenu',
        }, { menu: data }
        ).as('getData')

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