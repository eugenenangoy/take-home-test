const {Router} = require('express')
const user = require('../controllers/userControllers')
const auth = require("../controllers/authControllers")
const items = require("../controllers/inventoryController")

const router = new Router()

router.get('/',(req,res)=>{
    res.send('Welcome to Inventory API')
})

//Routes For Authentication Controllers
router.post('/auth/user', auth.signIn)

//Routes For User Controllers
router.get('/user', user.findAllUser)
router.post('/user', user.registerUser)
router.put('/user/:id', user.updateUser)
router.delete('/user/:id', user.deleteUser)

//Routes for CRUD Inventory
router.get('/barang',  items.findAllItems)
router.post('/barang', items.createItems)
router.put('/barang/:id', items.updateItems)
router.delete('/barang/:id', items.deleteItems)

module.exports = router