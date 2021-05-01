// For future development
const router = require("express").Router()
const productRoutes = require("../routes/productRoutes.js");

router.get('/', (req, res) => {
    res.send('you are logged in' + req.user.username)
    console.log('you are in profileRoutes' )
    // res.redirect("/home")
})

module.exports = router;