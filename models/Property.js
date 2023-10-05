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
    photo_path:{
        type: DataTypes.STRING,
        unique: true,
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