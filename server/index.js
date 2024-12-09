const path = require('path');
const express = require('express');
const sequelize = require('./util/databases');
const dotenv = require('dotenv');
const app = express();

// Call the models
const Product = require('./models/product');
const User = require('./models/users');

// Call the routes
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Set dotenv
dotenv.config();
const PORT = process.env.PORT || 3308;

// Middleware for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

  // creating a user

  app.use(async (req, res, next) => {
    try {
        const user = await User.findByPk(1); // Replace 1 with logic to fetch the authenticated user's ID
        if (!user) {
            return res.status(400).json({ message: 'No user found with the specified ID.' });
        }
        req.user = user; // Attach the Sequelize User instance to req
        next();
    } catch (error) {
        console.error('Error fetching user:', error);
        next(error);
    }
});
  
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses form-urlencoded requests
//app.use(express.static(path.join(__dirname, 'public')));


// use the routes 
app.use(adminRoutes)
app.use(shopRoutes)


app.use(errorController.get404);

// creat one to many relation 
User.hasMany(Product, { foreignKey: 'userId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'userId', as: 'user' });

sequelize
//.sync({force: true})
.sync()
.then((result) => {
  console.log('Database synced successfully', result);
  //check if wee have a one id 
  return User.findByPk(1)
})
.then(user => {
  // check if wee not have a user
  if(!user){
    return User.create({name: 'Von', email: 'vonbaban1@gmail.com'})
  };

  return user
}) 
.then((result) => {
    console.log(result)
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    });
}).catch((err) => {
    console.log(err)
});


