const admin = require("../admin");
const db = admin.firestore();
const express = require('express');
const exampleController = express();

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

module.exports = exampleController;