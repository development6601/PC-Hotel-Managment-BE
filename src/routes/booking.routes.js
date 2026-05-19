const express = require('express')
const { createBooking, deleteBooking, cancelBooking } = require('../controllers/booking.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/bookRoom/:id',authMiddleware,createBooking)

router.delete('/cancelBooking/:id',authMiddleware,cancelBooking)

router.delete('/deleteBooking/:id',authMiddleware,deleteBooking)

module.exports = router