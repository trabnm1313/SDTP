const functions = require("firebase-functions");

// register controller
const exampleController = require('./controller/example')

exports.example = functions.https.onRequest(exampleController);