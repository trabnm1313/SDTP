const Express = require('express')
const router = Express.Router()

//const admin = require("../admin")
//const db = admin.firestore()
//const menuRef = db.collection("Menu")

const mockData = require("../mockMenu.json")

router.use(Express.json())

router.get('/', async(request, response) => {

        const nameMenu = request.query.name

        if(nameMenu == ""){
            response.status(400).json({
                status: 400,
                err: "Missing name menu parameter."
            })
        }

        // await database.collection('Menu').where("name", "==", nameMenu).get().then((querySnapshot) => {

        //     if (querySnapshot.empty) {
        //         console.log('No matching name menu.');
        //         return response.status(404).send();
        //     }

        //     querySnapshot.forEach((doc) => {
        //         const food = doc.data()
        //         menu.push(food)
        //     })
        // })

        else {
            let tempDataList = []

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

            response.status(200).json({
                message: "OK",
                menu: menuFiltered
            })
        }
        
})

module.exports = router;