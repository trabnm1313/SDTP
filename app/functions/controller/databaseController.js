const admin = require("../admin");
const database = admin.firestore();
const express = require('express');
const router = express.Router();

router.get('/getMenu', async(request, response) => {
    try {
        const menu = []
        await database.collection('Menu').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const food = { id: doc.id, name: doc.data().name }
                menu.push(food)
            })
        })
        return response.status(200).json(menu)
    } catch(exception) {
        return response.status(400).json(exception)
    }
})

router.post('/createMenu', async(request, response) => {
    const data = request.body
    try {
        await data.menu.forEach(food => {
         database.collection('Menu').add(food)
        })
        return response.status(200).json('Menu is created')
    } catch(exception) {
        return response.status(400).json(exception)
    }
})

router.post('/createFood', async(request, response) => {
    const data = request.body
    try {
        await database.collection('Menu').add(data)
        return response.status(200).json('Food is added')
    } catch(exception) {
        return response.status(400).json(exception)
    }
})

router.put('/updateFood', async(request, response) => {
    const id = request.query.id
    const data = request.body
    try {
        await database.collection('Menu').doc(id).set(data)
        return response.status(200).json('Food ID ' + id + ' is updated')
    } catch(exception) {
        return response.status(400).json(exception)
    }
})

router.delete('/deleteFood', async(request, response) => {
    const data = request.body
    try {
        await data.list.forEach(id => {
         database.collection('Menu').doc(id).delete()
        })
        return response.status(200).json('Food deleted')
    } catch(exception) {
        return response.status(400).json(exception)
    }
})

module.exports = router;