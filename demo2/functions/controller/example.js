const admin = require("../admin");
const db = admin.firestore();
const express = require('express');
const exampleController = express();
var cors = require('cors')

exampleController.use(cors())

//Variables
const PORT = 8080

//Routes Variables
const randomMenuAPI = require("../route/randomMenuAPI")

//Routes uses
exampleController.use("/randomMenu", randomMenuAPI)

exampleController.use(express.json())

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

exampleController.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })

module.exports = exampleController;