require('dotenv').config()
const app = require("./src/app");


const port = process.env.port

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})