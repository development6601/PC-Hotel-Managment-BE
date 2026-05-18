const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { customerDetail } = require('../controllers/customer.controller')

const router = express()

router.post('/customerDetail',authMiddleware,customerDetail)

module.exports = router