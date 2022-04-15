const randomData = [
    {
        'calorie': 500,
        'description': "ข้าวกะเพรากุ้งไข่ระเบิด",
        'imageURL': "https://img.wongnai.com/p/800x0/2019/04/02/2dc203b9dafe47fc9c532142419513aa.jpg",
        'name': "ข้าวกะเพรากุ้งไข่ระเบิด",
        'recipe': {
            'Ingredient': ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"],
            'views' : 1
        },
    },
    {
        'calorie': 200,
        'description': "ข้าวกะเพรากุ้งไข่ระเบิด",
        'imageURL': "https://img.wongnai.com/p/1600x0/2017/09/12/172aa09bdd2741368ebb85cad91f3d4e.jpg",
        'name': "ข้าวกะเพรากุ้งไข่ระเบิด2",
        'recipe': {
            'Ingredient': ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"],
            'views' : 10
        },
    },
    {
        'calorie': 404,
        'description': "ข้าวกะเพรากุ้งไข่ระเบิด",
        'imageURL': "https://img.wongnai.com/p/400x0/2018/05/25/12275783e777493092189fdc504534c4.jpg",
        'name': "ข้าวกะเพรากุ้งไข่ระเบิด3",
        'recipe': {
            'Ingredient': ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"],
            'views' : 100
        },
    }
]

describe('Component Testing', () => {
    it('feature random menu', () => {
        cy.visit('/')
        cy.server()
        cy.intercept({
            method: 'POST',
            url: 'http://159.223.45.216:3083/randomMenu',
        }, { menu: randomData }
        ).as('getData')

        cy.contains('สุ่มเลย!').click()
        cy.url().should('eq', 'http://localhost:9000/filtermenu')
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
        cy.url().should('eq', 'http://localhost:9000/randomdisplay/%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7&%E0%B8%9C%E0%B8%B1%E0%B8%94&null&%E0%B8%AB%E0%B8%A1%E0%B8%B9')

        cy.get('#random-button').click()
        cy.wait('@getData')
    })

    it('feature recipe', () => {
        cy.visit('/')
        cy.server()
        cy.intercept({
            method: 'POST',
            url: 'http://159.223.45.216:3083/searchMenu',
        }, { menu: randomData }
        ).as('getData')
        cy.contains('ลองทำเอง').click()
        cy.url().should('eq', 'http://localhost:9000/Recipe')
        cy.get('.navbar-item > .input').type("Hello")
        cy.get(':nth-child(2) > .button').click()
        cy.wait('@getData')
        cy.get('tbody').contains('ข้าวกะเพรากุ้งไข่ระเบิด')
        cy.get('tbody').contains('ข้าวกะเพรากุ้งไข่ระเบิด2')
        cy.get('tbody').contains('ข้าวกะเพรากุ้งไข่ระเบิด3')
        cy.get(':nth-child(1) > .button').click()
        cy.get('.modal').should('have.class', 'is-active')
        cy.get('.columns > :nth-child(1) > :nth-child(1)').contains('ข้าว')
        cy.get('.columns > :nth-child(1) > :nth-child(1)').contains('เส้น')
        cy.get('.columns > :nth-child(1) > :nth-child(2) > :nth-child(2)').click()
        cy.get('.columns > :nth-child(1) > :nth-child(3) > :nth-child(2)').click()
        cy.get('.columns > :nth-child(1) > :nth-child(1) > :nth-child(2)').click()
        cy.get('.columns > :nth-child(1)').contains("ประเภทการทำ(เมนูข้าว)").and('not.be.visible')
        cy.get('.columns > :nth-child(1) > :nth-child(1) > :nth-child(3)').click()
        cy.get('.columns > :nth-child(1)').contains("เส้น(เมนูเส้น)").and('not.be.visible')
        cy.get('.columns > :nth-child(2) > :nth-child(1)').contains('วัตถุดิบหลัก')
        cy.get('.columns > :nth-child(2) > :nth-child(1) > :nth-child(2)').click()
        cy.get(':nth-child(2) > .input').type("hello")
        cy.get('.modal-card-foot > .is-success').click()
        cy.get('.modal').should('not.have.class', 'is-active')
        cy.get(':nth-child(1) > .button').click()
        cy.get('.is-danger').click()
        cy.get('.modal').should('not.have.class', 'is-active')
    })
})