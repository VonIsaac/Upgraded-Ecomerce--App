const Sequelize =  require('sequelize');
const sequelize =  require('../util/databases');


const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    }
});

module.exports = Cart;