const {Model, DataTypes} = require('sequelize')
const sequelize = require('../sequelize')
const Role = require('./Role')

class User extends Model{}

User.init({
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{
    sequelize,
    modelName: 'user'
})

module.exports = User