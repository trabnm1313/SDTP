const Express = require('express')
const router = Express.Router()

router.use(Express.json())

router.get("/", (req, res) => {
    console.log("Console logging!")
    res.status(200).json({
        message: "OK"
    })
})

module.exports = router