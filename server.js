require('dotenv').config()
const app = require("./src/app");
const ConnectToDb = require('./src/database/connection');


const port = process.env.port
ConnectToDb()

app.listen(port, () => {
    console.log(`server is running on port ${port}`);

})