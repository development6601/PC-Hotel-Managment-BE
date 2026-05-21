require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {rateLimit} = require('express-rate-limit')

// ---------------:Routes:--------------------------------------
const authRoutes = require('./src/routes/auth.routes')
const customerRoutes = require('./src/routes/customer.routes')
const roomRoutes = require('./src/routes/room.routes')
const bookRoutes = require('./src/routes/booking.routes')

const ConnectToDb = require('./src/database/connection');
ConnectToDb()

const app = express()

const limiter = rateLimit({
    windowMs:5*60*1000,
    limit:50,
    message: 'Too many requests, please try again later.',
    standardHeaders:'draft-8',
    legacyHeaders:false
})

app.use(limiter)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

// ---------: Api Routes :----------------------

app.use('/api/auth', authRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/room', roomRoutes)
app.use('/api/book', bookRoutes)


const port = process.env.port

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    
})