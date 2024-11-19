const Sequelize = require('sequelize');
const sequelize = require('../util/databases')


const User = sequelize.define('user', {
     //set modelt attributes

     id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name:{
        type:  Sequelize.STRING

    },

    email:{
        type: Sequelize.STRING,
    }
})

module.exports = User;