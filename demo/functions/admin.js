const admin = require("firebase-admin");

const serviceAccount = require("./sdtp-ff808-firebase-adminsdk-htbr3-e61858384b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;