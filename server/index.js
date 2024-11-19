const path = require('path')
const express = require('express')
const sequelize = require('./util/databases')
const dotenv = require('dotenv')
const app = express()


//call the models
const Product = require('./models/product')
const User = require('./models/users')



//call the routes
const errorController = require('./controllers/error')
const adminRoutes = require('./routes/admin')
const shopRoutes  = require('./routes/shop')

// set the dotenv 
dotenv.config()
//set the port 
const PORT = process.env.PORT || 3308

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );
    next();
  });
  

app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses form-urlencoded requests
app.use(express.static(path.join(__dirname, 'public')));


// use the routes 
app.use(adminRoutes)
app.use(shopRoutes)


app.use(errorController.get404);

// creat one to many relation 
Product.belongsTo(User,  {constraints: true, onDelete: 'CASCADE'}) // many to one 
User.hasMany(Product) // one to many 


sequelize
.sync({force: true})
//.sync()
.then((result) => {
    console.log(result)
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    });
}).catch((err) => {
    console.log(err)
});

