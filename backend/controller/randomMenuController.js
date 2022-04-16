const Express = require('express')
const router = Express.Router()


//const admin = require("../admin")
//const db = admin.firestore()
//const menuRef = db.collection("Menu")

const mockData = require("../mockMenu.json")

router.use(Express.json())

router.post("/", (req, res) => {

    const tags = req.body["tags"]

    if(req.body.tags == undefined){
        res.status(400).json({
            status: 400,
            err: "Missing tags parameter."
        })
    }

    if(tags.length != 0){

        //menuRef.where("tags", "array-contains-any", tags).get().then(querySnapshot => {
            let tempDataList = []

            //Get data from Firebase
            // querySnapshot.forEach(menu => {
            //     tempDataList.push(menu.data())
            // })
            
            //Get data from Mock Data
            tempDataList = mockData.menus

            tempDataList = tempDataList.filter(menu => {
                if( tags.every(tag => menu["tags"].includes(tag )) ) return true
                return false
            })


            let randomMenu = []
            let randomNumber = 0
            let maxRandomNumber = tempDataList.length >= 3 ? 3 : tempDataList.length

            for(let num=0; num<maxRandomNumber; num++) {
                randomNumber = Math.floor(Math.random() * tempDataList.length)
                randomMenu.push(tempDataList[randomNumber])
                tempDataList.splice(randomNumber, 1)
            }

            res.status(200).json({
                message: "OK",
                menu: randomMenu
            })

        /*}).catch(error => {
            console.log(error)
            res.status(400).json({
                message: "Something went wrong.",
                err: error
            })
        })*/

    }else{

        //menuRef.get().then(querySnapshot => {
            let tempDataList = []

            // querySnapshot.forEach(menu => {
            //     tempDataList.push(menu.data())
            // })

            //Mock data
            tempDataList = mockData.menus

            let randomMenu = []
            let randomNumber = 0
            let maxRandomNumber = tempDataList.length >= 3 ? 3 : tempDataList.length
            for(let num=0; num<maxRandomNumber; num++) {
                randomNumber = Math.floor(Math.random() * tempDataList.length)
                randomMenu.push(tempDataList[randomNumber])
                tempDataList.splice(randomNumber, 1)
            }

            res.status(200).json({
                message: "OK",
                menu: randomMenu
            })
        /*}).catch(error => {
            console.log(error)
            res.status(400).json({
                message: "Something went wrong.",
                err: error
            })
        })*/
    }

})

module.exports = router