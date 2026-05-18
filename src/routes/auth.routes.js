const express = require('express')
const { userRegister, userLogin, userLogOut } = require('../controllers/auth.controller')
const { validationRegister,loginRegister } = require('../validation/auth.validation')

const router = express.Router()

router.post('/register',validationRegister , userRegister)
router.post('/login',loginRegister , userLogin)

router.post('/logOut',userLogOut)

module.exports = router 