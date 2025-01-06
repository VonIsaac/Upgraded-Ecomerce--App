const Sequelize = require('sequelize');
const sequelize = require('../util/databases');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
       // unique: true,
        primaryKey: true
    }
})

module.exports = Order;