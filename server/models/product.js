const Sequelize = require('sequelize');
const sequelize = require('../util/databases')


const Items = sequelize.define('item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    
      title: Sequelize.STRING,
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      }
})

module.exports = Items;