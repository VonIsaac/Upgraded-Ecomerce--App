const path = require('path')
const express = require('express')
const sequelize = require('./util/databases')
const dotenv = require('dotenv')
const app = express()

// set the dotenv 
dotenv.config()

//set the port 
const PORT = process.env.PORT || 3306

app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses form-urlencoded requests

app.use(express.static(path.join(__dirname, 'public')));


// call the routes 

sequelize
.sync()
.then((result) => {
    console.log(result)
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    });
}).catch((err) => {
    console.log(err)
});

