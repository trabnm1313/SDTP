const Express = require('express')
const router = Express.Router()


//const admin = require("../admin")
//const db = admin.firestore()
//const menuRef = db.collection("Menu")

const mockData = require("../mockMenu.json")

router.use(Express.json())

router.get('/:name', async(request, response) => {

        const nameMenu = request.params.name
        const menu = []

        if(nameMenu == undefined){
            res.status(400).json({
                status: 400,
                err: "Missing name menu parameter."
            })
        }


        // await database.collection('Menu').where("name", ">=", nameMenu).get().then((querySnapshot) => {

        //     if (querySnapshot.empty) {
        //         console.log('No matching name menu.');
        //         return response.status(404).send();
        //     }

        //     querySnapshot.forEach((doc) => {
        //         const food = doc.data()
        //         menu.push(food)
        //     })
        // })

        if(nameMenu != undefined){
            tempDataList = mockData.menus

            var menuFiltered = tempDataList.filter(function(item){
                var result = false;
                    Object.keys(item).map(function(key){
                        if (item[key] == nameMenu){
                          result = true;
                        }
                    })
                    return result;
              });
        }
        return response.status(200).json(menuFiltered)
})

module.exports = router;