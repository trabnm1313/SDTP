const admin = require("../admin");
const db = admin.firestore();
const express = require('express');
const exampleController = express();
const cors = require('cors')

// Allow list
var allowedOrigins = ['http://localhost:8080', 'https://sdtp-81222.web.app/'];

// limiting Access
exampleController.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            let msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
    }
}));

//Variables
const PORT = 3000

//Routes Variables
const randomMenuAPI = require("../route/randomMenuAPI")

//Routes uses
exampleController.use("/randomMenu", randomMenuAPI)

exampleController.use(express.json())

exampleController.get("/", (req, res) => {
    res.status(200).send({
        'CODE': "OK",
        'MSG': "Hello World"
    })
})

exampleController.get("/create", async (req, res) => {
    const ref = db.collection("collection").doc("document")
    const status = await ref.set({ msg: "Hello Test1" })

    if (status) {
        res.status(200).send({
            'CODE': "OK",
            'MSG': "doc create!"
        })
    }
})

exampleController.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })

module.exports = exampleController;