const admin = require("../admin");
const db = admin.firestore();
const express = require('express');
const exampleController = express();
const app = express();

app.use(express.json())

exampleController.get("/", (req, res) => {
    res.status(200).send({
        'CODE' : "OK",
        'MSG' : "Hello World"
    })
})

exampleController.get("/create", async (req, res) => {
    const ref = db.collection("collection").doc("document")
    const status = await ref.set({ msg: "Hello Test1" })

    if (status) {
        res.status(200).send({
            'CODE' : "OK",
            'MSG' : "doc create!"
        })
    }
})

app.get('/getFood', async(request, response) => {
    try {
        const menu = []
        await db.collection('Menu').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const food = { id: doc.id, name: doc.data().name }
                menu.push(food)
            })
        })
        return response.status(200).json(menu)
    } catch(exception) {
        return response.status(400).json(ไปซ่อมมา)
    }
})

app.post('/createFood', async(request, response) => {
    const data = request.body
    try {
        await data.menus.forEach(menu => {
            db.collection('Menu').add(menu)
        })
        return response.json('Food Added')
    } catch(exception) {
        return response.status(400).json(ไปซ่อมมา)
    }
})

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
})

module.exports = exampleController;