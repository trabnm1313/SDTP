const admin = require("../admin");
const db = admin.firestore();
const express = require('express');
const appController = express();
const cors = require('cors')

// Allow list
// var allowedOrigins = ['http://localhost:8080', 'https://sdtp-81222.web.app'];

// // limiting Access
// appController.use(cors({
//     origin: function (origin, callback) {
//         if (allowedOrigins.indexOf(origin) !== -1) {
//             return callback(null, true);
//         } else {
//             let msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//     }
// }));

//Variables
const PORT = 3000

//Routes Variables
const randomMenuAPI = require("./randomMenuController")

//Routes uses
appController.use("/randomMenu", randomMenuAPI)

appController.use(express.json())

appController.get("/", (req, res) => {
    res.status(200).send({
        'CODE': "OK",
        'MSG': "Hello World"
    })
})

appController.get("/create", async (req, res) => {
    const ref = db.collection("collection").doc("document")
    const status = await ref.set({ msg: "Hello Test1" })

    if (status) {
        res.status(200).send({
            'CODE': "OK",
            'MSG': "doc create!"
        })
    }
})

const server = appController.listen(PORT)

module.exports = { appController: appController, server: server };