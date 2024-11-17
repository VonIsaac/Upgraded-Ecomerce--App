//set up the .env and sequelize
const dotenv = require('dotenv')
const Sequelize = require('sequelize')


// call the dotenv.cofig
dotenv.config()


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    dialect: 'mysql', 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

module.exports = sequelize;