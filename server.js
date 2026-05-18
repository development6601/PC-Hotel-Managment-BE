require('dotenv').config()
const app = require("./src/app");
const ConnectToDb = require('./src/db/db');


const port = process.env.port
ConnectToDb()

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})