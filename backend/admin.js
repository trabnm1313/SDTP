const admin = require("firebase-admin");

//const serviceAccount = require("./key.json");

admin.initializeApp();

module.exports = admin;