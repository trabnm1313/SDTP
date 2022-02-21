const functions = require("firebase-functions");

// register controller
const appController = require('./controller/app')

exports.app = functions.https.onRequest(appController);