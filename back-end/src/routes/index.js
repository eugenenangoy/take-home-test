const {Router} = require('express')
const user = require('../controllers/userControllers')
const auth = require("../controllers/authControllers")
const items = require("../controllers/inventoryController")

const router = new Router()

router.get('/',(req,res)=>{
    res.send('Welcome to Inventory API')
})

//Routes For Authentication Controllers
router.post('/login', auth.signIn)
router.post('/register', user.registerUser)

//Routes For User Controllers
router.get('/user', auth.verifyToken, user.findAllUser)
router.put('/user/:id', auth.verifyToken, user.updateUser)
router.delete('/user/:id', auth.verifyToken, user.deleteUser)

//Routes for CRUD Inventory
router.get('/barang', auth.verifyToken, items.findAllItems)
router.post('/barang', auth.verifyToken, items.createItems)
router.put('/barang/:id', auth.verifyToken, items.updateItems)
router.delete('/barang/:id', auth.verifyToken, items.deleteItems)

module.exports = router