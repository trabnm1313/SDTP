const mockData = require("./mockMenu.json")

const filterFunction = (tags) => {
    let menu = [...mockData.menus]

    let filteredMenu = tags.length > 0 ? menu.filter(menu => {
        if( tags.every(tag => menu["tags"].includes(tag)) ) return true
        return false
    }) : menu
    
    let randomMenu = []
    let randomNumber = 0
    let maxRandomNumber = filteredMenu.length >= 3 ? 3 : filteredMenu.length
    for(let num=0; num<maxRandomNumber; num++) {
        randomNumber = Math.floor(Math.random() * filteredMenu.length)
        randomMenu.push(filteredMenu[randomNumber])
        filteredMenu.splice(randomNumber, 1)
    }

    return randomMenu
}

describe("UnitTest", () => {
    it("Filter Food menu with tags[\"เส้น\", \"ผัด\"]", () => {
        let tags = ["เส้น", "ผัด"]
        expect(filterFunction(tags).length).toBeGreaterThan(0)
    })

    it("Filter Food menu with tags[]", () => {
        let tags = []
        expect(filterFunction(tags).length).toBeGreaterThan(0)
    })

    it("Filter Food menu with tags[\"เส้น\", \"ข้าว\"])", () => {
        let tags = ["เส้น", "ข้าว"]
        expect(filterFunction(tags).length).toBe(0)
    })
})