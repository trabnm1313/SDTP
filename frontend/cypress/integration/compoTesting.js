const randomData = [
    {
        'id': '1',
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
        'id': '2',
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
        'id': '3',
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

const detail = {
    id: "1",
    calorie: 500,
    description: "ข้าวกะเพรากุ้งไข่ระเบิด",
    imageURL:
      "https://img.wongnai.com/p/800x0/2019/04/02/2dc203b9dafe47fc9c532142419513aa.jpg",
    name: "ข้าวกะเพรากุ้งไข่ระเบิด",
    recipe: {
      ingredient: ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"],
      steps: [
        "นำมะระมาผ่าแล้วควักไส้ทิ้ง หั่นเป็นชิ้น ๆ แล้วทาด้วยเกลือให้ทั่ว หมักเกลือทิ้งไว้ 20 นาที",
        "เมื่อครบเวลาแล้ว นำไปล้างน้ำเปล่า เกลือจะช่วยลดความขมของมะระ",
        "ต้มน้ำให้เดือด ใส่รากผักชี กระเทียม พริกไทยดำ ตามด้วยเครื่องปรุงทั้งหมด และน่องไก่ ตุ๋นทิ้งไว้เป็นเวลา 30 นาที",
        "เมื่อครบเวลา ใส่มะระ และเห็ดหอมแช่น้ำลงไป ตุ๋นต่ออีก 30 นาที",
        "ลวกถั่วงอก และเส้นบะหมี่ ใส่ลงในชาม ตักไก่ และมะระที่ตุ๋นไว้ ราดจัดเสิร์ฟ โรยหน้าด้วย กระเทียมเจียว และผักชีต้นหอม เป็นอันพร้อมรับประทาน!",
      ],
      views: 1,
    },
  };

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

        cy.intercept({
            method: 'GET',
            url: 'http://159.223.45.216:3083/database/1',
        }, { menu: detail }
        ).as('getDetail')

        cy.contains('ลองทำเอง').click()
        cy.url().should('eq', 'http://localhost:9000/SearchRecipe')
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

        cy.get(':nth-child(1) > a > td').click()
        cy.wait('@getDetail')
        cy.url().should('eq', 'http://localhost:9000/DetailRecipe/1')
        cy.contains("ข้าวกะเพรากุ้งไข่ระเบิด")
        cy.get(':nth-child(2) > .column > .content > ol').children().should('have.length', 2)
        cy.get(':nth-child(3) > .column > .content > ol').children().should('have.length', 5)
        cy.get('.button').click()
        cy.url().should('eq', 'http://localhost:9000/SearchRecipe')
    })
})