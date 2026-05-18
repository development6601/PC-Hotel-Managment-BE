const express = require('express')
const { statusInfo } = require('../controllers/admin.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router  = express.Router()

router.get('/statusInfoCustomer',authMiddleware,statusInfo)

module.exports = router