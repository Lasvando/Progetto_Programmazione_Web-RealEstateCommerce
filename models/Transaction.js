const {Model, DataTypes} = require('sequelize')
const sequelize = require('../sequelize')

class Transaction extends Model{}

Transaction.init({
    debit_card: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'transaction'
})

module.exports = Transaction