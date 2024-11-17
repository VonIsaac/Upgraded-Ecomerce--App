const path = require('path')
const express = require('express')
const sequelize = require('./util/databases')
const dotenv = require('dotenv')
const errorController = require('./controllers/error')
const app = express()

// set the dotenv 
dotenv.config()

//set the port 
const PORT = process.env.PORT || 3308



app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses form-urlencoded requests

app.use(express.static(path.join(__dirname, 'public')));


// call the routes 
app.use(errorController.get404)

sequelize
//.sync({force: true})
.sync()
.then((result) => {
    console.log(result)
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    });
}).catch((err) => {
    console.log(err)
});

