const supertest = require('supertest')
const { appController, server } = require('./controller/app')

const mockData = require("./mockMenu.json")

describe("RandomMenuAPI", () => {
    it("POST /randomMenu with []", () => {
        return supertest(appController).post("/randomMenu").send({
            tags: []
        }).then(response => {
            expect(response.body.message).toBe("OK")
        })
    })

    //ตัวอย่างวิธีใช้ Expect
    it("POST  /randomMenu with tags[\"ข้าว\"]", () => {
        return supertest(appController).post("/randomMenu").send({
            tags: ["ข้าว"]
        }).then(response => {
            expect(response.body.menu).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String)
                })
            ]))
        })
    })
    
    it("POST  /randomMenu with tags[\"เส้น\", \"ผัด\"]", () => {
        return supertest(appController).post("/randomMenu").send({
            tags: ["เส้น", "ผัด"]
        }).then(response => {
            expect(response.body.menu[0].tags).toEqual(expect.arrayContaining(["เส้น", "ผัด"]))
        })
    })

    it("POST /randomMenu with tags[\"เส้น\", \"ผัด\", \"ไก่\"]", () => {
        return supertest(appController).post("/randomMenu").send({
            tags: ["เส้น", "ผัด", "ไก่"]
        }).then(response => {
            expect(response.body.menu[0].tags).toEqual(expect.arrayContaining(["เส้น", "ผัด", "ไก่"]))
        })
    })

    it("POST /randomMenu without tags", () => {
        return supertest(appController).post("/randomMenu").send({}).then(response => {
            expect(response.body.status).toBe(400)
        })
    })


    afterAll(() => { server.close() })
})