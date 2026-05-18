const cookieParser = require('cookie-parser')
const express = require('express')
const authRoutes = require('./routes/auth.routes')
const customerRoutes = require('./routes/customer.routes')
const adminRoutes = require('./routes/admin.routes')

const app = express()
app.use(express.json())
app.use(cookieParser())

// ---------: Api Routes :----------------------
app.use('/api/auth',authRoutes)
app.use('/api/customer',customerRoutes)
app.use('/api/admin',adminRoutes)
 

module.exports = app