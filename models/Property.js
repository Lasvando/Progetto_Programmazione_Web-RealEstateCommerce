const {Model, DataTypes} = require('sequelize')
const sequelize = require('../sequelize')

class Property extends Model{}

Property.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'property'
})

module.exports = Property