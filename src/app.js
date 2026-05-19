const cookieParser = require('cookie-parser')
const express = require('express')
const authRoutes = require('./routes/auth.routes')
const customerRoutes = require('./routes/customer.routes')
const roomRoutes = require('./routes/room.routes')
const bookRoutes = require('./routes/booking.routes')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))

// ---------: Api Routes :----------------------

app.use('/api/auth',authRoutes)
app.use('/api/customer',customerRoutes)
app.use('/api/room',roomRoutes)
app.use('/api/book',bookRoutes)
 

module.exports = app