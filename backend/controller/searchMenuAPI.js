const admin = require("../admin");
const database = admin.firestore();
const express = require('express');
const router = express.Router();

router.get('/:name', async(request, response) => {
        const nameMenu = request.params.name
        const menu = []
        await database.collection('Menu').where("name", "==", nameMenu).get().then((querySnapshot) => {

            if (querySnapshot.empty) {
                console.log('No matching name menu.');
                return response.status(404).send();
            }

            querySnapshot.forEach((doc) => {
                const food = doc.data()
                menu.push(food)
            })
        })
        return response.status(200).json(menu)
})

module.exports = router;