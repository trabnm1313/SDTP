const express = require('express');
const exampleController = express();
const app = express();

const databaseController = require('./databaseController')

app.use('/database', databaseController)

app.use(express.json())

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
})

module.exports = exampleController;