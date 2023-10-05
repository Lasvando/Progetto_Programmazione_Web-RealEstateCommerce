const {Model, DataTypes} = require('sequelize')
const sequelize = require('../sequelize')

class Role extends Model{}

Role.init({
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'role'
})

module.exports = Role